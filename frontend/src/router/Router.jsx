import { BrowserRouter, Routes, Route } from "react-router-dom"
import PrivateRoutes from "../components/private-routes/PrivateRoutes"
import Auth from "../pages/auth/Auth"
import EditProfile from "../pages/edit-profile/EditProfile"
import Home from "../pages/home/Home"

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<PrivateRoutes/>}>
                        <Route path="/" element={<Home />} />
                        <Route path="/edit-profile" element={<EditProfile />} />
                    </Route>
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router