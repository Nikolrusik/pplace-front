

export type TTableInfo = {
    className?: string,
    total: number,

    selectedItems: any[],
    setSelectedItems: React.Dispatch<React.SetStateAction<any>>,
}