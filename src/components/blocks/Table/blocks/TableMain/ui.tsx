import TableBody from "../../widgets/TableBody/ui"
import TableHead from "../../widgets/TableHead"
import "./TableMain.scss"
import React from "react"
import { TTableMain } from "./types"
import classNames from "classnames"


const TableMain: React.FC<TTableMain> = (props) => {
    const {
        className,
        data,
        columns,
        allowMultiSelect = true,
        allowOneSelect = true,
        clickItem,
        onChangeCheckbox,
        openedItem,
        selectedItems,
        ref,
        settings,
        setOrdering,
        currentOrdering,
        ...rest
    } = props

    return (
        <table
            className={classNames(className, 'default-table')}
            ref={ref}
            {...rest}
        >
            <TableHead
                allowMultiSelect={allowMultiSelect}
                columns={columns}
                settings={settings}
                setOrdering={setOrdering}
                currentOrdering={currentOrdering}
            />
            <TableBody
                allowMultiSelect={allowMultiSelect}
                columns={columns}
                data={data}
                clickItem={clickItem}
                onChangeCheckbox={onChangeCheckbox}
                openedItem={openedItem}
                selectedItems={selectedItems}
                settings={settings}
            />
        </table>
    )
}

export default TableMain