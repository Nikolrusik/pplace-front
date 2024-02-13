import React, { useEffect, useState } from "react";

import './styles/App.scss';
import Categories from "./components/Categories";

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
        <div>
            <h1>TEST | List </h1>
            {BX24 &&
                <>
                    <p className="">Админ: {isAdmin ? 'Да' : 'Нет'}</p>
                    <div className="user-info">
                        <p>{firstName}</p>
                    </div>
                </>
            }
            <Categories />
        </div>
    )
}

export default App;