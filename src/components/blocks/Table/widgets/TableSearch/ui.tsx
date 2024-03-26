import React from "react"
import { TTableSearch } from "./types"


const TableSearch: React.FC<TTableSearch> = (props) => {
    const {
        value,
        goSearch
    } = props


    const onSubmit = (e: any) => {
        e?.preventDefault()
        goSearch(e.target.search.value)
    }

    return (
        <form className="table_control__search" onSubmit={onSubmit}>
            <input name="search" type="text"
                defaultValue={value}
            />
            <button type="submit">Найти</button>
        </form>
    )
}

export default TableSearch