declare namespace IndexLessNamespace {
  export interface IIndexLess {
    captcha: string;
    "captcha-box": string;
    "captcha-input": string;
    captchaBox: string;
    captchaInput: string;
    login: string;
    "login-card": string;
    "login-decoration": string;
    "login-form-box": string;
    "login-form-title": string;
    loginCard: string;
    loginDecoration: string;
    loginFormBox: string;
    loginFormTitle: string;
    "none-account": string;
    "none-line": string;
    noneAccount: string;
    noneLine: string;
    "redo-button-box": string;
    redoButtonBox: string;
    "sms-box": string;
    "sms-button": string;
    "sms-input": string;
    smsBox: string;
    smsButton: string;
    smsInput: string;
  }
}

declare const IndexLessModule: IndexLessNamespace.IIndexLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexLessNamespace.IIndexLess;
};

export = IndexLessModule;
