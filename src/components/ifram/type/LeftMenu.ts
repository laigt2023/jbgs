// 子菜单
export interface MeunItemType {
    name: string
    title: string
    icon?: string
    iconComp?: Comment
    routerName: string
    routerPath?: string
    subNav?: Array<MeunItemType>
    permission?: string
    query?: any
}

// 菜单
export interface MeunType {
    name: string
    title: string
    icon?: string
    iconComp?: Comment
    routerName: string
    routerPath?: string
    permission?: string
    children?: Array<MeunItemType>
    url?: string,
    query?: any
}

export const MeunTypeHelper = function (): Array<MeunType> {
  return [] as Array<MeunType>
}
