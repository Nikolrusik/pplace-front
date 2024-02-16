import React, { ChangeEvent, useEffect, useState } from "react"
import { TModels } from "./types"
import { Link, createSearchParams, useLocation, useParams, useSearchParams } from "react-router-dom"
import axios from "axios"
import BACKEND_URL from "../../constants/constants"
import { MAIN, PARTS } from "../../constants/paths"
import Search from "../widgets/Search"
import Paginator from "../widgets/Paginator"
import Settings from "../widgets/Settings"

type modes = {
    id: number
    name: string
}

const Models: React.FC<TModels> = () => {
    const { id } = useParams()
    const [models, setModels] = useState<modes[]>([])

    const [limit, setLimit] = useState(5)
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
        axios.get(`${BACKEND_URL}/cars/marks_car/${id}/`, {
            params: {
                limit: limit,
                offset: offset,
                search: search,
                ordering: sort
            }
        })
            .then((resp) => {
                setTotal(resp.data.count)
                setModels(resp.data.results)
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
    return (
        <div className="cars-marks">
            <div className="control">
                <Link to={MAIN} className="cars-marks__back button">Назад</Link>
                <Search
                    search={search}
                    goSearch={goSearch}
                    handleChange={handleInputChange}
                />
                <div className="sorting">
                    <div className="option-title">Сортировка</div>
                    <select name="sorter" id="" onChange={handleOrderChange}>
                        <option value="name">По алфавиту</option>
                        <option value="-name">Обратно по алфавиту</option>
                    </select>
                </div>

                <Settings handleChange={handleLimitChange} value={tempLimit} onSave={saveLimit} />
            </div>
            <div className="cars-marks__list">
                {models.length > 0 &&
                    models.map((model) => (
                        <Link
                            to={'/' + PARTS + '/' + id}
                            className="cars-marks__mark"
                            key={model.id}
                        >
                            {model.name}
                        </Link>
                    ))}
                {models.length === 0 &&
                    <div className="cars-marks__empty">
                        Нет ни одной модели
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

export default Models