import "./TableApp.scss"
import React from "react";
import TableCar from "./ui/TableCar";
import TablePart from "./ui/TablePart";
// import { HashRouter } from "react-router-dom";


const TableApp: React.FC = () => {

    return (
        <div className="table_app">
            <div className="table_app__content">
                <TableCar />
                <TablePart />
            </div>
        </div>
    )
}

export default TableApp