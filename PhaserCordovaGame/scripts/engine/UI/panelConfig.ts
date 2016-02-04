module PhaserCordovaGame {
    export interface PanelConfig {
        screenWidth: number;
        screenHeight: number;
        showTitle?: boolean;
        text: string;
        buttons: PanelButtonConfig[];
    }

    export interface PanelButtonConfig {
        key: string;
        position: ButtonPosition;
        action: () => any;
        contextAction?: any;
    }
}