import getCommand from './getCommand'

const sfcTypeSupportDoc = [
  '',
  '## Type Support for `.vue` Imports in TS',
  '',
  'TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.',
  '',
  "If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:",
  '',
  '1. Disable the built-in TypeScript Extension',
  "    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette",
  '    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`',
  '2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.',
  ''
].join('\n')

export default function generateReadme({
  projectName,
  packageManager,
  needsTypeScript,
  needsEslint = true
}) {
  const commandFor = (scriptName: string, args?: string) =>
    getCommand(packageManager, scriptName, args)

  let readme = `# ${projectName}

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
${needsTypeScript ? sfcTypeSupportDoc : ''}
## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

\`\`\`
root
  ├─dist // 打包构建后所在目录
  │ ├─assets // 资源文件
  │ ├─index.html // 入口文件
  │ └─log // 打包环境相关信息
  ├─src // 渲染进程资源文件
  │ ├─api // 接口相关
  │ ├─assets // 图片 和 通用样式文件
  │ ├─components // 组件
  │ │ ├─[folder] // 文件夹 - 业务/页面(views)命名
  │ │ │ └─*.vue // 二级子目录下为业务/页面的组件
  │ │ └─*.vue // 一级子目录下为公共组件
  │ ├─views // 页面layout相关
  │ │ ├─[folder] // 文件夹 - 多级路由
  │ │ │ └─*.vue // 文件夹 - 多级路由下的页面组件，components的组合
  │ │ └─*.vue // 一级路由页面的组件，components的组合
  │ ├─router // 路由配置
  │ ├─stores // pinia状态管理
  │ ├─utils // 工具类方法/公有配置/过滤器等
  │ ├─App.vue // 渲染进程root组件
  │ └─main.ts // 渲染进程root脚本
  ├─.env.[mode] // 打包mode配置
  ├─components.d.ts // 按需引入组件声明文件
  ├─deploy.js // 上传部署执行文件
  ├─vsCode.bat // 使用vsCode打开当前目录脚本（双击打开）
  └─index.html // 渲染进程root html
\`\`\`

> 相关文档
>
> - VUE 路由: [vue-router](https://router.vuejs.org/zh/)
> - 状态管理: [pinia](https://pinia.web3doc.top/)
> - UI 框架: [ant-design-vue](https://vue.ant.design)
> - Http Request: [Axios](https://www.npmjs.com/package/axios)
> - CSS 预处理: [less](http://lesscss.cn/)

`

  let npmScriptsDescriptions = `\`\`\`sh
${commandFor('install')}
\`\`\`

### Compile and Hot-Reload for Development

\`\`\`sh
${commandFor('dev')}
\`\`\`

### ${needsTypeScript ? 'Type-Check, ' : ''}Compile and Minify for Production

\`\`\`sh
${commandFor('build')}
\`\`\`

### Deploy for Dev/Testing/Production

\`\`\`sh
${commandFor('deploy')}
${commandFor('deploy:test')}
${commandFor('deploy:prod')}
\`\`\`
`

  if (needsEslint) {
    npmScriptsDescriptions += `
### Lint with [ESLint](https://eslint.org/)

\`\`\`sh
${commandFor('lint')}
\`\`\`
`
  }

  readme += npmScriptsDescriptions

  return readme
}
