import { auth, requiredScopes } from "express-oauth2-jwt-bearer";
import jwt, { JwtPayload } from 'jsonwebtoken';
import JwksRsa from "jwks-rsa";
import { Socket } from "socket.io";

// Your Auth0 configuration
const AUTH0_DOMAIN = 'dev-63sgbr70.us.auth0.com'; // e.g., 'your-app.auth0.com'
const AUTH0_AUDIENCE = 'https://remotectr.com/api';
const AUTH0_ISSUER = `https://${AUTH0_DOMAIN}/`;

// exist and be verified against the Auth0 JSON Web Key Set.
export const checkJwt = auth({
    audience: AUTH0_AUDIENCE,
    issuerBaseURL: AUTH0_ISSUER,
});
export const checkScopes = requiredScopes('send:command');

const jwksClient = JwksRsa({
  cache: true,
  rateLimit: true,
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
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
      algorithms: ['RS256'],
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
