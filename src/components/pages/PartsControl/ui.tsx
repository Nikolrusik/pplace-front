import "./PartsControl.scss"
import axios from "axios"
import BACKEND_URL from "../../../constants/constants"
import openFullscreen from "../../../utils/utils"
import Table from "../../blocks/Table"
import React, { useContext, useEffect, useRef, useState } from "react"
import API_TOKEN from "../../../constants/tokens"
import Button from "../../generic/Button"
import { AuthContext } from "../../../providers/AuthProvider"



const PartsControl: React.FC = (props) => {

    const { user } = useContext(AuthContext)

    // settings отвечают за отображаемые поля
    const [carSettings, setCarSettings] = useState({
        model: true,
        manufacturer: {
            id: true,
            name: true
        },
        id: true,
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

    const [productsSettings, setProductsSettings] = useState({
        id: true,
        lynx_pn: true,
        category: {
            id: false,
            name: true
        },
        url: true,
        name: true,
        description: true
    })

    // selected нужны для создания связей, для возможность выбирать чекбосами
    const [selectedCars, setSelectedCars] = useState([])
    const [selectedParts, setSelectedParts] = useState([])

    // opened нужны для возможности кликнуть по одному элементу
    const [openedCar, setOpenedCar] = useState<number | null>(null)
    const [openedPart, setOpenedPart] = useState<number | null>(null)

    // outsideFilters нужны для возможности одной таблицы влиять на другую
    // в текущем случае - используется для фильтрации машин по запчастям и наоборот.
    const [carToPartOutsideFilter, setCarToPartOutsideFilter] = useState({})
    const [partToCarOutsideFilters, setPartToCarOursideFilters] = useState({})

    useEffect(() => {
        if (openedCar) {
            setCarToPartOutsideFilter({ 'cars': openedCar })
        } else {
            setCarToPartOutsideFilter({ 'cars': '' })
        }
    }, [openedCar])

    useEffect(() => {
        if (openedPart) {
            setPartToCarOursideFilters({ 'products': openedPart })
        } else {
            setPartToCarOursideFilters({ 'products': '' })
        }
    }, [openedPart])

    const handleClickMakeRelation = (e: any) => {
        const data = {
            email: user?.EMAIL,
            car_ids: selectedCars,
            product_ids: selectedParts
        }

        axios.post(`${BACKEND_URL}/cars/car/createships/`, data, {
            headers: { 'Authorization': `Token ${API_TOKEN}` },
        })
            .then(() => {
                alert('Связи созданы')
                setSelectedCars([])
                setSelectedParts([])
            })
            .catch(() => alert("Неизвестная ошибка"))
    }


    const tablesRef = useRef(null)

    const isInsideIframe = window.location !== window.parent.location;

    const openFull = () => {
        if (isInsideIframe) {
            window.open(window.location.href, '_blank')
        } else {
            openFullscreen(tablesRef)
        }
    }

    return (
        <>
            <Button onClick={() => openFull()}>Открыть</Button>
            <div className="tables" ref={tablesRef}>
                <Table
                    endpoint="/cars/car/"
                    settings={carSettings}
                    updateSettings={setCarSettings}
                    uniqueTableName="table_cars"
                    outsideFilters={partToCarOutsideFilters}
                    selectedItems={selectedCars}
                    setSelectedItems={setSelectedCars}

                    openedItem={openedCar}
                    setOpenedItem={setOpenedCar}

                    allowMultiSelect={true}
                    allowOneSelect={true}
                />
                <Button onClick={handleClickMakeRelation}>Создать связи</Button>
                <Table
                    endpoint="/cars/products/"
                    settings={productsSettings}
                    updateSettings={setProductsSettings}
                    uniqueTableName="table_parts"
                    outsideFilters={carToPartOutsideFilter}
                    selectedItems={selectedParts}
                    setSelectedItems={setSelectedParts}

                    openedItem={openedPart}
                    setOpenedItem={setOpenedPart}

                    allowMultiSelect={true}
                    allowOneSelect={true}
                />
            </div>

        </>
    )
}

export default PartsControl