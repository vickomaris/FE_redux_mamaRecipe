import React from "react";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../view/login/Login';
import Register from '../view/register/Register';
import ForgotPassword from "../view/forgot/ForgotPassword";
import CodeReset from "../view/CodeReset/CodeReset";
import ResetPassword from '../view/ResetPassword/ResetPassword'
import AddRecipe from "../view/addrecipe/AddRecipe";
import UpdateRecipe from "../view/updaterecipe/UpdateRecipe";
import Profile from "../view/profile/Profile";
import LandingPage from "../view/landingpage/LandingPage";
import DetailRecipe from "../view/detailrecipe/DetailRecipe";
import DetailVideo from "../view/detailvideo/DetailVideo";

    const Router = () => {
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Login />} />
                        <Route path="register" element={<Register/>} />
                        <Route path="forgot" element={<ForgotPassword/>} />
                        <Route path="codereset" element={<CodeReset/>} />
                        <Route path="resetpassword" element={<ResetPassword/>} />
                        <Route path="landingpage" element={<LandingPage/>} />
                        <Route path="detailrecipe/:id" element={<DetailRecipe/>} />
                        <Route path="detailvideo" element={<DetailVideo/>} />
                        <Route path="addrecipe" element={<AddRecipe/>} />
                        <Route path="updaterecipe/:id" element={<UpdateRecipe/>} />
                        <Route path="profile" element={<Profile/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
        
    }
    export default Router;
