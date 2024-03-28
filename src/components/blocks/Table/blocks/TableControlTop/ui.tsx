import "./TableControlTop.scss"
import classNames from "classnames"
import React from "react"
import { TTableControlTop } from "./types"
import TableFieldsControl from "../TableFieldsConrol"
import TableLimit from "../../widgets/TableLimit/ui"
import Paginator from "../../../../widgets/Paginator"
import TableInfo from "../../widgets/TableInfo"
import TableSearch from "../../widgets/TableSearch"


const TableControlTop: React.FC<TTableControlTop> = (props) => {
    const {
        className,
        settings,
        updateSettings,
        hasInfo = true,
        hasPaginator,
        hasLimit = true,
        hasSearch = true,
        params,
        setParam,
        total,
        selectedItems,
        setSelectedItems,
        goSearch,
        fixed,
        limits = [25, 50, 100]
    } = props

    return (
        <>
            <div className={classNames(className, 'table-control-top', {
                'is-fixed': fixed,
            })}>
                <div className='table-control-top__top'>
                    {hasLimit &&
                        <TableLimit
                            limit={params.limit}
                            setParam={setParam}
                            limits={limits}
                        />
                    }
                    {hasSearch &&
                        <TableSearch
                            value={params.search}
                            goSearch={goSearch}
                        />
                    }
                </div>
                <div className="table-control-top__center">
                    {hasInfo &&
                        <TableInfo
                            total={total}
                            setSelectedItems={setSelectedItems}
                            selectedItems={selectedItems}
                        />
                    }
                    <TableFieldsControl
                        currentSettings={settings}
                        updateSettings={updateSettings}
                    />
                </div>

                <div className='table-control-top__bottom'>
                    {hasPaginator &&
                        <Paginator
                            limit={params.limit}
                            offset={params.offset}
                            setOffset={(e: number) => setParam('offset', String(e))}
                            total={total}
                        />
                    }
                </div>
            </div>
            <div className="table-control-top__empty"></div>
        </>
    )
}

export default TableControlTop