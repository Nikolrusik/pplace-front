import { TControlledTableFieldSettings } from "../../types"


export type TTableControlTop = {
    className?: string

    params?: { [field: string]: any }

    setParam: (param: string, value: any) => void,
    total?: number

    hasPaginator?: boolean,
    hasSearch?: boolean,
    hasInfo?: boolean,
    hasLimit?: boolean

    selectedItems: any[],
    setSelectedItems: React.Dispatch<React.SetStateAction<any>>,
    goSearch: (value: string) => void

    limits?: number[]
    fixed?: boolean

    settings?: TControlledTableFieldSettings
    updateSettings?: React.Dispatch<React.SetStateAction<any>>
}