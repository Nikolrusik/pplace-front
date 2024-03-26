import "./TableHead.scss"
import React from "react"
import { TTableHead } from "./types"
import classNames from "classnames"

const TableHead: React.FC<TTableHead> = (props) => {
    const {
        className,
        setOrdering,
        columns,
        currentOrdering,
        allowMultiSelect = false,
        ...rest
    } = props

    return (
        <thead
            className={classNames(className, 'table-head')}
            {...rest}
        >
            <tr>
                {allowMultiSelect &&
                    <td className={classNames(("head-col"))}>#</td>
                }
                {columns.map((field, index) => (
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
                ))}
            </tr>
        </thead>
    )
}

export default TableHead
