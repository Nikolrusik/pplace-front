import "./TableApp.scss"
import React, { useEffect, useState } from "react";
import ControlledTable from "./ui/ControlledTable";
import axios from "axios";
import BACKEND_URL from "../../constants/constants";
import API_TOKEN from "../../constants/tokens";


const TableApp: React.FC = () => {
    const [carSettings, setCarSettings] = useState({
        id: true,
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

    const [productSettings, setProductsSettings] = useState({
        id: true,
        category: {
            id: false,
            name: true
        },
        lynx_pn: true,
        url: true,
        name: true,
        description: true
    })

    const [selectedCars, setSelectedCars] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    const [openedCar, setOpenedCar] = useState<null | number>(null)

    useEffect(() => {
        console.log(selectedCars)
    }, [selectedCars])

    const carOutsideFilters = {
        'cars': openedCar ? openedCar : ''
    }

    const handleClickMakeRelation = (e: any) => {
        const data = {
            email: "admin@admin.ru",
            first_name: "ad",
            last_name: "min",
            car_ids: selectedCars,
            product_ids: selectedProducts
        }

        axios.post(`${BACKEND_URL}/cars/car/createships/`, data, {
            headers: { 'Authorization': `Token ${API_TOKEN}` },
        })
            .then(() => {
                alert("Успешно")
                setSelectedCars([])
                setSelectedProducts([])
            })
            .catch(() => alert("Неизвестная ошибка"))
    }

    return (
        <div className="table_app">
            <div className="table_app__content">
                <div className="table_app__content__table table_app__content__left">
                    <ControlledTable
                        tableName="car_table"
                        settings={carSettings}
                        updateSettings={setCarSettings}
                        endpoint="/cars/car/"
                        selectedItems={selectedCars}
                        setSelectedItems={setSelectedCars}
                        openedItem={openedCar}
                        setOpenedItem={setOpenedCar}
                    />
                </div>
                <button className="create_connection" onClick={handleClickMakeRelation}>
                    Создать связь
                </button>
                <div className="table_app__content__table table_app__content__right">
                    <ControlledTable
                        tableName="parts_table"
                        settings={productSettings}
                        updateSettings={setProductsSettings}
                        endpoint="/cars/products/"
                        selectedItems={selectedProducts}
                        setSelectedItems={setSelectedProducts}
                        outsideFilters={carOutsideFilters}
                    />
                </div>
            </div>
        </div>
    )
}

export default TableApp