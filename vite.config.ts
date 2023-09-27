import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import visualizer from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import CONFIG from './src/config'
import path from 'path'
import proxy from './src/config/vite/proxy'

function resovePath(paths: string) {
  // 如何 __dirname 找不到 需要 yarn add @types/node --save-dev
  return path.resolve(__dirname, paths)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // plugins: [visualizer()] - 添加打包分析工具
    plugins: [
      vue(),
      // 编译分析工具
      visualizer(),
      // 编译压缩工具 （gzip）
      viteCompression(),
      // setup语法糖上支持配置组件名称（name）属性
      vueSetupExtend(),
      // eslint
      eslintPlugin({
        include: [
          'src/**/*.ts',
          'src/**/*.js',
          'src/**/*.vue',
          'src/*.js',
          'src/*.ts',
          'src/*.vue'
        ],
        exclude: ['src/components/svg/*']
      }),
      // 使用svg图标插件 :iconDirs配置准确路径，扫描很耗费时间
      createSvgIconsPlugin({
        iconDirs: ['src/components/icons'],
        symbolId: 'icon-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@config': resovePath('./config'),
        '@components': resovePath('./src/components'),
        '@assets': resovePath('./src/assets'),
        '@store': resovePath('./src/store'),
        '@api': resovePath('./src/api'),
        '@views': resovePath('./src/views'),
        '@utils': resovePath('./src/utils')
      }
    },
    define: {
      'process.env.VITE_APP_NAME': JSON.stringify(env.VITE_APP_NAME),
      'process.env.VITE_API_MOCK': JSON.stringify(env.VITE_API_MOCK),
      'process.env.VITE_ENV_MODE': JSON.stringify(env.VITE_ENV_MODE),
      'process.env.VITE_ROUTER_MODE': JSON.stringify(env.VITE_ROUTER_MODE),
      'process.env.VITE_IS_DEMO': JSON.stringify(env.VITE_IS_DEMO),
      'process.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL)
    },
    server: {
      // 设置为'0.0.0.0' 所有网卡都会启动服务
      host: '0.0.0.0',
      // 服务端口
      port: Number(env.VITE_PORT || CONFIG.SERVER_PORT),
      // 设置是否为https
      https: false,
      // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
      strictPort: false,
      // 设置接口代理，下发为/api转发到服务端  现在引用proxy方式进行配置
      proxy,
      // 热更新
      hmr: {
        // 设置为false时，编译错误时不弹出屏蔽层
        overlay: true
      },

      // 为开发服务器配置 CORS。默认启用并允许任何源
      cors: true
      // 关掉指定跨域限制
      // 设置origin
      // origin: "http://127.0.0.1:8080/"
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          charset: false
        }
      }
    },
    build: {
      // 打包路径
      outDir: 'dist',

      // 打包混淆 'terser' | 'esbuild',设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。默认为 Esbuild
      // minify: 'esbuild',
      minify: 'terser',

      // gizp 打包优化
      // assetsDir: './unify-portal/static',
      chunkSizeWarningLimit: 500,
      cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      terserOptions: {
        compress: {
          // warnings: false,
          drop_console: true, // 打包时删除console
          drop_debugger: true, // 打包时删除 debugger
          pure_funcs: ['console.log']
        }
      },
      brotliSize: false
    }
  }
})
