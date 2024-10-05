import { v4 as uuidv4 } from 'uuid';

export type Connection = {
    id: string;
    userId: string;
    status: 'initiating' | 'accepted' | 'active' | 'terminated' | 'hungup',
    controlledDesktopName: string;
};

const connections: Array<Connection> = [];

function startConnection(userId: string, controlledDesktopName: string) {
    const activeConnectionsToTheSamePC = connections.filter((c) => 
            c.userId === userId 
        && c.status === 'active'
        && c.controlledDesktopName === controlledDesktopName
    );
    
    if(activeConnectionsToTheSamePC.length > 0) {
        // client should not be able to initiate new connection while there is already active connection. 
        // terminate existing active connection(s) and initiate a new one.
        activeConnectionsToTheSamePC.forEach((connection) => connection.status = 'terminated');
    }

    const initiatingConnectionsToTheSamePC = connections.filter((c) => 
            c.userId === userId 
        && c.status === 'initiating'
        && c.controlledDesktopName === controlledDesktopName
    );

    if(initiatingConnectionsToTheSamePC.length > 0) {
        // if client initiated connections previusly but didnt activate them, set their status to `hungup`
        initiatingConnectionsToTheSamePC.forEach((connection) => connection.status = 'hungup');
    }

    const newConnection: Connection = {
        id: uuidv4(),
        userId: userId,
        status: 'initiating',
        controlledDesktopName
    };
    connections.push(newConnection);
    
    return newConnection;
}

function getConnection(id: string): Connection | null {
    const connection = connections.find((c) => c.id === id);
    if (!connection) return null;
    
    return connection;
};

function updateConnectionStatus(id: string, newStatus: 'accepted' | 'active' | 'terminated') {
    const connection = getConnection(id);
    if(!connection) return null;

    connection.status = newStatus;

    return connection;
};


export {
    startConnection,
    getConnection,
    updateConnectionStatus
}