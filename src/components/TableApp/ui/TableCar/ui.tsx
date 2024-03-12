import "./TableCar.scss"
import React, { ChangeEvent, useEffect, useState } from "react"
import classNames from "classnames"
import { TCar } from "./types"
import axios from "axios"
import BACKEND_URL from "../../../../constants/constants"
import API_TOKEN from "../../../../constants/tokens"
import { useLocation, useNavigate, createSearchParams } from "react-router-dom"
import queryString from "query-string"
import Paginator from "../../../widgets/Paginator/ui"
import TableControl from "../../widgets/TableControl"


const TableCar: React.FC = () => {
    const [cars, setCars] = useState<TCar[]>([])

    const { search } = useLocation()
    const navigate = useNavigate()

    const currentParams: any = queryString.parse(search)
    const queryParams = queryString.parse(currentParams.left_table)

    const [isLoading, setIsLoading] = useState(false)
    const [toUpdate, setToUpdate] = useState(true)

    const [total, setTotal] = useState(0)

    const [params, setParams] = useState<any>({
        is_search: String('false'),
        limit: String('10'),
        offset: String('0'),
        ordering: 'id',
        search: '',
        ...queryParams
    })

    useEffect(() => {
        const firstParams = {
            ...currentParams,
            left_table: createSearchParams(params).toString()
        }
        const actuallySearchParams = createSearchParams(firstParams).toString()
        navigate(
            {
                pathname: ".",
                search: actuallySearchParams,
            },
            { replace: false }
        )
        if (!(JSON.stringify(queryParams) === JSON.stringify(params))) {
            setToUpdate(true)
        }
    }, [params])

    const fetchData = () => {
        const dataServices = { ...queryParams, ...params }
        setIsLoading(true)
        axios.get(`${BACKEND_URL}/cars/lynx_car/`, {
            headers: { 'Authorization': `Token ${API_TOKEN}` },
            params: { ...dataServices }
        }).then((resp) => {
            setCars(resp.data.results)
            setTotal(resp.data.count)
            setToUpdate(false)
        }).catch(() => { })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        if (toUpdate) {
            fetchData()
        }

    }, [toUpdate])

    const onSubmit = (e: any) => {
        e.preventDefault()
        setParams((prevParams: any) => ({
            ...prevParams,
            is_search: String(!!e.target.search.value),
            search: !!e.target.search.value ? e.target.search.value : '',
            limit: String(e.target?.car_limit.value),
        }))
    }
    console.log(params)
    console.log(queryParams)
    return (

        <div className="table_car">
            <h1> {isLoading ? 'Загружается' : 'А'}</h1>
            <div className="table_car__content">
                <div className="">
                    <TableControl
                        onSubmit={onSubmit}
                        params={params}
                        setParams={setParams}
                        className="table_car__filters"
                    />
                    <Paginator
                        limit={params.limit}
                        offset={params.offset}
                        setOffset={(e: number) => setParams((prevParams: any) => ({ ...prevParams, offset: String(e) }))}
                        total={total}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            {/* <td>id</td>
                            <td>manufacturer</td>
                            <td>md5_code</td>
                            <td>model</td>
                            <td>engine_char</td>
                            <td>power</td>
                            <td>year</td> */}
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
            </div>
        </div >
    )
}

export default TableCar