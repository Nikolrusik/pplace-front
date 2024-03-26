import React from "react"
type TControlledTableFieldSettings = {
    [field: string]: boolean | TControlledTableFieldSettings
}
export type TTable = {
    className?: string,
    uniqueTableName: string,
    settings: TControlledTableFieldSettings,
    hasPaginator?: boolean,
    hasHead?: boolean,
    hasSearch?: boolean,
    hasInfo?: boolean,

    defaultPageSize?: number,
    outsideFilters?: {
        [field: string]: any
    }
    updateSettings: React.Dispatch<React.SetStateAction<any>>
    endpoint?: string


    selectedItems: any[],
    setSelectedItems: React.Dispatch<React.SetStateAction<any>>,

    openedItem?: number,
    setOpenedItem?: (value: any) => void
} 