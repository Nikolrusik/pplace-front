import classNames from "classnames"
import React, { useState } from "react"
import { TTableFieldsControl } from "./types"
import TableControlColumn from "../TableControlColumn/ui"


const TableFieldsControl: React.FC<TTableFieldsControl> = (props) => {
    const {
        className,
        columns,

        currentSettings,
        updateSettings,
    } = props

    const fieldClickHandler = (parentColumn: string, subColumn?: string, openChild?: any) => {
        updateSettings((prevSettings: any) => {
            if (typeof prevSettings[parentColumn] === "object") {
                if (!subColumn) {
                    openChild((prev: any) => !prev)
                    return { ...prevSettings }
                }

                return {
                    ...prevSettings,
                    [parentColumn]: {
                        ...prevSettings[parentColumn],
                        [subColumn]: !prevSettings[parentColumn][subColumn]
                    }
                };
            } else {
                return {
                    ...prevSettings,
                    [parentColumn]: !prevSettings[parentColumn]
                };
            }
        });
    };
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={classNames(className, 'table-fields-control')}>
            <button
                className="table-fields-control__button"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                Столбцы
            </button>
            {isOpen &&
                <div className="table-fields-control__columns">
                    {columns.map((column, index) => (
                        <TableControlColumn
                            className="table-fields-control__headcontrol_column"
                            key={index}

                            name={column}
                            settings={currentSettings[column]}
                            onClick={fieldClickHandler}
                            parentColumn={column}
                            isParent={true}
                            isSelected={currentSettings[column]}
                        />
                    ))}
                </div>
            }
        </div>
    )
}

export default TableFieldsControl