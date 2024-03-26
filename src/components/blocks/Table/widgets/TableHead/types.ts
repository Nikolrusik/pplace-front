import { TableHTMLAttributes } from "react"


export type TTableHead = TableHTMLAttributes<HTMLTableSectionElement> & {
    columns: string[],
    currentOrdering?: any,
    setOrdering?: any
    allowMultiSelect?: boolean
}