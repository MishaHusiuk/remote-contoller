import { v4 as uuidv4 } from 'uuid';

type Connection = {
    id: string;
    userId: string;
    status: 'initiating' | 'active',
    controlledDesktopName: string;
};

const activeConnections: Record<string, Connection> = {};

export function startConnection(userId: string, controlledDesktopName: string) {
    if(!!activeConnections[userId]) {
    //    throw new Error('Not implemented');
        return activeConnections[userId];
    }
    activeConnections[userId] = {
        id: uuidv4(),
        userId: userId,
        status: 'initiating',
        controlledDesktopName
    };

    return activeConnections[userId];
}

