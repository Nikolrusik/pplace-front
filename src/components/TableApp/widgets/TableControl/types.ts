import React from "react"


export type TTableControl = {
    className?: string,
    onSubmit: (e: any) => void
    setParams: React.Dispatch<any>
    params: {
        [name: string]: any
    }
}