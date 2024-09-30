import { v4 as uuidv4 } from 'uuid';

export type Connection = {
    id: string;
    userId: string;
    status: 'initiating' | 'accepted' | 'active' | 'terminated',
    controlledDesktopName: string;
};

const connections: Array<Connection> = [];

function startConnection(userId: string, controlledDesktopName: string) {
    const activeConnectionToTheSamePC = connections.find((c) => 
            c.userId === userId 
        && c.status === 'active'
        && c.controlledDesktopName === controlledDesktopName
    );
    
    if(!!activeConnectionToTheSamePC) {
        return activeConnectionToTheSamePC;
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