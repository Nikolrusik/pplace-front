

import "./TableLimit.scss"
import React from "react"
import { TTableLimit } from "./types"
import classNames from "classnames"
import Select from "../../../../generic/Select"


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
            <Select
                value={limit}
                onChange={(e) => setParam('limit', Number(e.target.value))}
            >
                {limits.map((item) => (
                    <option value={item} key={item}>{item}</option>
                ))}
            </Select>
        </div>
    )
}


export default TableLimit
