import React from "react"
import { TTableSearch } from "./types"
import Button from "../../../../generic/Button"
import Input from "../../../../generic/Input"


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
            <Input name="search" type="text"
                defaultValue={value}
            />
            <Button type="submit">Найти</Button>
        </form>
    )
}

export default TableSearch