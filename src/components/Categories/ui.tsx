import React, { useState, useEffect } from "react";

import "./Categories.scss"
import axios from "axios"
import cars from "../../testdata/cars.json"

type cars = {
    mark: string,
    icon: string,
    models: modes[]
}
type modes = {
    model: string
}
const Categories = () => {
    const [carMarks, setCarMarks] = useState<cars[]>([])
    const [selectedMark, setSelectedMark] = useState<cars | null>(null)

    useEffect(() => {
        setCarMarks(cars)
    }, [])

    return (
        <div className="cars">
            {!selectedMark &&
                <div className="cars-categories">
                    {carMarks.map((carMark) => (
                        <div className="cars-categories__item" onClick={() => setSelectedMark(carMark)}>
                            <img src={carMark.icon} alt="mark icon" />
                            <p className="cars-categories__item-name">{carMark.mark}</p>
                        </div>
                    ))
                    }
                </div>
            }
            {selectedMark &&
                <div className="cars-marks">
                    <button className="cars-marks__back button" onClick={() => setSelectedMark(null)}>Назад</button>
                    <div className="cars-marks__list">
                        {selectedMark.models.map((model) => (
                            <div className="cars-marks__mark">{model.model}</div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default Categories