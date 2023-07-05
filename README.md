## uniapp + vue3 + pinia + ts + unocss

个人看法，uniapp适合跨不同平台的小程序开发，有条件并不推荐h5/小程序/app混着

如果你希望使用uniapp + vue3 + pinia + ts + unocss等相关技术开发小程序,这个项目可能帮助到你

1. 可以选择直接在vscode中开发

2. 设置了eslint + husky做校验，vscode保存自动修复/提示

3. 封装了request请求，详见src\utils\network\request.ts（mock 没生效，赶着做需求，没管了）

4. 有一些常用的vue3写法的示例

5. 实现了一些有的没的可能有用的hooks - 见src\hooks

6. 实现了一些可能用到的组件-见src\components\dmc  (pages.json设置了easycom ，无需手动引入)

dmc-cropper 裁剪图片（微信小程序有裁剪图片api，如果是官方规定的比例可以直接用）

form表单、image、radio等组件

7. 实现了阿里云oss图片上传组件（没有小程序限制原因，无法使用SDK，已经实现了响应的签名方法，见src\utils\network\oss.ts）


是从现有项目删减而来，可能有不全或有bug，而且不完善，仅供参考，需要的话，可以借此自行完善

## 项目依赖

1. ui 组件库使用的是[vk-uview-ui](https://vkuviewdoc.fsq.pub/components/intro.html) 已配置 easycom 无需手动引入，自动按需加载，不建议用，有时间还不如自己写算了

vk-uview-ui真的好难用，bug还多，比如popup相关的组件在安卓上延迟异常大、form rules不支持多层级，input只收修改数值不生效，要手动延迟等等，所以基本都选择简单封装了项目中用到的，除了from 表单，基本没用，主要是没时间找，能用的也没几个，ts vue3的支持。而且小程序平台时$attrs 自定义指令这些都没有，碍手碍脚


2. [unocss](https://uno.antfu.me/) css 原子化方案 [vscode 插件](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)

3. [pinia](https://pinia.web3doc.top/introduction.html) 全局状态管理

## 项目运行

vscode 工作区关闭 Vetur 使用 Language support for Vue 3

pnpm or npm

```shell

pnpm install

pnpm run prepare

pnpm run dev:mp-weixin  or  pnpm run dev:h5

```

微信小程序导入 dist/dev/mp-weixin

## 项目构建

```shell
pnpm run build:mp-weixin  or  pnpm run build:h5

```

## 代码提交

从 NPM v5 开始，prepare 在运行 npm install 时自动执行；如果 install 后没有自动执行 prepare ，则主动执行 pnpm run prepare

mac 如果提示钩子被忽略， 先给.husky 权限： chmod 777 .husky/\*

pre-commit-校验 eslint 自动修复并全部通过方可提交

commit-msg-规范提交信息的格式（见 commitlint.config.js）

常见如：

feat(#): 重磅功能上线
fix(#): 修复
