import "./TableFieldsSettings.scss"
import React, { useState } from "react"
import { TTableFieldsSettings } from "./types"
import classNames from "classnames"
import HeadControlColumn from "../HeadControlColumn"

const TableFieldsSettings: React.FC<TTableFieldsSettings> = (props) => {
    const {
        className,
        currentSettings,
        updateSettings
    } = props

    const allColumns = Object.keys(currentSettings)

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
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div className={classNames(className, "table_field_settings")}>
            <button
                className="table_field_settings__button"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                Столбцы
            </button>
            {isOpen &&
                <div className="table_field_settings__columns">
                    {allColumns.map((column, index) => (
                        <HeadControlColumn
                            className="table_field_settings__headcontrol_column"
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

export default TableFieldsSettings