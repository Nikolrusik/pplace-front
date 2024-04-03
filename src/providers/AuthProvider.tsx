import React, { createContext, ReactNode, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios, { AxiosInstance } from "axios"
import AuthService from "../services/AuthService"
import { UserModel } from "../models/user"

const DefaultProps: AuthProps = {
    logout: () => null,
    user: null,
    setUserInLocalStorage: (user: UserModel) => null
}

export interface AuthProps {
    logout: () => void
    user: UserModel | null
    setUserInLocalStorage: (user: UserModel) => void
    getAccessToken?: () => string | null
}

export const AuthContext = createContext<AuthProps>(DefaultProps)

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [access, setAccess] = useState<string | null>(null)
    const [user, setUser] = useState(__getCurrentUser())

    // axios.interceptors.request.use(config => {
    //     config.withCredentials = false;
    //     return config;
    // });

    const setUserInLocalStorage = (currentUser: UserModel | null) => {
        if (currentUser && !!currentUser.ACCESS) {
            setAccess(currentUser.ACCESS)
        }
        delete currentUser.ACCESS
        AuthService.setUserInLocalStorage(currentUser)
        setUser(__getCurrentUser())
    }

    useEffect(() => {
        if (access) { setUser(__getCurrentUser()) }
    }, [access])

    function logout() {
        AuthService.logout()
        setUser(null)
        setAccess(null)
    }


    function __getAccessToken() {
        let newAccess = null
        if (access) {
            newAccess = access
        } else if (user?.REFRESH) {
            AuthService.refreshToken(user?.REFRESH)
                .then((resp) => { newAccess = resp })
                .catch((e) => console.error(e))
        }
        return newAccess
    }

    function __getCurrentUser() {
        let temp_user = AuthService.getCurrentUser()
        const access_token = __getAccessToken()
        const currentUser = {
            ...temp_user,
            ACCESS: access_token
        }

        return currentUser
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUserInLocalStorage,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
