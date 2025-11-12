import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/home/home"
import Reg from "../pages/registration/registration"
import { NotFoundPage } from "../pages/not-found-page/NotFoundPage"

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/reg" element={<Reg/>}/>            
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}
