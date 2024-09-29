export enum Command {
    ESC = 'ESC',
    ENTER = 'ENTER',
    TAB = 'TAB',
    LEFT = 'LEFT',
    UP = 'UP',
    RIGHT = 'RIGHT',
    DOWN = 'DOWN',
    SPACE = 'SPACE',
    COLUME_UP = 'VOLUME_UP',
    VOLUME_DOWN = 'VOLUME_DOWN'
}

export type Connection = {
    id: string;
    userId: string;
    status: 'initiating' | 'accepted' | 'active' | 'terminated',
    controlledDesktopName: string;
}