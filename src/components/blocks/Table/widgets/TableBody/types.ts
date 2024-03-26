import { TableHTMLAttributes } from "react";


export type TTTableBody = TableHTMLAttributes<HTMLTableSectionElement> & {
    data: any[]
    className?: string
    columns?: string[]
    allowMultiSelect?: boolean

    clickItem?: (id: number) => void
    onChangeCheckbox?: (id: number) => void
    openedItem?: number

    selectedItems?: number[]
}