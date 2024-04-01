import { RefObject, TableHTMLAttributes } from "react";
import { TControlledTableFieldSettings } from "../../types";


export type TTableMain = TableHTMLAttributes<HTMLTableElement> & {
    className?: string
    data: any[]
    columns?: string[]

    openedItem?: number

    clickItem?: (id: number) => void
    onChangeCheckbox?: (id: number) => void

    selectedItems?: number[]
    ref?: RefObject<HTMLTableElement>

    settings: TControlledTableFieldSettings

    setOrdering?: (field: string) => void
    currentOrdering?: string

    isLoading?: boolean,

    allowMultiSelect?: boolean
    allowOneSelect?: boolean
}