﻿module PhaserCordovaGame {
    export interface PanelConfig {
        screenWidth: number;
        screenHeight: number;
        titleKey?: string;
        text: string;
        cancellable?: boolean;
        buttons: PanelButtonConfig[];
    }

    export interface PanelButtonConfig {
        key: string;
        keyClick?: string;
        position: ButtonPosition;
        action: () => any;
        contextAction?: any;
    }
}