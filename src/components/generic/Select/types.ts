import { SelectHTMLAttributes } from "react"


export type TSelect = SelectHTMLAttributes<HTMLSelectElement> & {
    className?: string,
    options?: any
}