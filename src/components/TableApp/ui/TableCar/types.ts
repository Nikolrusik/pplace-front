

export type TManufacturer = {
    id: number
    name: string
}

export type TCar = {
    id: number
    manufacturer: TManufacturer
    md5_code: string
    model: string
    engine_char: string
    power: string
    year: string
}
