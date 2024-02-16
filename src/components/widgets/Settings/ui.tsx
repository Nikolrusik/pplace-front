import React from "react"
import { TSettings } from "./types"

const Settings: React.FC<TSettings> = (props) => {
    const { handleChange, value, onSave } = props

    return (
        <div className="settings">
            <div className="settings__param">
                <div className="option-title">Кол-во элементов на странице</div>
                <input type="number" placeholder="limit" onChange={handleChange} value={value} />
                <button onClick={() => onSave()}>Сохранить</button>
            </div>
        </div>
    )
}

export default Settings