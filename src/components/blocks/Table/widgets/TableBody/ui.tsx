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
        allowMultiSelect,
        clickItem = (id: number) => { },
        onChangeCheckbox = (id: number) => { },
        openedItem,
        selectedItems,
        ...rest
    } = props

    const hasViewColumns = !!columns

    const defaultSettings = {
        id: true,
        model: true,
        body_model: true
    }

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
                            className={classNames("item", {
                                "is-opened": openedItem === item.id
                            })}
                            key={item.id}
                        >
                            {allowMultiSelect &&
                                <td>
                                    <input
                                        type="checkbox"
                                        value={item?.id}
                                        onChange={() => onChangeCheckbox(item.id)}
                                        checked={selectedItems.includes(item.id)}
                                    />
                                </td>}
                            {viewColumns.map((column, index) => (
                                <td key={index}
                                    onClick={() => clickItem(item.id)}
                                >
                                    {getColumn(column, item, defaultSettings)}
                                </td>
                            ))}
                        </tr>
                    )
                })
                :
                <tr className="item__empty">
                    <div className="item__empty__content">
                        Не найдено ни одного объекта
                    </div>
                </tr>
            }
        </tbody>
    )
}

export default TableBody