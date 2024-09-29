import { v4 as uuidv4 } from 'uuid';

export type Connection = {
    id: string;
    userId: string;
    status: 'initiating' | 'accepted' | 'active' | 'terminated',
    controlledDesktopName: string;
};

const connections: Record<string, Connection> = {};

function startConnection(userId: string, controlledDesktopName: string) {
    if(!!connections[userId]) {
    //    throw new Error('Not implemented');
        return connections[userId];
    }
    connections[userId] = {
        id: uuidv4(),
        userId: userId,
        status: 'initiating',
        controlledDesktopName
    };

    return connections[userId];
}

function getConnection(id: string): Connection | null {
    const userId = Object.keys(connections).find((userId) => connections[userId].id === id);
    if(!userId) return null;

    return connections[userId];
};

function updateConnectionStatus(id: string, newStatus: 'accepted' | 'active' | 'terminated') {
    const userId = Object.keys(connections).find((userId) => connections[userId].id === id);
    if(!userId) return null;

    const connection = connections[userId];
    
    connection.status = newStatus;

    return connection;
};


export {
    startConnection,
    getConnection,
    updateConnectionStatus
}