module PhaserCordovaGame {
    export interface PanelConfiguration {
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