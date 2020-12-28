# DEMO - FrontEnd

## 安装

```
npm install
```

## 使用

#### 开发环境
```
npm run dev | npm run dev-mock
```
P.S.: ```dev-mock``` 将会启用 mock server, 将代理目标修改为```"mock"```后生效

##### API代理

修改 ```proxy-config.js``` 配置文件, 重启项目后, 将鼠标指针移动至界面右下角修改代理目标

#### 生产环境
```
npm run build
```

## 核心依赖

- 界面构建: [react 17.0.1](https://reactjs.org/versions)
- UI组件库: [antd 4.9.4](https://ant.design/index-cn)
- TS版本: [typescript 4.1.3](https://www.typescriptlang.org/)
- 图表组件库: [bizcharts 4.0.16](https://bizcharts.net/index)
- 代码打包: [webpack 4.44.1](https://webpack.js.org/)
- 项目构建优化: [happypack 5.0.1](https://www.npmjs.com/package/happypack)
- JS代码转换: [@babel/core 7.12.10](https://babeljs.io)
- 代码风格约束: [eslint 6.8.0](https://eslint.org)
- HTTP请求框架: [whatwg-fetch 3.5.0](https://www.npmjs.com/package/whatwg-fetch)
- 时间格式化: [moment 2.29.1](http://momentjs.cn)
- 热模块替换: [react-hot-loader 4.13.0](https://www.npmjs.com/package/react-hot-loader)
- CSS模块化: [babel-plugin-react-css-modules 5.2.6](https://github.com/gajus/babel-plugin-react-css-modules)
- BUG跟踪: [fundebug-javascript 2.4.2](https://www.fundebug.com/)
