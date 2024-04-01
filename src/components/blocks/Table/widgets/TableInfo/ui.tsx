import "./TableInfo.scss"
import classNames from "classnames"
import React from "react"
import { TTableInfo } from "./types"
import Button from "../../../../generic/Button"



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
                    <Button onClick={() => { setSelectedItems([]) }}>Сбросить</Button>
                </div>
            }
        </div>
    )
}

export default TableInfo