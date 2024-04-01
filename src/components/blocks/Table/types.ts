import React from "react"
export type TControlledTableFieldSettings = {
    [field: string]: boolean | TControlledTableFieldSettings
}

export type TTableHasOptions = {
    hasPaginator?: boolean,
    hasControl?: boolean,
    hasSearch?: boolean,
    hasInfo?: boolean,
}

export type TTable = TTableHasOptions & {
    endpoint: string
    uniqueTableName: string,
    settings: TControlledTableFieldSettings,
    updateSettings: React.Dispatch<React.SetStateAction<any>>
    outsideFilters?: {
        [field: string]: any
    }

    selectedItems?: any[],
    setSelectedItems?: React.Dispatch<React.SetStateAction<any>>,

    openedItem?: number,
    setOpenedItem?: (value: any) => void

    controlPosition?: 'top' | 'bottom',
    controlType?: 'static' | 'fixed',

    className?: string,
    defaultPageSize?: number,

    limits?: number[]

    allowMultiSelect?: boolean
    allowOneSelect?: boolean
}

