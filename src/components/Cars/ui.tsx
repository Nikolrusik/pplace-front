import { Link, createSearchParams, useLocation, useSearchParams } from "react-router-dom";
import "./Cars.scss"
import React, { ChangeEvent, useEffect, useState } from "react"
import BACKEND_URL from "../../constants/constants";
import axios from "axios";
import Search from "../widgets/Search";
import Paginator from "../widgets/Paginator";
import Settings from "../widgets/Settings";
import { MANUFACTURERS } from "../../constants/paths";


type car = {
    id: number,
    model: string,
    modification: string,
    transmission: string,
    articul: string
}

const Cars: React.FC = () => {
    const [cars, setCars] = useState<car[]>([])
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const currLimit = Number(queryParams.get('limit')) ? Number(queryParams.get('limit')) : 15
    const currOffset = Number(queryParams.get('offset')) ? Number(queryParams.get('offset')) : 0
    const currOrdering = queryParams.get('ordering') ? queryParams.get('ordering') : 'name'
    const currIsSearch = queryParams.get('is_search') === 'true'
    const currSearch = queryParams.get('search') ? queryParams.get('search') : ''

    const manufacturerId = queryParams.get('manufacturer')

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
        axios.get(BACKEND_URL + '/cars/car/', {
            headers: headers,
            params: {
                limit: limit,
                offset: offset,
                search: search,
                ordering: sort,
                manufacturer: manufacturerId
            }
        })
            .then((resp) => {
                setTotal(resp.data.count)
                setCars(resp.data?.results)

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

    const prevParams = new URLSearchParams(location.state)

    return (
        <div className="cars">
            <div className="cars__head">

                <Link to={'/' + MANUFACTURERS + `?${prevParams.toString()}`} className="cars-marks__back button">Назад</Link>
                <Search
                    search={search}
                    goSearch={goSearch}
                    handleChange={handleInputChange}
                />

                <div className="sorting">
                    <div className="option-title">Сортировка</div>
                    <select name="sorter" id="" onChange={handleOrderChange} defaultValue={sort}>
                        <option value="articul" >По алфавиту</option>
                        <option value="-articul" >Обратно по алфавиту</option>
                    </select>
                </div>
                <Settings handleChange={handleLimitChange} value={tempLimit} onSave={saveLimit} />
            </div>
            <div className="cars__content">
                <table className="cars__items">
                    <thead>
                        <tr className="cars__item cars__item-head">
                            <td className="cars__item-col cars__item-head-col">Артикул</td>
                            <td className="cars__item-col cars__item-head-col">Модификация</td>
                            <td className="cars__item-col cars__item-head-col">Модель</td>
                            <td className="cars__item-col cars__item-head-col">КПП</td>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                            <tr className="cars__item" key={car.id}>
                                <td className="cars__item-col">{car.articul}</td>
                                <td className="cars__item-col">{car.modification}</td>
                                <td className="cars__item-col">{car.model}</td>
                                <td className="cars__item-col">{car.transmission}</td>
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

export default Cars
