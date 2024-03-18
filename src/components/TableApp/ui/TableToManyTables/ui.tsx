import "./TableToManyTables.scss"
import React from "react"
import Table from "../table"
import { TTableToManyTables } from "./types"
import getColumn from "./utils"
import classNames from "classnames"


const TableToManyTables: React.FC<TTableToManyTables> = (props) => {
    const {
        defaultSettings,
        data,
        selectedItems,
        setSelectedItems,
        openedItem,
        setOpenedItem
    } = props;


    const allColumns = Object.keys(defaultSettings);
    const viewColumns = allColumns.filter((x) => defaultSettings[x]);

    const handleChangeSelect = (e: any) => {
        const id = Number(e.target.value)
        setSelectedItems((prevValue: any) => {
            if (prevValue.includes(id)) {
                return prevValue.filter((x: number) => x != id)
            } else {
                return [...prevValue, id]
            }
        })
    }

    const handleClick = (id: number) => {
        if (setOpenedItem)
            setOpenedItem(id === openedItem ? null : id)
    }

    return (
        <div className="tbl">
            <table>
                <thead>
                    <tr>
                        <td>#</td>
                        <Table settingObject={defaultSettings} />
                    </tr>
                </thead>
                <tbody>
                    {data.length ?
                        data.map((item: any) => (
                            <tr
                                className={classNames("item", {
                                    "is-opened": openedItem === item.id
                                })}
                                key={item.id}
                                onClick={() => handleClick(item.id)}>
                                <td>
                                    <input
                                        type="checkbox"
                                        value={item?.id}
                                        onChange={handleChangeSelect}
                                        checked={selectedItems.includes(item.id)}
                                    />
                                </td>
                                {viewColumns.map((column, index) => (
                                    <td key={index}>
                                        {getColumn(column, item, defaultSettings)}
                                    </td>
                                ))}
                            </tr>
                        ))
                        :
                        <tr className="item__empty">
                            <div className="item__empty__content">
                                Не найдено ни одного объекта
                            </div>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TableToManyTables;
