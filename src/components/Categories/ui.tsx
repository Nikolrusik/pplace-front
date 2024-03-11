import React, { useState, useEffect, ChangeEvent } from "react";

import "./Categories.scss"
import axios from "axios"
import cars from "../../testdata/cars.json"
import BACKEND_URL from "../../constants/constants";
import { Link, createSearchParams, useSearchParams, useLocation } from "react-router-dom";
import { CARS, MAIN, MODELS } from "../../constants/paths";
import Paginator from "../widgets/Paginator";
import Search from "../widgets/Search";
import Settings from "../widgets/Settings";
import API_TOKEN from "../../constants/tokens";

type cars = {
    id: number
    name: string,
    icon: string,
}

const Categories = () => {
    const [carMarks, setCarMarks] = useState<cars[]>([])
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const currLimit = Number(queryParams.get('limit')) ? Number(queryParams.get('limit')) : 5
    const currOffset = Number(queryParams.get('offset')) ? Number(queryParams.get('offset')) : 0
    const currOrdering = queryParams.get('ordering') ? queryParams.get('ordering') : 'name'
    const currIsSearch = queryParams.get('is_search') === 'true'
    const currSearch = queryParams.get('search') ? queryParams.get('search') : ''

    const [limit, setLimit] = useState(currLimit)
    const [offset, setOffset] = useState(currOffset)
    const [search, setSearch] = useState(currSearch)
    const [total, setTotal] = useState(0)
    const [isSearch, setIsSearch] = useState(currIsSearch)
    const [sort, setSort] = useState(currOrdering)

    const pages = Array.from({ length: Math.ceil(total / limit) }, (_, i) => i + 1);
    const currentPage = offset / limit + 1


    const [_, setSearchParams] = useSearchParams()

    const headers = {
        'Authorization': `Token ${API_TOKEN}`,

    }
    const fetchData = (limit?: number, offset?: number, search?: string) => {
        axios.get(BACKEND_URL + '/cars/manufacturer/', {
            headers: headers,
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
            .catch(() => { })
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
    const [tempLimit, setTempLimit] = useState(limit)
    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
        const val = Number(event.target.value)
        setTempLimit(val)
    }

    const saveLimit = () => {
        if (tempLimit > 0) {
            setLimit(tempLimit)
        } else {
            setLimit(5)
            setTempLimit(5)
        }
    }
    const currentLocationState = {
        'limit': limit,
        'offset': offset,
        'ordeing': sort,
        'search': search,
        'is_search': `${isSearch}`,
    }
    return (
        <div className="cars">
            <div className="control">
                <Link to={MAIN} className="cars-marks__back button">Назад</Link>
                <Search
                    search={search}
                    goSearch={goSearch}
                    handleChange={handleInputChange}
                />
                <div className="sorting">
                    <div className="option-title">Сортировка</div>
                    <select name="sorter" id="" onChange={handleOrderChange} defaultValue={sort}>
                        <option value="name" >По алфавиту</option>
                        <option value="-name" >Обратно по алфавиту</option>
                    </select>
                </div>
                <Settings handleChange={handleLimitChange} value={tempLimit} onSave={saveLimit} />
            </div>
            <div className="cars-categories">
                {carMarks.length > 0 &&
                    carMarks.map((carMark) => (
                        <Link
                            className="cars-categories__item"
                            to={`/${CARS}/?ordering=${sort}&manufacturer=${carMark.id}`}
                            key={carMark.id}
                            state={currentLocationState}
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
                    total={total}
                    offset={offset}
                />
            }
            {/* <Outlet /> */}
        </div >
    )
}

export default Categories