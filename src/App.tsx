import React, { useEffect, useState } from "react";
import { Route, Routes, HashRouter } from "react-router-dom";

import './styles/App.scss';
import { MAIN } from "./constants/paths";
import ServerDown from "./components/ServerDown";
import axios from "axios";
import BACKEND_URL from "./constants/constants";
import TableApp from "./components/TableApp";
import PartsControl from "./components/pages/PartsControl/ui";

const App = (props: any) => {
    const { BX24 } = props;
    const [firstName, setFirstName] = useState('')
    const auth = BX24?.getAuth()
    const [serverAvailable, setServerAvailable] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    BX24?.callMethod('profile', { ACCESS: auth?.access_token }, (resp: any) => {
        console.log(resp.data())
        setFirstName(`${resp.data().NAME}  ${resp.data().LAST_NAME}`)
        setIsAdmin(resp.data().ADMIN)
    })

    const checkServer = () => {
        console.log('Check server')
        axios.get(`${BACKEND_URL}/cars/healthcheck/`)
            .then(() => { setServerAvailable(true) })
            .catch(() => { setServerAvailable(false) })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            checkServer()
        }, 5000);

        return () => clearInterval(interval);
    }, [serverAvailable])

    return (
        <>
            <h1>TEST | Марки </h1>
            {BX24 &&
                <>
                    <p className="">Админ: {isAdmin ? 'Да' : 'Нет'}</p>
                    <div className="user-info">
                        <p>{firstName}</p>
                    </div>

                </>
            }
            <HashRouter>
                <Routes>

                    <Route path={'*'} element={<ServerDown />} />
                    {serverAvailable &&
                        <>
                            <Route path={MAIN} element={<PartsControl />} />
                        </>
                    }
                </Routes>
            </HashRouter>
        </>
    )
}

export default App;