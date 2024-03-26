// import Table from "../../TableApp/ui/table"
import Table from "../../blocks/Table"
import "./PartsControl.scss"
import React, { useState } from "react"

const PartsControl: React.FC = (props) => {

    const [settings, setSettings] = useState({

    })
    const [carSettings, setCarSettings] = useState({
        id: true,
        manufacturer: {
            id: true,
            name: true
        },
        model: true,
        generation: true,
        region: true,
        is_truck: true,
        modification: true,
        year_from: true,
        year_to: true,
        price: true,
        body_model: true,
        type_fuel: true,
        transmission: true,
        drive_unit: true,
        place_engine: true,
        is_hybrid: true,
        power_engine: true,
        volume_engine: true,
        articul: true
    })
    const [selectedCars, setSelectedCars] = useState([])
    const [openedCar, setOpenedCar] = useState<number | null>(null)
    return (
        <>
            <h1>table</h1>
            <Table
                settings={carSettings}
                updateSettings={setCarSettings}
                uniqueTableName="Table"
                outsideFilters={{}}
                selectedItems={selectedCars}
                setSelectedItems={setSelectedCars}

                openedItem={openedCar}
                setOpenedItem={setOpenedCar}
            />
        </>
    )
}

export default PartsControl