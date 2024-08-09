import { ReactNode } from "react"

export type MenuProps = {
    path: string,
    name: string,
    icon: ReactNode,
    submenu?:MenuProps
}
