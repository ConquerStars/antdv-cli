import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/stores'

import 'ant-design-vue/dist/antd.variable.min.css'
import '@/assets/style/main.less'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

// import * as Sentry from '@sentry/browser'
// import { BrowserTracing } from '@sentry/tracing'

// // https://docs.sentry.io/platforms/javascript/
// import.meta.env.VITE_SENTRY_DSN &&
//   Sentry.init({
//     dsn: import.meta.env.VITE_SENTRY_DSN,
//     integrations: [new BrowserTracing()],
//     release: 'vue-project@1.0.0',
//     // Set tracesSampleRate to 1.0 to capture 100%
//     // of transactions for performance monitoring.
//     // We recommend adjusting this value in production
//     tracesSampleRate: 1.0
//   })

createApp(App).use(store).use(router).mount('#app')
