import { ChangeEvent } from "react"


export type TSearch = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    search: string,
    goSearch: () => void
}