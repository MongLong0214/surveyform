import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Main from './pages/Main';
import QuestionsListContainer from "./components/QuestionsListContainer";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/addQuestion" element={<QuestionsListContainer />} />
                <Route path="/editQuestion/:id" element={<QuestionsListContainer />} />
            </Routes>
        </Router>
    );
}

export default App;
