import React, { useEffect, useState } from "react"
import { TModels } from "./types"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import BACKEND_URL from "../../constants/constants"
import { MAIN, PARTS } from "../../constants/paths"

type modes = {
    id: number
    name: string
}

const Models: React.FC<TModels> = () => {
    const { id } = useParams()
    const [models, setModels] = useState<modes[]>([])

    const fetchData = () => {
        axios.get(`${BACKEND_URL}/cars/marks_car/${id}/`)
            .then((resp) => {
                console.log(resp.data)
                setModels(resp.data.results)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="cars-marks">
            <Link to={MAIN} className="cars-marks__back button">Назад</Link>
            <div className="cars-marks__list">
                {models.map((model) => (
                    <Link
                        to={'/' + PARTS}
                        className="cars-marks__mark"
                        key={model.id}
                    >
                        {model.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Models