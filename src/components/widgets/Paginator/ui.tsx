import "./Paginator.scss"
import React from "react"
import { TPaginator } from "./types"
import classNames from "classnames"


const Paginator: React.FC<TPaginator> = (props) => {
    const {
        total,
        limit,
        offset,
        setOffset,
        className,
        classNameButton,
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

    const hasNext = currentPage < totalPages.length
    const hasPrev = Boolean(totalPages.length) && currentPage > totalPages[0]

    return (

        <div className={classNames(className, "paginator")}>
            <div className="paginator__wrapper">
                <button className={classNames(classNameButton, "paginator__button")}
                    onClick={() => changePage(currentPage - 1)}
                    disabled={!hasPrev}
                >
                    PREV
                </button>

                <button
                    className={classNames(classNameButton, "paginator__button", {
                        'is-selected': 1 === currentPage,
                    })}
                    onClick={() => changePage(1)}>
                    1
                </button>
                {totalPages.slice(min_slice, max_slice).map((i) => (
                    <button
                        key={i}
                        className={classNames(classNameButton, "paginator__button", {
                            'is-selected': i === currentPage,
                        })}
                        onClick={() => {
                            changePage(i)
                        }}
                    >
                        {i}
                    </button>
                ))
                }
                <button
                    className={classNames(classNameButton, "paginator__button", {
                        'is-selected': totalPages.length === currentPage,
                    })}
                    onClick={() => { changePage(totalPages.length) }}>
                    {totalPages.length}
                </button>
                <button
                    className={classNames(classNameButton, "paginator__button")}
                    onClick={() => changePage(currentPage + 1)}
                    disabled={!hasNext}
                >
                    NEXT
                </button>
            </div>
        </div>
    )
}

export default Paginator