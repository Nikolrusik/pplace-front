import "./TableFieldsSettings.scss"
import React from "react"
import { TTableFieldsSettings } from "./types"
import classNames from "classnames"
import HeadControlColumn from "../HeadControlColumn"

const TableFieldsSettings: React.FC<TTableFieldsSettings> = (props) => {
    const {
        className,
        currentSettings,
        fieldClickHandler
    } = props

    const allColumns = Object.keys(currentSettings)

    return (
        <div className={classNames(className, "table_field_settings")}>
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
    )
}

export default TableFieldsSettings