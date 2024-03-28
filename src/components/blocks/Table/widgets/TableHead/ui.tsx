import "./TableHead.scss"
import React from "react"
import { TTableHead } from "./types"
import classNames from "classnames"

const Caret: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" >
            <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
        </svg >
    )
}

const TableHead: React.FC<TTableHead> = (props) => {
    const {
        className,
        setOrdering,
        columns,
        currentOrdering,
        allowMultiSelect = false,
        settings,
        ...rest
    } = props

    return (
        <thead
            className={classNames(className, 'table-head')}
            {...rest}
        >
            <tr>
                {allowMultiSelect &&
                    <td className={classNames('table-head__col')}><span>#</span></td>
                }
                {columns.map((field, index) => (
                    <td
                        className={classNames("table-head__col", {
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
                        <span>
                            {(currentOrdering === field || currentOrdering === '-' + field) &&
                                <div className="caret"><Caret /></div>
                            }
                            {field}
                        </span>
                    </td>
                ))}
            </tr>
        </thead>
    )
}

export default TableHead
