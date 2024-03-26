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
        setOpenedItem,
        setOrdering,
        currentOrdering
    } = props;


    const allColumns = Object.keys(defaultSettings);
    const viewColumns = allColumns.filter((x) => defaultSettings[x]);

    const handleChangeSelect = (e: any) => {
        e?.stopPropagation()
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
            <table cellSpacing={0} cellPadding={0}>
                <thead>
                    <tr>
                        <td>#</td>
                        <Table
                            settingObject={defaultSettings}
                            setOrdering={setOrdering}
                            currentOrdering={currentOrdering}
                        />
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
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        value={item?.id}
                                        onChange={handleChangeSelect}
                                        checked={selectedItems.includes(item.id)}
                                    />
                                </td>
                                {viewColumns.map((column, index) => (
                                    <td key={index}
                                        onClick={() => handleClick(item.id)}

                                    >
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
