import React, { useEffect, useState } from "react"
import { TPart } from "./types"
import axios from "axios"
import BACKEND_URL from "../../../../constants/constants"
import API_TOKEN from "../../../../constants/tokens"


const TablePart: React.FC = () => {
    const [parts, setParts] = useState<TPart[]>([])

    const [isLoading, setIsLoading] = useState(false)

    const fetchData = () => {
        axios.get(`${BACKEND_URL}/cars/products/`, {
            headers: { 'Authorization': `Token ${API_TOKEN}` },
            // params: { limit, offset, search, ordering: sort }
        }).then((resp) => {
            setParts(resp.data.results)
        })
        // .catch(() => { })
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="table_part">
            <div className="table_part__content">
                <table>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>category</td>
                            <td>lynx_pn</td>
                            <td>url</td>
                            <td>name</td>
                            <td>description</td>
                        </tr>
                    </thead>
                    <tbody>
                        {parts.map((part) => (
                            <tr>
                                <td>{part.id}</td>
                                <td>{part.category.name}</td>
                                <td>{part.lynx_pn}</td>
                                <td>{part.url}</td>
                                <td>{part.name}</td>
                                <td>{part.description}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TablePart