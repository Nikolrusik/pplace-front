import { ChangeEvent } from "react"


export type TSettings = {
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
    value: number
    onSave: () => void
}