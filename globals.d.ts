import _utils from 'src/utils/utils'
import _NP from 'number-precision'

declare global {
    const utils: typeof _utils;
    const NP: typeof _NP;
    interface Window {
        particlesJS: {
            load: (domID: string, configPath: string) => void;
        };
    };
}
