import React from "react"
import { TCar } from "./TableCar/types"


type A = {
    settingObject: {
        [name: string]: boolean
    }
}
const Table: React.FC<A> = (props) => {
    const {
        settingObject
    } = props

    const viewColumns = Object.keys(settingObject).filter((x) => !!settingObject[x])

    return (
        <>
            {viewColumns.map((field, index) => (
                <td className="" key={index}>{field}</td>
            ))
            }
        </>
    )
}

export default Table