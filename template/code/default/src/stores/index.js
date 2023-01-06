import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import account from '@/stores/account'
import layout from '@/stores/layout'

export { account, layout }
export default createPinia().use(piniaPersist)
