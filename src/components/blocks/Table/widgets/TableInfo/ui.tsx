import "./TableInfo.scss"
import classNames from "classnames"
import React from "react"
import { TTableInfo } from "./types"



const TableInfo: React.FC<TTableInfo> = (props) => {
    const {
        className,
        total,
        selectedItems,
        setSelectedItems
    } = props

    return (
        <div className={classNames(className, 'table-info')}>
            <div className='table-info__count'>
                Записей: {total}
            </div>
            {selectedItems.length > 0 &&
                <div className='table-info__selected'>
                    <span>Выбрано: {selectedItems.length}</span>
                    <button onClick={() => { setSelectedItems([]) }}>Сбросить</button>
                </div>
            }
        </div>
    )
}

export default TableInfo