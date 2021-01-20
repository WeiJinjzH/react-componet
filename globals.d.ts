import _utils from 'src/utils/utils'
import _NP from 'number-precision'
import React from 'react'

declare global {
    declare module "*.png";
    declare module "*.gif";
    declare module "*.jpg";
    declare module "*.jpeg";
    declare module "*.svg";
    declare module "*.css";
    declare module "*.less";
    declare module "*.scss";
    declare module "*.sass";
    declare module "*.styl";
    
    const utils: typeof _utils;
    const React: typeof React;
    const NP: typeof _NP;
    interface Window {
        particlesJS: {
            load: (domID: string, configPath: string) => void;
        };
    };
}
