import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from "../pages/HomePage/HomePage";
import TipoEventosPage from '../pages/TipoEventosPage/TipoEventosPage';
import EventosPage from '../pages/EventosPage/EventosPage'
import LoginPage from '../pages/LoginPage/LoginPage';
import TestePage from '../pages/TestePage/TestePage';
import EventosAluno from '../pages/EventosAlunoPage/EventosAluno';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer'
import { PrivateRoute } from './PrivateRoute';
import EventosAlunoPage from '../pages/EventosAlunoPage/EventosAluno';
const routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Header/>
                <Routes>

                    <Route 
                        element= {<HomePage />} 
                        path='/'
                    />

                    <Route 
                        path='/tipo-eventos'
                        element= {
                        <PrivateRoute redirectTo='/'>
                            <TipoEventosPage />
                        </PrivateRoute>
                        } 
                        
                    />

                    <Route 
                        path='/eventos'
                        element= {
                        <PrivateRoute redirectTo='/'>
                            <EventosPage />
                        </PrivateRoute>
                        }
                    />

                    <Route // 
                        path='/eventos-aluno'
                        element= {
                        <PrivateRoute redirectTo='/'>
                            <EventosAluno />
                        </PrivateRoute>
                    } 
                        
                    />

                    <Route element= {<LoginPage />} path='/login'/>
                    <Route element= {<TestePage />} path='/teste'/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
};

export default routes;