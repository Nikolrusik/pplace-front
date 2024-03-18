import React from "react"
import { TCar } from "./TableCar/types"
import classNames from "classnames"


type A = {
    settingObject: {
        [name: string]: boolean
    },
    setOrdering?: (value: string) => void,
    currentOrdering?: string
}
const Table: React.FC<A> = (props) => {
    const {
        settingObject,
        setOrdering,
        currentOrdering
    } = props

    const viewColumns = Object.keys(settingObject).filter((x) => !!settingObject[x])

    return (
        <>
            {viewColumns.map((field, index) => (
                <td
                    className={classNames("head-col", {
                        'order-start': currentOrdering === field,
                        'order-end': currentOrdering === '-' + field
                    })}
                    key={index}
                    onClick={() => {
                        if (currentOrdering === field) {
                            setOrdering(`-${field}`)
                        } else {
                            setOrdering(field)
                        }
                    }}
                >
                    {field}
                </td>
            ))
            }
        </>
    )
}

export default Table