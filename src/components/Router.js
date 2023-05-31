import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Card from './Card';
import LevelList from './Level_list';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact={true} Component={LevelList} />
                <Route path='/level/:level' exact={true} Component={Card} />
            </Routes>
        </BrowserRouter>
    )
}
