export enum Command {
    ESC = 'ESC',
    ENTER = 'ENTER',
    TAB = 'TAB',
    LEFT = 'LEFT',
    UP = 'UP',
    RIGHT = 'RIGHT',
    DOWN = 'DOWN',
    SPACE = 'SPACE',
    AUDIO_MUTE = 'AUDIO_MUTE',
    AUDIO_VOLUME_DOWN = 'AUDIO_VOLUME_DOWN',
    AUDIO_VOLUME_UP = 'AUDIO_VOLUME_UP',
    AUDIO_PLAY = 'AUDIO_PLAY',
    AUDIO_STOP = 'AUDIO_STOP',
    AUDIO_PAUSE = 'AUDIO_PAUSE',
    AUDIO_PREVIOUS = 'AUDIO_PREVIOUS',
    AUDIO_NEXT = 'AUDIO_NEXT'
}

export type Connection = {
    id: string;
    userId: string;
    status: 'initiating' | 'accepted' | 'active' | 'terminated',
    controlledDesktopName: string;
}