# React项目模板

详细搭建步骤：[从零开始搭建一个React项目](./doc/guide.md)

## 安装

- 把项目克隆到本地

  ```
  git clone https://github.com/shayeLee/react-template.git
  ```

- 本项目使用`sass`作为`css`的预处理语言，而安装`sass`需要先安装`Ruby`，这里提供一下[下载地址](https://rubyinstaller.org/downloads/)

- 本项目使用`gulp`作为项目构建任务的管理工具，所以需要先全局安装`gulp`

  ```
  npm install -D gulp@3
  ```

- 安装本地依赖包

  ```
  cd react-template
  ```

  ```
  npm install
  ```

## 如何使用

- 启动开发服务器

  ```
  gulp dev
  ```

- 打包生产环境代码

  ```
  gulp build
  ```

## 项目工程化特性

- 自动化：webpack自动增量编译，浏览器热加载
- 按需加载：`import()`动态加载模块
- js编译器：babel
- js代码检查：eslint
- css编译器：less + sass + postcss
- 代码压缩
- 图片压缩



