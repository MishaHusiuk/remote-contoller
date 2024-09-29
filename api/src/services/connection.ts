import { v4 as uuidv4 } from 'uuid';

type Connection = {
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

function getConnection(id: string) {
    const userId = Object.keys(connections).find((userId) => connections[userId].id === id);
    if(!userId) return null;

    return connections[userId];
};

export {
    startConnection,
    getConnection
}