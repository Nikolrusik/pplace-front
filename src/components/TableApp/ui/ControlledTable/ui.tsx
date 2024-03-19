import "./ControlledTable.scss"
import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import BACKEND_URL from "../../../../constants/constants"
import API_TOKEN from "../../../../constants/tokens"
import { useLocation, useNavigate, createSearchParams } from "react-router-dom"
import queryString from "query-string"
import Paginator from "../../../widgets/Paginator/ui"
import TableControl from "../../widgets/TableControl"
import TableToManyTables from "../TableToManyTables"
import { TControlledTable } from "./types"
import classNames from "classnames"
import TableFieldsSettings from "../../widgets/TableFieldsSettings/ui"


const ControlledTable: React.FC<TControlledTable> = (props) => {
    const {
        settings,
        tableName,
        updateSettings,
        endpoint,
        selectedItems,
        setSelectedItems,
        setOpenedItem,
        openedItem,
        outsideFilters
    } = props

    const [data, setData] = useState([])

    const { search } = useLocation()
    const navigate = useNavigate()

    const currentParams: any = queryString.parse(search)
    const queryParams = queryString.parse(currentParams[tableName])

    const [isLoading, setIsLoading] = useState(false)
    const [toUpdate, setToUpdate] = useState(true)

    const [total, setTotal] = useState(0)

    const [params, setParams] = useState<any>({
        is_search: String('false'),
        limit: String('10'),
        offset: String('0'),
        ordering: 'id',
        search: '',
        ...queryParams,
        ...outsideFilters
    })

    useEffect(() => {
        const firstParams = {
            ...currentParams,
            [tableName]: createSearchParams(params).toString()
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
        }))
    }

    useEffect(() => {
        const storedSettings = localStorage.getItem(`${tableName}__settings`);
        if (storedSettings) {
            updateSettings(JSON.parse(storedSettings));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(`${tableName}__settings`, JSON.stringify(settings));
    }, [settings])

    const setOrdering = (order_field: string) => {
        setParams((prevParams: any) => {
            return { ...prevParams, ordering: order_field }
        })
    }
    const [initialMount, setInitialMount] = useState(true); // Добавляем состояние для отслеживания первоначального монтирования

    useEffect(() => {
        setInitialMount(true)
        if (initialMount) {
            const keys = Object.keys(outsideFilters)
            for (const i of keys) {
                if (params[i] !== outsideFilters[i]) {
                    setParams((prev: any) => ({ ...prev, offset: 0 }))
                    const prevOffset = localStorage.getItem(`${tableName}__prevOffset`)
                    localStorage.setItem(`${tableName}__prevOffset`, params.offset > 0 ? params.offset : prevOffset)
                } else {
                    const prevOffset = localStorage.getItem(`${tableName}__prevOffset`)
                    setParams((prev: any) => ({ ...prev, offset: prevOffset }))
                }
            }
        }

    }, [outsideFilters]);

    return (
        <div className={classNames(tableName, 'controlled_table')}>
            <h1> {isLoading ? 'Загружается' : tableName}</h1>
            <div className="table_car__content">
                <div className="">
                    <TableFieldsSettings
                        currentSettings={settings}
                        updateSettings={updateSettings}
                    />
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
                    <div className="">
                        <span>Выбрано элементов: {selectedItems.length} </span>
                        {selectedItems.length > 0 &&
                            <button onClick={() => { setSelectedItems([]) }}>Сбросить</button>
                        }
                    </div>
                    <div className="">
                        Всего элементов: {total}
                    </div>
                    <div className="">
                        Сортировка по {params?.ordering}
                    </div>
                </div>
                <TableToManyTables
                    defaultSettings={settings}
                    data={data}
                    updateSettings={updateSettings}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    openedItem={openedItem}
                    setOpenedItem={setOpenedItem}
                    setOrdering={setOrdering}
                    currentOrdering={params?.ordering}
                />
            </div>
        </div>
    )
}

export default ControlledTable