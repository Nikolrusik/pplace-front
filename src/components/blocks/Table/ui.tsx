import "./Table.scss"
import React, { useContext, useEffect, useRef, useState } from "react"
import TableMain from "./blocks/TableMain"
import { TTable } from "./types"
import classNames from "classnames"
import TableControlTop from "./blocks/TableControlTop"
import { createSearchParams, useLocation, useNavigate } from "react-router-dom"
import queryString from "query-string"
import axios from "axios"
import BACKEND_URL from "../../../constants/constants"
import API_TOKEN from "../../../constants/tokens"
import openFullscreen from "../../../utils/utils"
import { AuthContext } from "../../../providers/AuthProvider"

const Table: React.FC<TTable> = (props) => {
    const {
        className,
        uniqueTableName,
        endpoint,
        settings = {},
        updateSettings,
        outsideFilters,

        selectedItems,
        setSelectedItems,

        openedItem,
        setOpenedItem,

        defaultPageSize = 25,
        controlPosition = 'bottom',
        controlType = 'static',
        hasControl = true,
        hasInfo = true,
        hasPaginator = true,
        hasSearch = true,

        allowMultiSelect = false,
        allowOneSelect = false
    } = props

    // data
    const { user } = useContext(AuthContext)
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [toUpdate, setToUpdate] = useState(true)

    const columns = Object.keys(settings).filter((x) => !!settings[x])

    const { search } = useLocation()
    const navigate = useNavigate()

    const currentParams: any = queryString.parse(search)
    const queryParams = queryString.parse(currentParams[uniqueTableName])

    const [params, setParams] = useState<any>({
        is_search: String('false'),
        limit: String(defaultPageSize),
        offset: String('0'),
        ordering: 'id',
        search: '',
        ...queryParams,
        ...outsideFilters
    })


    const fetchData = () => {
        const dataServices = { ...queryParams, ...params, ...outsideFilters }
        const headers = {
            'Authorization': user?.ACCESS ? `Bearer ${user.ACCESS}` : null,
            'Authbitrix': `Token ${API_TOKEN}`,
        }
        setIsLoading(true)
        axios.get(`${BACKEND_URL}${endpoint}`, {
            headers: headers,
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

    useEffect(() => {
        if (toUpdate) { fetchData() }
    }, [toUpdate, user])


    useEffect(() => {
        const storedSettings = localStorage.getItem(`${uniqueTableName}__settings`);

        if (storedSettings) {
            updateSettings((prev: any) => ({ ...prev, ...JSON.parse(storedSettings) }));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(`${uniqueTableName}__settings`, JSON.stringify(settings));
    }, [settings])

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


    const tblRef = useRef(null)

    const [isFixed, setIsFixed] = useState(false);

    const handleScroll = (ref: any) => {
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (ref.current) {
            const tblRect = ref.current.getBoundingClientRect();
            if (tblRect.bottom <= windowHeight || tblRect.bottom <= 0) {
                setIsFixed(false)
            }
            else if (tblRect.top <= windowHeight) {
                setIsFixed(true)
            } else {
                setIsFixed(false)
            }
        }
    }

    const handleScrollUniversal = () => {
        handleScroll(tblRef)
    }

    useEffect(() => {
        if (controlType === 'fixed') {
            window.addEventListener('scroll', handleScrollUniversal);
            return () => window.removeEventListener('scroll', handleScrollUniversal);
        }
    }, [tblRef])


    // utils

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

    const setOrdering = (field: string) => {
        setParam('ordering', field)
    }

    return (
        <div className={classNames(className, 'table-generic')} ref={tblRef}>
            <div className="table-generic__container">
                <TableMain
                    data={data}
                    columns={columns}
                    openedItem={openedItem}
                    clickItem={clickItem}
                    onChangeCheckbox={changeCheckbox}
                    selectedItems={selectedItems}
                    settings={settings}
                    currentOrdering={params?.ordering}
                    setOrdering={setOrdering}
                    isLoading={isLoading}
                    allowMultiSelect={allowMultiSelect}
                    allowOneSelect={allowOneSelect}
                />
            </div>
            {hasControl && controlPosition === 'bottom' &&
                <TableControlTop
                    settings={settings}
                    updateSettings={updateSettings}
                    hasPaginator={hasPaginator}
                    hasSearch={hasSearch}
                    hasLimit={true}
                    hasInfo={hasInfo}
                    fixed={isFixed}
                    params={params}
                    setParam={setParam}
                    total={total}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    goSearch={goSearch}
                    limits={[1, 25, 50, 100]}
                />
            }
        </div>
    )
}

export default Table