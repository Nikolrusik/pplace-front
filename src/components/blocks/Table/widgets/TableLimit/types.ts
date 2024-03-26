

export type TTableLimit = {
    className?: string,
    limit: number,
    setParam: (param: string, value: any) => void,
    limits?: number[]
}