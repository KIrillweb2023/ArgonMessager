
import { Navigate, Route, Routes } from "react-router-dom"
import { MainPage } from "../pages/main/MainPage"
import { AuthPage } from "../pages/auth/AuthPage"
import { ProtectedRoute } from "../components/ProtectedRoute"
import { PublicRoute } from "../components/PublicRoute"


export const App = () => {
    return (
        <Routes>
            <Route element={ 
                <PublicRoute> 
                    <AuthPage/> 
                </PublicRoute> 
            } path="/authenfication" />


            <Route element={ 
                <ProtectedRoute> 
                    <MainPage/> 
                </ProtectedRoute>
            } path="/" />

            <Route element={ 
                <ProtectedRoute> 
                    <MainPage/> 
                </ProtectedRoute>
            } path="/chat" />

            <Route path="*" element={
                <Navigate to="/" replace />
            } />
        </Routes>
    )
}

