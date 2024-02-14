import React, { useState, useEffect } from "react";

import "./Categories.scss"
import axios from "axios"
import cars from "../../testdata/cars.json"
import BACKEND_URL from "../../constants/constants";
import { Link, useLocation, useNavigate, createSearchParams, useSearchParams } from "react-router-dom";
import { MODELS } from "../../constants/paths";
import classNames from "classnames";
import Paginator from "../widgets/Paginator";
import Search from "../widgets/Search";

type cars = {
    id: number
    name: string,
    icon: string,
}

const Categories = () => {
    const [carMarks, setCarMarks] = useState<cars[]>([])

    const [limit, setLimit] = useState(1)
    const [offset, setOffset] = useState(0)
    const [search, setSearch] = useState('')
    const [total, setTotal] = useState(0)
    const [isSearch, setIsSearch] = useState(false)
    const [sort, setSort] = useState('name')

    const pages = Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1);
    const currentPage = offset / limit + 1

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currLimit = Number(queryParams.get('limit'))
    const currOffset = Number(queryParams.get('offset'))
    const [_, setSearchParams] = useSearchParams()



    const fetchData = (limit?: number, offset?: number, search?: string) => {
        axios.get(BACKEND_URL + '/cars/cars/', {
            params: {
                limit: limit,
                offset: offset,
                search: search,
                ordering: sort
            }
        })
            .then((resp) => {
                setTotal(resp.data.count)
                setCarMarks(resp.data?.results)

            })
    }

    useEffect(() => {
        const params = new URLSearchParams({
            limit: `${limit}`,
            offset: `${offset}`,
            search: isSearch ? search : '',
            ordering: sort
        })
        const newParams = createSearchParams(params)
        setSearchParams(newParams)

        fetchData(limit, offset, isSearch ? search : '')
    }, [offset, limit, isSearch, sort])


    useEffect(() => {
        if (currLimit) {
            setLimit(currLimit)
        }
        if (currOffset && currOffset >= pages[0] && currOffset <= pages.length)
            setOffset(currOffset)

    }, [currLimit, currOffset])


    const goSearch = () => {
        if (search !== '') {
            setIsSearch(true)
        } else {
            setIsSearch(false)
        }
        setOffset(0)
        fetchData(limit, offset, isSearch ? search : '')
    }


    const handleInputChange = (event: any) => {
        const input = event.target.value
        setSearch(input)
    }
    const handleOrderChange = (event: any) => {
        const val = event.target.value
        setOffset(0)
        setSort(val)
    }

    return (
        <div className="cars">
            <div className="control">
                <Search
                    search={search}
                    goSearch={goSearch}
                    handleChange={handleInputChange}
                />
                <div className="sorting">
                    <select name="sorter" id="" onChange={handleOrderChange}>
                        <option value="name">По алфавиту</option>
                        <option value="-name">Обратно по алфавиту</option>
                    </select>
                </div>
            </div>
            <div className="cars-categories">
                {carMarks.length > 0 &&
                    carMarks.map((carMark) => (
                        <Link
                            className="cars-categories__item"
                            to={`${MODELS}/${carMark.id}`}
                            key={carMark.id}
                        >
                            <img src={carMark.icon} alt="mark icon" />
                            <p className="cars-categories__item-name">{carMark.name}</p>
                        </Link>
                    ))
                }
                {carMarks.length === 0 &&
                    <div className="cart-categories__empty">
                        Нет ни одной марки
                    </div>
                }
            </div>
            {pages.length > 1 &&
                <Paginator
                    setOffset={setOffset}
                    limit={limit}
                    currentPage={currentPage}
                    pages={pages}
                />
            }
        </div>
    )
}

export default Categories