# Vue 3 + Vite

# 项目启动与打包

1.安装项目依赖
npx yarn install

2.运行

开发模式：
npx yarn dev

生成生产：
npx yarn prod

3.打包
npx yarn build

输出路径为 /dist

# 使用技术栈
vite + vue3 + vue-router + pinia + ts

# VsCcode 开发环境 与 代码风格 （TS）

插件：ESLint, local History, prettier, Volar(vetur如有安装请停用)
Git: Git History, Git Graph, GitLens
全局只用 ESLint 与 Volar
统一使用TS语法，非必要不创建.js文件

格式化：
通过 右键格式化文本 -> 选择 prettier
通过 右键格式化文本 -> 选择 ESLint

# 关于@

在 vite.config.ts 中配置【@ 】对应目录关系,尽量使用跨目录级别的引入 尽量使用【@XXX/XXX】 写法
@: ./src
@api: ./src/api
@utils: ./src/utils
...

# 打包文件内容分析

项目中引入了 rollup-plugin-visualizer 分析插件
在执行玩打包命令后在根目录下生成 stats.html 文件，只用常规浏览器打开可查看编译包内容与大小分布情况

# 使用 svg 图标

项目中引入了 vite-plugin-svg-icons 插件
main.js 中已全局引入 svgIcon 组件，资源路径为：src/components/svg
使用时直接使用全局组件 <svg-icon name='icon-name'/>

# svg 图标库更新

本项目中使用的是 iconfont，需要在 iconfont 官网中创建项目，收藏合适的图标，并将更新的[Symbol 模式]的 js 内容替换到指定文件
操作路径：个人中心 -> 我的项目 -> 切换到 Symbol 模式 打开更新后的地址：如：https://at.alicdn.com/t/c/font_3864803_j17vrex11js.js
将内容全部替换到 src/components/svg/iconfont.js 中，即可使用项目内的所有 svg 图标

# 配置文件

# 统一路径：src/config

项目中所有配置文件内容在存放到 config 目录中
constant.ts 项目常量配置 （特定默认值从环境变量中获取）
vite vite 相关配置

# porxy 配置内容存放在 src/config/vite 中

src/config/vite/proxy.ts 已配置好 正式环境与 mock 服务代理
代理地址相关配置在 src/config/constant.ts

# 环境变量

.env.development 开发模式
.env.prod 生产模式
