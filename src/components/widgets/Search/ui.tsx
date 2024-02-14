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
            <input
                type="text"
                placeholder="Искомое"
                onChange={handleChange}
                value={search}
            />
            <div className="" onClick={() => goSearch()}>Найти</div>
        </div>
    )
}

export default Search