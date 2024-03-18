import React from "react"

type TControlledTableFieldSettings = {
    [field: string]: boolean | TControlledTableFieldSettings
}

export type TControlledTable = {
    settings: TControlledTableFieldSettings,
    tableName: string,
    updateSettings: React.Dispatch<React.SetStateAction<any>>
    endpoint: string
    selectedItems: any[],
    setSelectedItems: React.Dispatch<React.SetStateAction<any>>,
    openedItem?: null | number,
    setOpenedItem?: React.Dispatch<React.SetStateAction<null | number>>,
    outsideFilters?: {
        [field: string]: any
    }
}