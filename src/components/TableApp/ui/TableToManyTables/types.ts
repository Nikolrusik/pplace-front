export type TTableToManyTables = {
    data: any
    defaultSettings: any
    updateSettings: any
    setSelectedItems?: React.Dispatch<React.SetStateAction<any>>
    selectedItems?: any

    openedItem?: null | number,
    setOpenedItem?: React.Dispatch<React.SetStateAction<null | number>>,
    outsideFilters?: {
        [field: string]: any
    }
}