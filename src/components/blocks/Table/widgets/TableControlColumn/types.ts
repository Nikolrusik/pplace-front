

export type TTableControlColumn = {
    name?: string,
    settings: {
        [field: string]: any
    },
    onClick: any,
    parentColumn?: string
    isParent?: boolean
    className?: string
    isSelected: any
}