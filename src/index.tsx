import React from "react";
import ReactDOM from "react-dom/client"

// import Bitrix24 from 'bitrix24-library';
import App from "./App";
const Bitrix24 = require('bitrix24-library');


Bitrix24.init().then((BX24: any) => {
    const root = ReactDOM.createRoot(
        document.getElementById("root") as HTMLElement
    )
    // const BX24: any = null

    root.render(
        <App BX24={BX24} />
    )


});