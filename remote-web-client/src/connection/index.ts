import { Connection } from "../types";
import { User } from "@auth0/auth0-react";

export class NetworkError extends Error {};

export const getConnection = async (id: string, accessToken: string) => {
    const response = await fetch(`/api/connections/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if(!response.ok) throw new NetworkError('Not Found');
    return response.json();
};

export class ConnectionTerminatedError extends Error {};
export class ConnectionAcceptanceError extends Error {};

export const acceptConnection = async (id: string, user: User, accessToken: string) => {
    const connection: Connection = await getConnection(id, accessToken);
    
    if(user.sub !== connection.userId) {
        throw new ConnectionAcceptanceError('Cannot accept this connection');
    }

    switch (connection.status) {
        case 'initiating': activateConnection(connection, accessToken); break;
        case 'accepted': {
            // need special screen untill connection is active?
            break;
        }
        case 'active': break;
        case 'terminated': throw new ConnectionTerminatedError('Connection has been terminated');
    }
};

const activateConnection = async (connection: Connection, accessToken: string) => {
    const response = await fetch(`/api/connections/${connection.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            status: 'accepted'
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    });
    if(!response.ok) throw new NetworkError('Patch Error');
    return response.json();
}
