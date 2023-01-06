// 链接服务相关
import scp2 from 'scp2'
import { Client } from 'ssh2'
// 控制台打印相关
import ora from 'ora'
import chalk from 'chalk'
// 生成log文件所需依赖
import os from 'os'
import fs from 'fs'
// node 命令行
// import { exec } from 'child_process'
const env = process.argv[2] || 'dev'
const envLabel = {
  prod: '生产',
  test: '测试',
  dev: '开发'
}
// 账号
const accet = {
  username: 'root',
  password: 'root_pwd'
}
// 服务配置
const serverMap = {
  // 服务器ip&端口配置
  prod: {
    host: '10.168.1.200',
    port: '22'
  },
  test: {
    host: '10.168.1.200',
    port: '22'
  },
  dev: {
    host: '10.168.1.200',
    port: '22'
  }
}
// 路径禁止为 / 或者 /*
const projectName = 'vue-project'
const packagePath = `/home/www/html/${projectName}` // 项目部署的服务器目标位置
const dist = './dist/' // 打包后项目文件

// sentry 配置
// const sentry = {
//   version: '1.0.0',
//   authToken: 'authToken',
//   url: 'https://sentry.io',
//   org: 'my-org',
//   project: projectName
// }
// const nodeExec = (cmd) => {
//   if (cmd) {
//     return new Promise((resolve, reject) => {
//       exec(cmd, (err, stdout, stderr) => {
//         if (err) reject(stderr)
//         resolve(stdout)
//       })
//     })
//   } else {
//     throw '指令为空😂'
//   }
// }

// async function sentryUploadSourceMapTask() {
//   const releases = `${sentry.project}@${sentry.version}`
//   await nodeExec(`sentry-cli releases new ${releases}`) // 创建release
//   await nodeExec(`sentry-cli releases files ${releases} upload-sourcemaps ${dist}`)
//   await nodeExec(`sentry-cli releases finalize ${releases}`) // 发布release
//   // sentry-cli releases -o 组织 -p 项目 delete 发布的版本 // 删除release
//   await nodeExec(`rimraf dist/**/*.js.map`) // 删除sourceMap
// }
// if (env == 'prod') {
//   const sentryUploadTips = ora(chalk.green(`正在上传SourceMap🌈`))
//   sentryUploadTips.start()
//   await sentryUploadSourceMapTask()
//     .then(() => {
//       sentryUploadTips.stop()
//       console.log(chalk.green(`🎉🎉🎉SourceMap已上传到sentry🌈`))
//     })
//     .catch((e) => {
//       sentryUploadTips.stop()
//       console.log(chalk.red('sentrySourceMap 上传失败了🐞'))
//       console.log(chalk.red(e))
//     })
// }

const conn = new Client()
const execCmd = (cmd) => {
  if (cmd) {
    return new Promise((resolve, reject) => {
      conn?.exec(cmd, (err, stream) => {
        if (err) reject(err)
        stream.on('close', (event) => resolve(event)).on('data', (_) => 0)
      })
    })
  } else {
    throw '指令为空😂'
  }
}
const execBackupCmd = async () => {
  await execCmd(`rm -rf .${packagePath}.back`) // 移除旧备份
  await execCmd(`mv ${packagePath} .${packagePath}.back`) // 将当前资源转为备份
}

const uploadTips = ora(chalk.green(`正在部署到${envLabel[env]}环境🌈`))

const fetchIp = () => {
  const ip = []
  try {
    const networkInterfaces = os.networkInterfaces()
    for (const key in networkInterfaces) {
      networkInterfaces[key]?.forEach(({ family, address, internal, mac }) => {
        family === 'IPv4' && address !== '127.0.0.1' && !internal && ip.push({ address, mac })
      })
    }
  } catch (e) {
    console.log(chalk.red('获取本地ip信息失败了🐞'))
    console.log(chalk.red(e))
  }
  return JSON.stringify(ip)
}
fs.stat(dist, (err, stats) => {
  if (!err && stats.isDirectory()) {
    fs.writeFile(
      `${dist}log`,
      `hostname: ${os.hostname()}\r\nplatform: ${os.platform()}\r\nip: ${fetchIp()}\r\ndate: ${Date.now()}`,
      'utf8',
      (_) => 0
    )
  }
})

conn
  .on('ready', async () => {
    uploadTips.start()
    try {
      await execBackupCmd()
      scp2.scp(
        dist,
        {
          ...serverMap[env],
          ...accet,
          path: packagePath
        },
        (err) => {
          uploadTips.stop()
          if (err) {
            console.log(chalk.red('项目部署出错了🐞'))
            console.log(chalk.red(err))
          } else {
            console.log(chalk.green(`🎉🎉🎉项目已部署到${envLabel[env]}环境😘💕☕☕☕`))
          }
        }
      )
      conn.end()
    } catch (e) {
      console.log(chalk.red('备份操作出错了🐞'))
      console.log(e)
      uploadTips.stop()
    }
  })
  .connect({
    ...serverMap[env],
    ...accet
  })
