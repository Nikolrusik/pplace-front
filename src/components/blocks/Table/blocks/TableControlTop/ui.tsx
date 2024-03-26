import "./TableControlTop.scss"
import classNames from "classnames"
import React from "react"
import { TTableControlTop } from "./types"
import TableFieldsControl from "../../widgets/TableFieldsControl"
import TableLimit from "../../widgets/TableLimit/ui"
import Paginator from "../../../../widgets/Paginator"
import TableInfo from "../../widgets/TableInfo"
import TableSearch from "../../widgets/TableSearch"


const TableControlTop: React.FC<TTableControlTop> = (props) => {
    const {
        className,
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
        limits
    } = props

    return (
        <div className={classNames(className, 'table-control-top')}>
            <div className={classNames(`${className}__main`, 'table-control-top__main')}>
                {hasSearch &&
                    <TableSearch
                        value={params.search}
                        goSearch={goSearch}
                    />
                }
                {hasLimit &&
                    <TableLimit
                        limit={params.limit}
                        setParam={setParam}
                        limits={limits}
                    />
                }
                {hasInfo &&
                    <TableInfo
                        total={total}
                        setSelectedItems={setSelectedItems}
                        selectedItems={selectedItems}
                    />
                }
                <TableFieldsControl
                    columns={['id']}
                    currentSettings={{}}
                    updateSettings={(value: any) => { }}
                />
            </div>
            <div className={classNames(`${className}__other`, 'table-control-top__other')}>
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
    )
}

export default TableControlTop