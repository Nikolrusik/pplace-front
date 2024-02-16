import "./Parts.scss"
import axios from "axios"
import React, { ChangeEvent, useEffect, useState } from "react"
import BACKEND_URL from "../../constants/constants"
import { Link, createSearchParams, useLocation, useParams, useSearchParams } from "react-router-dom"
import Search from "../widgets/Search"
import Paginator from "../widgets/Paginator"
import { TParts } from "./types"
import { MODELS } from "../../constants/paths"
import Settings from "../widgets/Settings"


type parts = {
    id: number
    name: string
    icon: string
}
const Parts: React.FC<TParts> = () => {
    const { model_id } = useParams()

    const [parts, setParts] = useState<parts[]>([])

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
        axios.get(`${BACKEND_URL}/cars/parts/${model_id ? model_id + '/' : ''}`, {
            params: {
                limit: limit,
                offset: offset,
                search: search,
                ordering: sort
            }
        })
            .then((resp) => {
                setTotal(resp.data.count)
                setParts(resp.data?.results)
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
        <div className="parts">
            <div className="control">

                <Link to={`/${MODELS}/${model_id ? model_id : ''}`} className="cars-marks__back button">Назад</Link>
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
            <div className="parts__list">
                {parts.length > 0 &&
                    parts.map((part) => (
                        <div className="parts__part" key={part.id}>
                            <img src={part.icon} alt="part icon" />
                            <div className="parts__part-name">{part.name}</div>
                        </div>
                    ))
                }
                {parts.length === 0 &&
                    <div className="parts__empty">Нет ни одной запчасти</div>
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

export default Parts