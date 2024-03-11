

export type TCategory = {
    id: number
    name: string
}

export type TPart = {
    id: number
    category: TCategory
    lynx_pn: string
    url: string
    name: string
    description: string
}