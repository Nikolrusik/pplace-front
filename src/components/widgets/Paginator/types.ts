

export type TPaginator = {
    total: number,
    limit: number,
    offset: number,
    setOffset: (e: number) => void
}