import React from 'react';
import './assets/css/globals.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRouter';
import AnswerModal from './components/Modal/AnswerModal';
import ParentComponent from './components/Modal/ParentComponent';
//import AskQuestionModal from './components/organisms/AskQuestionModal';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
