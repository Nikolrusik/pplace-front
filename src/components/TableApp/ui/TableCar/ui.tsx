import "./TableCar.scss"
import React, { useEffect, useState } from "react"
import classNames from "classnames"
import { TCar } from "./types"
import axios from "axios"
import BACKEND_URL from "../../../../constants/constants"
import API_TOKEN from "../../../../constants/tokens"
import { useLocation, useNavigate } from "react-router-dom"
import queryString from "query-string"
import Paginator from "../../../widgets/Paginator/ui"


const TableCar: React.FC = () => {
    const [cars, setCars] = useState<TCar[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { search } = useLocation()
    const navigate = useNavigate()
    const queryParams = queryString.parse(search)

    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(30)
    const [isSearch, setIsSearch] = useState(false)

    const defaultParams = {
        is_search: isSearch,
        limit: limit,
        offset: offset,
        ordering: 'id',
        search: '',
    }

    const fetchData = () => {
        const dataServices = { ...defaultParams, ...queryParams }
        setIsLoading(true)
        axios.get(`${BACKEND_URL}/cars/lynx_car/`, {
            headers: { 'Authorization': `Token ${API_TOKEN}` },
            // params: { limit, offset, search, ordering: sort }
            params: { ...dataServices }
        }).then((resp) => {
            setCars(resp.data.results)
            setTotal(resp.data.count)
        })
            .finally(() => setIsLoading(false))
        // .catch(() => { })
    }

    useEffect(() => {
        fetchData()
    }, [offset])



    return (
        <div className="table_car">
            <div className={classNames("table_filters", 'table_car__filters')}>
                <div className="table_filters__search">
                    <input type="text" />
                </div>
                <div className="table_filters__selectors">
                    <select name="a" id="a">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <select name="a" id="a">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
            <div className="table_car__content">
                <table>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>manufacturer</td>
                            <td>md5_code</td>
                            <td>model</td>
                            <td>engine_char</td>
                            <td>power</td>
                            <td>year</td>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                            <tr key={car.id}>
                                <td>{car.id}</td>
                                <td>{car.manufacturer.name}</td>
                                <td>{car.md5_code}</td>
                                <td>{car.model}</td>
                                <td>{car.engine_char}</td>
                                <td>{car.power}</td>
                                <td>{car.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Paginator
                    limit={limit}
                    offset={offset}
                    setOffset={setOffset}
                    total={total}
                />
            </div>
        </div>
    )
}

export default TableCar