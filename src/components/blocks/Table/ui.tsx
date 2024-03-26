import "./Table.scss"
import React, { useEffect, useState } from "react"
import TableMain from "./blocks/TableMain"
import { TTable } from "./types"
import classNames from "classnames"
import TableControlTop from "./blocks/TableControlTop"
import { createSearchParams, useLocation, useNavigate } from "react-router-dom"
import queryString from "query-string"
import axios from "axios"
import BACKEND_URL from "../../../constants/constants"
import API_TOKEN from "../../../constants/tokens"

const Table: React.FC<TTable> = (props) => {
    const {
        className,
        uniqueTableName,
        settings = {},
        updateSettings,
        defaultPageSize = 25,
        hasHead = true,
        hasInfo = true,
        hasPaginator = true,
        hasSearch = true,
        outsideFilters,
        selectedItems,
        setSelectedItems,

        openedItem,
        setOpenedItem,
        // endpoint
    } = props

    const endpoint = '/cars/car/'

    const [data, setData] = useState([])

    const { search } = useLocation()
    const navigate = useNavigate()

    const currentParams: any = queryString.parse(search)
    const queryParams = queryString.parse(currentParams[uniqueTableName])

    const [isLoading, setIsLoading] = useState(false)
    const [toUpdate, setToUpdate] = useState(true)

    const [total, setTotal] = useState(0)

    const [params, setParams] = useState<any>({
        is_search: String('false'),
        limit: String(defaultPageSize),
        offset: String('0'),
        ordering: 'id',
        search: '',
        ...queryParams,
        ...outsideFilters
    })

    useEffect(() => {
        const firstParams = {
            ...currentParams,
            [uniqueTableName]: createSearchParams(params).toString()
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
        const dataServices = { ...queryParams, ...params, ...outsideFilters }

        setIsLoading(true)
        axios.get(`${BACKEND_URL}${endpoint}`, {
            headers: { 'Authorization': `Token ${API_TOKEN}` },
            params: { ...dataServices }
        }).then((resp) => {
            setData(resp.data.results)
            setTotal(resp.data.count)
            setToUpdate(false)
        })
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        if (toUpdate) { fetchData() }
    }, [toUpdate])


    const onSubmit = (e: any) => {
        e.preventDefault()
        setParams((prevParams: any) => ({
            ...prevParams,
            is_search: String(!!e.target.search.value),
            search: !!e.target.search.value ? e.target.search.value : '',
            limit: String(e.target?.car_limit.value),
            offset: !!e.target.search.value && (!!e.target.search.value != prevParams.is_search) ? String('0') : prevParams.offset
        }))
    }

    useEffect(() => {
        const storedSettings = localStorage.getItem(`${uniqueTableName}__settings`);

        if (storedSettings) {
            updateSettings((prev: any) => ({ ...prev, ...JSON.parse(storedSettings) }));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(`${uniqueTableName}__settings`, JSON.stringify(settings));
    }, [settings])

    const setOrdering = (order_field: string) => {
        setParams((prevParams: any) => {
            return { ...prevParams, ordering: order_field }
        })
    }

    useEffect(() => {
        const keys = Object.keys(outsideFilters)

        for (const i of keys) {
            if (params[i] !== outsideFilters[i]) {
                setParams((prev: any) => ({ ...prev, offset: 0 }))
                const prevOffset = localStorage.getItem(`${uniqueTableName}__prevOffset`)
                localStorage.setItem(`${uniqueTableName}__prevOffset`, params.offset > 0 ? params.offset : prevOffset)
            } else {
                const prevOffset = localStorage.getItem(`${uniqueTableName}__prevOffset`)
                setParams((prev: any) => ({ ...prev, offset: prevOffset }))
            }
        }
    }, [outsideFilters]);

    const columns = Object.keys(settings)

    const setParam = (param: string, value: any) => {
        setParams((prev: any) => ({ ...prev, [param]: value }))
    }

    const goSearch = (value: string) => {
        setParams((prev: any) => ({
            ...prev,
            search: value,
            is_search: !!value
        }))
    }

    const clickItem = (id: number) => {
        setOpenedItem((prev: any) => id === prev ? null : id)
    }

    const changeCheckbox = (id: number) => {
        setSelectedItems((prev: any) => {
            if (prev.includes(id)) {
                return prev.filter((x: number) => x != id)
            } else {
                return [...prev, id]
            }
        })
    }

    return (
        <div className={classNames(className, 'table-generic')}>
            {hasHead &&
                <TableControlTop
                    hasPaginator={hasPaginator}
                    hasSearch={hasSearch}
                    hasLimit={true}
                    hasInfo={hasInfo}

                    params={params}
                    setParam={setParam}
                    total={total}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    goSearch={goSearch}
                />
            }
            <TableMain
                data={data}
                columns={columns}
                openedItem={openedItem}
                clickItem={clickItem}
                onChangeCheckbox={changeCheckbox}
                selectedItems={selectedItems}
            />
        </div>
    )
}

export default Table