import "./TableControl.scss"
import React from "react"
import { TTableControl } from "./types"
import classNames from "classnames"



const TableControl: React.FC<TTableControl> = (props) => {
    const {
        className,
        onSubmit,
        params,
        setParams
    } = props
    console.log("TB", params)
    return (
        <div className={classNames("table_control", className)}>
            <form onSubmit={onSubmit}>
                <div className="table_control__search">
                    <div className="table_control__label">Поиск</div>
                    <input name="search" type="text" defaultValue={params.search} />
                    <button type="submit">Найти</button>
                </div>
                <div className="table_control__limit">
                    <div className="table_control__label">Кол-во на странице</div>
                    <select name="car_limit" value={params.limit}
                        onChange={(e) => setParams((prevParams: any) => ({ ...prevParams, limit: Number(e.target.value) }))}
                    >
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default TableControl