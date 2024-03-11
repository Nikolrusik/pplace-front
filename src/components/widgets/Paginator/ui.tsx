import "./Paginator.scss";
import classNames from "classnames";
import React from "react";
import { TPaginator } from "./types";

const Paginator: React.FC<TPaginator> = ({ pages, currentPage, setOffset, limit }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === pages.length;

    const handlePrevClick = () => {
        if (!isFirstPage) {
            setOffset((prev: any) => prev - limit);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        setOffset(limit * (pageNumber - 1));
    };

    const handleNextClick = () => {
        if (!isLastPage) {
            setOffset((prev: any) => prev + limit);
        }
    };

    const renderPageItems = () => {
        const startIndex = Math.max(1, currentPage - 2);
        const endIndex = Math.min(pages.length, currentPage + 2);

        const pageItems = Array.from({ length: endIndex - startIndex + 1 }, (_, index) => startIndex + index);

        // Убираем дубликаты на краях
        if (pageItems[0] === 1) pageItems.shift();
        if (pageItems[pageItems.length - 1] === pages.length) pageItems.pop();

        return pageItems.map((page) => (
            <div
                key={page}
                className={classNames('paginator__item', {
                    'paginator__item--current': page === currentPage
                })}
                onClick={() => handlePageClick(page)}
            >
                {page}
            </div>
        ));
    };

    return (
        <div className="paginator">
            <button
                className={classNames('paginator__item', {
                    'paginator__item--disabled': isFirstPage
                })}
                disabled={isFirstPage}
                onClick={handlePrevClick}
            >
                prev
            </button>
            {pages.length > 1 && (
                <div
                    className={classNames('paginator__item', {
                        'paginator__item--current': 1 === currentPage
                    })}
                    onClick={() => handlePageClick(1)}
                >
                    1
                </div>
            )}
            {currentPage > 3 && (
                <div className="paginator__item">...</div>
            )}
            {renderPageItems()}
            {currentPage + 2 < pages.length && (
                <div className="paginator__item">...</div>
            )}
            {pages.length > limit && (
                <div
                    className={classNames('paginator__item', {
                        'paginator__item--current': pages.length === currentPage
                    })}
                    onClick={() => handlePageClick(pages.length)}
                >
                    {pages.length}
                </div>
            )}
            <button
                className={classNames('paginator__item', {
                    'paginator__item--disabled': isLastPage
                })}
                disabled={isLastPage}
                onClick={handleNextClick}
            >
                next
            </button>
        </div>
    );
};

export default Paginator;
