

import "./TableLimit.scss"
import React from "react"
import { TTableLimit } from "./types"
import classNames from "classnames"


const TableLimit: React.FC<TTableLimit> = (props) => {
    const {
        className,
        setParam,
        limit,
        limits,
    } = props


    return (
        <div className={classNames(className, "table-limit")}>
            <div className='table-limit__label'>
                Размер
            </div>
            <select
                value={limit}
                onChange={(e) => setParam('limit', Number(e.target.value))}
            >
                {limits.map((item) => (
                    <option value={item}>{item}</option>
                ))}
            </select>
        </div>
    )
}


export default TableLimit
