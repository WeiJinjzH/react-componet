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

- 界面构建: [react 16.9.0](https://reactjs.org/versions)
- UI组件库: [antd 3.23.1](https://ant.design/index-cn)
- 图表组件库: [bizcharts 3.5.5](https://bizcharts.net/index)
- 代码打包: [webpack 4.39.3](https://webpack.js.org/)
- 项目构建优化: [happypack 5.0.1](https://www.npmjs.com/package/happypack)
- JS代码转换: [@babel/core 7.5.5](https://babeljs.io)
- 代码风格约束: [eslint 6.3.0](https://eslint.org)
- HTTP请求框架: [whatwg-fetch 2.0.3](https://www.npmjs.com/package/whatwg-fetch)
- 时间格式化: [moment 2.24.0](http://momentjs.cn)
- 热模块替换: [react-hot-loader 4.12.12](https://www.npmjs.com/package/react-hot-loader)
- CSS模块化: [babel-plugin-react-css-modules 5.2.6](https://github.com/gajus/babel-plugin-react-css-modules)
