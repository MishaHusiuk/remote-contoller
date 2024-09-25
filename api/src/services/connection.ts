import { v4 as uuidv4 } from 'uuid';

type Connection = {
    id: string;
    userId: string;
    status: 'initiating' | 'active'
};

const activeConnections: Record<string, Connection> = {};

export function startConnection(userId: string) {
    if(!!activeConnections[userId]) {
    //    throw new Error('Not implemented');
        return activeConnections[userId];
    }
    activeConnections[userId] = {
        id: uuidv4(),
        userId: userId,
        status: 'initiating'
    };

    return activeConnections[userId];
}

