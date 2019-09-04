import _utils from 'src/utils/utils'

declare global {
    const utils: typeof _utils;
    interface Window {
        particlesJS: {
            load: (domID: string, configPath: string) => void;
        };
    };
}
