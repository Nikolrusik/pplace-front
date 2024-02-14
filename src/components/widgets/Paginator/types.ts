import { SetStateAction } from "react"


export type TPaginator = {
    currentPage: number
    pages: number[]
    limit: number
    setOffset: SetStateAction<any>
}