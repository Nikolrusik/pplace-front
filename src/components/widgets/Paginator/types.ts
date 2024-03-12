

export type TPaginator = {
    total: number,
    limit: number,
    offset: number,
    setOffset: (e: number) => void
    className?: string
    classNameButton?: string
}