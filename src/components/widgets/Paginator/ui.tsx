import "./Paginator.scss"
import React from "react"
import { TPaginator } from "./types"


const Paginator: React.FC<TPaginator> = (props) => {
    const {
        total,
        limit,
        offset,
        setOffset
    } = props

    const currentPage = Math.ceil(offset / limit + 1)


    const totalPages = Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1);

    const for_min = currentPage <= 3 ? 6 : currentPage + 2
    const for_max = currentPage + 2 > totalPages[totalPages.length - 2] ? totalPages[totalPages.length - 2] - 5 : currentPage - 3

    const max_slice = currentPage + 2 > totalPages[totalPages.length - 2] ? totalPages.length - 1 : for_min
    const min_slice = currentPage > 3 ? for_max : 1

    const changePage = (page: number) => {
        const currOffset = page * limit - limit
        setOffset(currOffset)
    }

    console.log(currentPage)
    return (

        <div className="table_car__paginator">
            <div className=""
                onClick={() => changePage(currentPage - 1)}
            >PREV</div>
            <div onClick={() => changePage(1)}>
                1   {1 === currentPage && '++'}
            </div>
            {totalPages.slice(min_slice, max_slice).map((i) => (
                <div
                    onClick={() => {
                        changePage(i)
                    }}
                >
                    {i} {i === currentPage && '++'}
                </div>
            ))
            }
            <div onClick={() => { changePage(totalPages.length) }}>
                {totalPages.length}  {totalPages.length === currentPage && '++'}
            </div>
            <div className=""
                onClick={() => changePage(currentPage + 1)}
            >NEXT</div>
        </div>
    )
}

export default Paginator