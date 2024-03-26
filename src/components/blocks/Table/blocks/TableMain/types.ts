import { TableHTMLAttributes } from "react";


export type TTableMain = TableHTMLAttributes<HTMLTableElement> & {
    className?: string
    data: any[]
    columns?: string[]
    allowMultiSelect?: boolean
    allowOneSelect?: boolean
    openedItem?: number

    clickItem?: (id: number) => void
    onChangeCheckbox?: (id: number) => void

    selectedItems?: number[]
}