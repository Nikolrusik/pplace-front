import './styles/App.scss'
import React, { useContext, useEffect, useState } from "react"
import { Route, Routes, HashRouter } from "react-router-dom"

import { MAIN } from "./constants/paths"
import ServerDown from "./components/pages/ServerDown"
import axios from "axios"
import BACKEND_URL from "./constants/constants"
import PartsControl from "./components/pages/PartsControl/ui"
import API_TOKEN from './constants/tokens'
import Loader from './components/widgets/Loader'
import NotFound from './components/pages/NotFound'
import { AuthContext } from './providers/AuthProvider'
import { UserModel } from './models/user'
import AuthService from './services/AuthService'


const App = (props: any) => {

    const { BX24 } = props
    const { setUserInLocalStorage } = useContext(AuthContext)
    const auth = BX24?.getAuth()

    const [serverAvailable, setServerAvailable] = useState(true)
    const [allowedAcces, setAllowedAccess] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const [tempUser, setTempUser] = useState<UserModel | null>(null)

    useEffect(() => {
        BX24?.callMethod('user.current', { ACCESS: auth?.access_token }, (resp: any) => {
            setTempUser({
                EMAIL: resp.data().EMAIL,
                NAME: resp.data().NAME,
                LAST_NAME: resp.data().LAST_NAME,
            })
        })
    }, [])

    const checkServer = () => {
        console.log('Check server')
        axios.get(`${BACKEND_URL}/cars/healthcheck/`)
            .then(() => { setServerAvailable(true) })
            .catch(() => { setServerAvailable(false) })
    }

    useEffect(() => {
        // проверяет работает ли сервер на запуске и дальше каждые 5 сек
        checkServer()
        const interval = setInterval(() => {
            checkServer()
        }, 5000)

        return () => clearInterval(interval)
    }, [serverAvailable])


    useEffect(() => {
        checkAccess()
    }, [tempUser])

    const checkAccess = () => {
        // авторизуемся и открываем дальнейший доступ
        setIsLoading(true)
        const headers = {
            'AuthBitrix': `Token ${API_TOKEN}`
        }
        if (tempUser) {
            const sendData = {
                member_id: auth.member_id,
                email: tempUser.EMAIL,
                name: tempUser.NAME,
                last_name: tempUser.LAST_NAME
            }

            AuthService.login(sendData, headers)
                .then((response) => {
                    setUserInLocalStorage({
                        ...tempUser,
                        ACCESS: response?.data?.access,
                        REFRESH: response?.data?.refresh_token
                    })
                    setAllowedAccess(true)
                })
                .catch(() => { setAllowedAccess(false) })
                .finally(() => setIsLoading(false))
        } else {
            setAllowedAccess(false)
            setIsLoading(false)
        }
    }

    const hasView = !isLoading && serverAvailable && allowedAcces

    return (
        <>
            <h1>TEST | Марки </h1>

            {BX24 &&
                <>
                    <div className="user-info">

                    </div>
                </>
            }
            <HashRouter>
                <Routes>
                    {hasView &&
                        <>
                            <Route path={MAIN} element={<PartsControl BX24={BX24} />} />
                        </>
                    }
                    <Route path={'*'} element={
                        hasView ? <NotFound /> :
                            isLoading ? <Loader /> :
                                <>
                                    {!serverAvailable && <ServerDown />}
                                    {!allowedAcces && <>Нет доступа</>}
                                </>

                    } />
                </Routes>
            </HashRouter>
        </>
    )
}

export default App