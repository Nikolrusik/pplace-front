import { TableHTMLAttributes } from "react"
import { TControlledTableFieldSettings } from "../../types"


export type TTableHead = TableHTMLAttributes<HTMLTableSectionElement> & {
    columns: string[],
    currentOrdering?: any,
    setOrdering?: (field: string) => void
    allowMultiSelect?: boolean

    settings: TControlledTableFieldSettings
}