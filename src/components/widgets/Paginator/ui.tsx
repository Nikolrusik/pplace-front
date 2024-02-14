import "./Paginator.scss"
import classNames from "classnames";
import React from "react";
import { TPaginator } from "./types";


const Paginator: React.FC<TPaginator> = (props) => {
    const {
        pages,
        currentPage,
        setOffset,
        limit
    } = props

    return (
        <div className="paginator">
            {pages[0] !== currentPage &&
                <div
                    className="paginator__item"
                    onClick={() => { setOffset((prev: number) => prev - limit) }}
                >
                    prev
                </div>
            }
            {pages.map((page) => (

                <div className={classNames('paginator__item', {
                    'paginator__item--current': page === currentPage
                })}

                    onClick={() => {
                        setOffset(limit * (page - 1))
                    }}
                    key={page}
                >
                    {page}
                </div>
            ))}
            {pages.length !== currentPage &&
                <div
                    className="paginator__item"
                    onClick={() => { setOffset((prev: number) => prev + limit) }}
                >
                    next
                </div>
            }
        </div>
    )
}

export default Paginator