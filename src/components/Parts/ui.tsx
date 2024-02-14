import axios from "axios"
import React, { useEffect, useState } from "react"
import BACKEND_URL from "../../constants/constants"


type parts = {
    id: number
    name: string
    icon: string
}
const Parts: React.FC = () => {
    const [parts, setParts] = useState<parts[]>([])

    const fetchData = () => {
        axios.get(`${BACKEND_URL}/cars/parts/`)
            .then((resp) => {
                console.log(resp)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>

        </>
    )
}

export default Parts