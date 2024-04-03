import React from "react";
import ReactDOM from "react-dom/client"
import { AuthContextProvider } from "./providers/AuthProvider";

import App from "./App";
const Bitrix24 = require('bitrix24-library');

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
)

// *** для запуска в битриксе: ***
Bitrix24.init().then((BX24: any) => {
    root.render(
        <AuthContextProvider>
            <App BX24={BX24} />
        </AuthContextProvider>
    )
});

// *** для локальной разработки: ***
// const BX24: any = null
// root.render(
//     <AuthContextProvider>
//         <App BX24={BX24} />
//     </AuthContextProvider>
// )

