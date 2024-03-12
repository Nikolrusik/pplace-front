import "./TablePart.scss"
import React, { useEffect, useState } from "react"
import { TPart } from "./types"
import axios from "axios"
import BACKEND_URL from "../../../../constants/constants"
import API_TOKEN from "../../../../constants/tokens"
import queryString from "query-string"
import { createSearchParams, useLocation, useNavigate } from "react-router-dom"
import TableControl from "../../widgets/TableControl"
import Paginator from "../../../widgets/Paginator"


const TablePart: React.FC = () => {
    const [parts, setParts] = useState<TPart[]>([])

    const { search } = useLocation()
    const navigate = useNavigate()

    const currentParams: any = queryString.parse(search)
    const queryParams = queryString.parse(currentParams.right_table)

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
            right_table: createSearchParams(params).toString()
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
        axios.get(`${BACKEND_URL}/cars/products/`, {
            headers: { 'Authorization': `Token ${API_TOKEN}` },
            params: { ...dataServices }
        }).then((resp) => {
            setParts(resp.data.results)
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

    return (
        <div className="table_part">
            <h1> {isLoading ? 'Загружается' : 'А'}</h1>
            <div className="table_part__content">
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
                            <td>id</td>
                            <td>category</td>
                            <td>lynx_pn</td>
                            <td>url</td>
                            <td>name</td>
                            <td>description</td>
                        </tr>
                    </thead>
                    <tbody>
                        {parts.map((part) => (
                            <tr key={part.id}>
                                <td>{part.id}</td>
                                <td>{part.category.name}</td>
                                <td>{part.lynx_pn}</td>
                                <td>{part.url}</td>
                                <td>{part.name}</td>
                                <td>{part.description}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TablePart