import "./TableBody.scss"
import React from "react"
import { TTTableBody } from "./types"
import classNames from "classnames"
import getColumn from "../../utils"

const TableBody: React.FC<TTTableBody> = (props) => {
    const {
        className,
        data,
        columns,
        allowMultiSelect = false,
        clickItem = (id: number) => { },
        onChangeCheckbox = (id: number) => { },
        openedItem,
        selectedItems,
        settings,
        isLoading = false,
        ...rest
    } = props

    const settingsKeys = Object.keys(settings)
    const hasViewColumns = settingsKeys.length > 0

    return (
        <tbody
            className={classNames(className, 'table-body')}
            {...rest}
        >
            {data.length ?
                (data.map((item: any) => {
                    const viewColumns = hasViewColumns ? columns : Object.keys(item)
                    return (
                        <tr
                            className={classNames("table-body__item", {
                                "is-opened": openedItem === item.id,
                                "is-loading": isLoading
                            })}
                            key={item.id}
                        >
                            {allowMultiSelect &&
                                <td className="table-body__item__col">
                                    <span>
                                        <input
                                            type="checkbox"
                                            value={item?.id}
                                            onChange={() => onChangeCheckbox(item.id)}
                                            checked={selectedItems.includes(item.id)}
                                            disabled={isLoading}
                                        />
                                    </span>
                                </td>}
                            {viewColumns.map((column, index) => (
                                <td
                                    className="table-body__item__col"
                                    key={index}
                                    onClick={() => { if (!isLoading) clickItem(item.id) }}
                                >
                                    <span>
                                        {getColumn(column, item, settings)}
                                    </span>
                                </td>
                            ))}
                        </tr>
                    )
                }))
                : isLoading ?
                    [...Array(25)].map((_, index) => (
                        <tr className="table-body__item is-loading" key={index}>
                            {allowMultiSelect &&
                                <td className="table-body__item__col">
                                    <div className="table-body__item__col table-body__item__empty"></div>
                                </td>}
                            {columns.map((_, index) => (
                                <td key={index}>
                                    <div className="table-body__item__col table-body__item__empty">Emty</div>
                                </td>
                            ))}
                        </tr>
                    ))
                    :
                    <tr className="item__empty">
                        <td colSpan={columns.length} >
                            Не найдено ни одного объекта
                        </td>
                    </tr>
            }
        </tbody>
    )
}

export default TableBody