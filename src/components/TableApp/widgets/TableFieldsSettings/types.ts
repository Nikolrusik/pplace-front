

export type TTableFieldsSettings = {
    className?: string
    currentSettings: any
    fieldClickHandler: (parentColumn: string, subColumn?: string, openChild?: any) => void
}