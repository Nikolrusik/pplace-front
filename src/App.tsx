import React, { useEffect, useState } from "react";
import Categories from "./components/Categories";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";

import './styles/App.scss';
import { CARS, ENGINES, MAIN, MANUFACTURERS, MODELS, PARTS } from "./constants/paths";
import Models from "./components/Models";
import Parts from "./components/Parts";
import ServerDown from "./components/ServerDown";
import axios from "axios";
import BACKEND_URL from "./constants/constants";
import Main from "./components/Main";
import Cars from "./components/Cars";
import Engines from "./components/Engines";

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

    console.log(serverAvailable)

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
                            <Route path={MAIN} element={<Main />} />
                            <Route path={ENGINES} element={<Engines />} />
                            <Route path={MANUFACTURERS} element={<Categories />} />
                            <Route path={CARS} element={<Cars />} />
                            {/* <Route path={MODELS + '/:car_id'} element={<Models />} /> */}
                            <Route path={PARTS} element={<Parts />} />
                            <Route path={MODELS + '/:car_id/:model_id/'} element={<Parts />} />
                        </>
                    }
                </Routes>
            </HashRouter>
        </>
    )
}

export default App;