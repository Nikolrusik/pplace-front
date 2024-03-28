import { ReactElement } from "react";


function getColumn(column: any, obj: any, settings: any): ReactElement {
    let result;
    const columnType = typeof settings[column]
    console.log(column)
    console.log(columnType)
    if (columnType === 'object') {
        const keys = Object.keys(settings[column])
        for (const i in keys) {
            if (!result)
                result = getColumn(keys[i], obj[column], settings[column])
        }
    } else {
        if (settings[column]) {
            result = obj[column]
        }
    }

    return result
}


export default (
    getColumn
)