import { Link, createSearchParams, useLocation, useSearchParams } from "react-router-dom";
import "./Engines.scss"
import React, { ChangeEvent, useEffect, useState } from "react"
import { MAIN } from "../../constants/paths";
import Search from "../widgets/Search";
import Settings from "../widgets/Settings";
import Paginator from "../widgets/Paginator";
import BACKEND_URL from "../../constants/constants";
import axios from "axios";

type engine = {
    id: number
    name: string
    volume: string
    type_fuel: string
    compression: string
}

const Engines: React.FC = () => {

    const [engines, setEngines] = useState<engine[]>([])
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const currLimit = Number(queryParams.get('limit')) ? Number(queryParams.get('limit')) : 15
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
        // 'Authorization': `Token ${API_TOKEN}`,

    }
    const fetchData = (limit?: number, offset?: number, search?: string) => {
        axios.get(BACKEND_URL + '/cars/engine/', {
            headers: headers,
            params: {
                limit: limit,
                offset: offset,
                search: search,
                ordering: sort,
            }
        })
            .then((resp) => {
                setTotal(resp.data.count)
                setEngines(resp.data?.results)

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


    return (
        <div className="engines">
            <div className="engines__head">

                <Link to={MAIN} className="engines-marks__back button">Назад</Link>
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
            <div className="engines__content">
                <table className="engines__items">
                    <thead>
                        <tr className="engines__item engines__item-head">
                            <td className="engines__item-col engines__item-head-col">Название</td>
                            <td className="engines__item-col engines__item-head-col">Компрессия</td>
                            <td className="engines__item-col engines__item-head-col">Тип топлива</td>
                            <td className="engines__item-col engines__item-head-col">Объём л.</td>
                        </tr>
                    </thead>
                    <tbody>
                        {engines.map((engine) => (
                            <tr className="engines__item" key={engine.id}>
                                <td className="engines__item-col">{engine.name}</td>
                                <td className="engines__item-col">{engine.compression}</td>
                                <td className="engines__item-col">{engine.type_fuel}</td>
                                <td className="engines__item-col">{engine.volume}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                {pages.length > 1 &&
                    <Paginator
                        setOffset={setOffset}
                        limit={limit}
                        currentPage={currentPage}
                        pages={pages}
                    />
                }
            </div>
        </div>
    )
}

export default Engines