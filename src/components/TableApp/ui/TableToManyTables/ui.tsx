import React, { useEffect, useState } from "react"
import Table from "../table"
import { TTableToManyTables } from "./types"
import getColumn from "./utils"
import HeadColumn from "../../widgets/HeadControlColumn";
import TableFieldsSettings from "../../widgets/TableFieldsSettings/ui";


const TableToManyTables: React.FC<TTableToManyTables> = (props) => {
    const {
        defaultSettings,
        data,
        updateSettings
    } = props;

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

    const allColumns = Object.keys(defaultSettings);
    const viewColumns = allColumns.filter((x) => defaultSettings[x]);

    return (
        <>
            <TableFieldsSettings
                currentSettings={defaultSettings}
                fieldClickHandler={fieldClickHandler}
            />
            <table>
                <thead>
                    <tr>
                        <Table settingObject={defaultSettings} />
                    </tr>
                </thead>
                <tbody>
                    {data.map((item: any) => (
                        <tr key={item.id}>
                            {viewColumns.map((column, index) => (
                                <td key={index}>
                                    {getColumn(column, item, defaultSettings)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default TableToManyTables;
