import _utils from 'src/utils/utils'
import _NP from 'number-precision'
import React from 'react'

declare global {
    const utils: typeof _utils;
    const React: typeof React;
    const NP: typeof _NP;
    interface Window {
        particlesJS: {
            load: (domID: string, configPath: string) => void;
        };
    };
}
