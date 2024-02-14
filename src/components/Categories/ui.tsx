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
                search: search
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
            search: isSearch ? search : ''
        })
        const newParams = createSearchParams(params)
        setSearchParams(newParams)

        fetchData(limit, offset, isSearch ? search : '')
    }, [offset, limit, isSearch])


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
        fetchData(limit, offset, isSearch ? search : '')
    }


    const handleInputChange = (event: any) => {
        const input = event.target.value
        setSearch(input)
    }

    return (
        <div className="cars">
            <Search
                search={search}
                goSearch={goSearch}
                handleChange={handleInputChange}
            />
            <div className="cars-categories">
                {carMarks.map((carMark) => (
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