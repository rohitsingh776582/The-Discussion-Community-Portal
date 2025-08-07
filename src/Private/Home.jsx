import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import SidebarOptions from '../components/siderBar/Sidebar';
import './Home.css'
import QuestionCard from '../components/QuestionCard/QuestionCard';
import TopicsCard from '../components/TopicsCard/TopicsCard';

import { useState } from 'react';
import Profile from '../components/Profile/Profile';
//import { assets } from '../assets/image/assets';

function Home() {

  return (

    <div>

      <Navbar />
       {/* <Profile />       */}

      <div className='main'>

        <div>
          <SidebarOptions />
        </div>


        <div className='question_card'>
          <QuestionCard />
        </div>

        <div className='TopicsCard'>
          <TopicsCard />
        </div>
      </div>
    </div>

  );
}

export default Home;
