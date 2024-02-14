import React, { useState } from "react";
import Categories from "./components/Categories";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './styles/App.scss';
import { MAIN, MODELS, PARTS } from "./constants/paths";
import Models from "./components/Models";
import Parts from "./components/Parts";

const App = (props: any) => {
    const { BX24 } = props;
    const [firstName, setFirstName] = useState('')
    const auth = BX24?.getAuth()

    const [isAdmin, setIsAdmin] = useState(false)

    BX24?.callMethod('profile', { ACCESS: auth?.access_token }, (resp: any) => {
        console.log(resp.data())
        setFirstName(`${resp.data().NAME}  ${resp.data().LAST_NAME}`)
        setIsAdmin(resp.data().ADMIN)
    })


    return (
        <>
            <h1>TEST | List </h1>
            {BX24 &&
                <>
                    <p className="">Админ: {isAdmin ? 'Да' : 'Нет'}</p>
                    <div className="user-info">
                        <p>{firstName}</p>
                    </div>

                </>
            }
            <BrowserRouter>
                <Routes>
                    <Route path={MAIN} element={<Categories />} />
                    <Route path={MODELS + '/:id'} element={<Models />} />
                    <Route path={PARTS} element={<Parts />} />
                    <Route path={PARTS + '/:model_id'} element={<Parts />} />
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App;