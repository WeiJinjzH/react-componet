# DEMO - FrontEnd

## 安装

```
npm install
```

## 使用

#### 开发环境
```
npm run dev
```
##### HTTP代理

修改 ```dev-server.js```默认配置文件, 重启项目

``` 或 ```

修改 ```proxy-config.js``` 配置文件
重启项目后, 将鼠标指针移动至界面右下角修改代理

#### 生产环境
```
npm run build
```

## 核心依赖

- 界面构建: [React 16.9.0](https://reactjs.org/versions)
- UI组件库: [Antd 3.22.2](https://ant.design/index-cn)
- 图表组件库: [BizCharts 3.5.2](https://bizcharts.net/index)
- 代码打包: [Webpack 4.25.1](https://webpack.js.org/)
- 项目构建优化: [happypack 5.0.0](https://www.npmjs.com/package/happypack)
- JS代码转换: [babel 7.0.0](https://babeljs.io)
- 代码风格约束: [Eslint 4.16.0](https://eslint.org)
- HTTP请求框架: [whatwg-fetch 2.0.3](https://www.npmjs.com/package/whatwg-fetch)
- 时间格式化: [moment 2.22.2](http://momentjs.cn)
- 热模块替换: [react-hot-loader 4.3.12](https://www.npmjs.com/package/react-hot-loader)
- CSS模块化: [babel-plugin-react-css-modules 3.4.2](https://github.com/gajus/babel-plugin-react-css-modules)
