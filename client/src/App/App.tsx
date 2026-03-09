
import { Route, Routes } from "react-router-dom"
import { MainPage } from "../pages/main/MainPage"
import { AuthPage } from "../pages/auth/AuthPage"


export const App = () => {
    return (
        <Routes>
            <Route element={ <MainPage/> } path="/" />
            <Route element={ <AuthPage/> } path="/authenfication" />
        </Routes>
    )
}

