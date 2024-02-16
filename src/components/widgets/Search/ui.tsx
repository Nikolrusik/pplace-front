import React from "react";
import { TSearch } from "./types";


const Search: React.FC<TSearch> = (props) => {
    const {
        handleChange,
        search,
        goSearch
    } = props

    return (
        <div className="search">
            <div className="option-title">Поиск</div>
            <input
                type="text"
                placeholder="Искомое"
                onChange={handleChange}
                value={search}
            />
            <button className="" onClick={() => goSearch()}>Найти</button>
        </div>
    )
}

export default Search