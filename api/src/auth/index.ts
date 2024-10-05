import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import jwt, { Algorithm, JwtPayload } from 'jsonwebtoken';
import JwksRsa from "jwks-rsa";
import { Socket } from "socket.io";
import { getConnection } from "../services/connection";

// Your Auth0 configuration
const { 
  AUTH0_AUDIENCE,
  AUTH0_ISSUER,
  AUTH0_SCOPES = '',
  AUTH0_JWKS_URI = '',
  AUTH0_JWT_TOKEN_SIGNING_ALGS = ''
} = process.env;

// exist and be verified against the Auth0 JSON Web Key Set.
export const checkJwt = auth({
    audience: AUTH0_AUDIENCE,
    issuerBaseURL: AUTH0_ISSUER,
});
export const checkScopes = requiredScopes(AUTH0_SCOPES);

const jwksClient = JwksRsa({
  cache: true,
  rateLimit: true,
  jwksUri: AUTH0_JWKS_URI,
});

const getKey = (header: any, callback: any) => {
  jwksClient.getSigningKey(header.kid, (err, key) => {
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
};

// Middleware for Socket.IO to validate token
export const authenticateSocket = (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth.token;

  if (token) {
    // Use jwt.verify with getKey as the second argument
    jwt.verify(token, getKey, {
      audience: AUTH0_AUDIENCE,
      issuer: AUTH0_ISSUER,
      algorithms: AUTH0_JWT_TOKEN_SIGNING_ALGS.split(',') as Algorithm[],
    }, (err, decoded) => {
      if (err) {
        console.error('JWT Verification Error:', err);
        return next(new Error('Authentication error'));
      }

      // Ensure decoded is of type JwtPayload
      if (typeof decoded === 'object' && decoded !== null) {
        socket.handshake.auth.decoded = decoded as JwtPayload;
        // socket.user = decoded as JwtPayload; // Cast to JwtPayload
        next(); // Proceed with connection
      } else {
        next(new Error('Invalid token payload'));
      }
    });
  } else {
    next(new Error('Authentication error')); // No token provided
  }
};

// Middleware to validate connectionId
export const validateConnection = async (socket: Socket, next: (err?: Error) => void) => {
  const connectionId = socket.handshake.auth.connectionId;
  const userId = socket.handshake.auth.decoded.sub;

  if (!connectionId) {
    return next(new Error('Validation error: Missing connectionId in the request'));
  }

  try {
    // Check the connection status based on connectionId
    const connection = getConnection(connectionId);
    if (!connection) return next(new Error('Validation error: Connection not found'));

    if (!['accepted', 'active'].includes(connection?.status)) {
      return next(new Error('Validation error: Connection is not ready'));
    }
    
    if(connection.userId !== userId) {
      return next(new Error('Validation error: Connection does not belong to this user'));
    }
    // Attach connectionId to socket data
    socket.data.connectionId = connectionId;
    next(); // Proceed with connection
  } catch (err) {
    return next(new Error('Validation error: Unable to validate connectionId'));
  }
};
