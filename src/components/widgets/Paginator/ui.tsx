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
            <button
                className={classNames('paginator__item', {
                    'paginator__item--disabled': pages[0] === currentPage
                })}
                disabled={pages[0] === currentPage}
                onClick={() => { setOffset((prev: number) => prev - limit) }}
            >
                prev
            </button>
            {pages.length > 1 &&
                <div className={classNames('paginator__item', {
                    'paginator__item--current': 1 === currentPage
                })}

                    onClick={() => {
                        setOffset(0)
                    }}
                >
                    1
                </div>
            }
            {pages.slice(
                currentPage > 3 ? currentPage - 3 : 1, currentPage + 2 < pages.length ? currentPage + 2 : pages.length - 1
            ).map((page) => (
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

            {pages.length > limit &&
                <div className={classNames('paginator__item', {
                    'paginator__item--current': pages.length === currentPage
                })}

                    onClick={() => {
                        setOffset(limit * (pages.length - 1))
                    }}
                >
                    {pages.length}
                </div>
            }
            <button
                className={classNames('paginator__item', {
                    'paginator__item--disabled': pages.length === currentPage
                })}
                disabled={pages.length === currentPage}
                onClick={() => { setOffset((prev: number) => prev + limit) }}
            >
                next
            </button>
        </div>
    )
}

export default Paginator