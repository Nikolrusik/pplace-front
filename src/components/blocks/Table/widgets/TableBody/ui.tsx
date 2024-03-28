import "./TableBody.scss"
import React from "react"
import { TTTableBody } from "./types"
import classNames from "classnames"
import getColumn from "../../../../TableApp/ui/TableToManyTables/utils"

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
                data.map((item: any) => {
                    const viewColumns = hasViewColumns ? columns : Object.keys(item)
                    return (
                        <tr
                            className={classNames("table-body__item", {
                                "is-opened": openedItem === item.id
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
                                        />
                                    </span>
                                </td>}
                            {viewColumns.map((column, index) => (
                                <td
                                    className="table-body__item__col"
                                    key={index}
                                    onClick={() => clickItem(item.id)}
                                >
                                    <span>
                                        {getColumn(column, item, settings)}
                                    </span>
                                </td>
                            ))}
                        </tr>
                    )
                })
                :
                <tr className="item__empty">
                    <td colSpan={settingsKeys.length}>
                        Не найдено ни одного объекта
                    </td>
                </tr>
            }
        </tbody>
    )
}

export default TableBody