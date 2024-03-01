import { Link } from "react-router-dom"
import "./Main.scss"
import React from "react"
import { MANUFACTURERS } from "../../constants/paths"


const Main: React.FC = () => {

    return (
        <div className="main">
            <div className="main__head">
                <h2 className="main_title">Выбор</h2>
            </div>
            <div className="main__select">
                <Link to={``} className="main__select-item">
                    Двигатели
                </Link>
                <Link to={`${MANUFACTURERS}/?type=auto`} className="main__select-item">
                    Автомобили
                </Link>
            </div>
        </div>
    )
}

export default Main