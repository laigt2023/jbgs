import { createPinia } from 'pinia'
import { useAppStore } from './modules/app'
import { usePermissionStore } from './modules/permissions'
import { usePropertiesStroe } from '@store/modules/properties'
import { useUserStore } from './modules/user'
const pinia = createPinia()

export { useUserStore, useAppStore, usePermissionStore, usePropertiesStroe }
export default pinia
