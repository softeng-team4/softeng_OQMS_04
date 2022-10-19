import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout, DefaultRoute, TicketRoute, StatisticsRoute, NextRoute, DisplayRoute } from './components/View';
import { useEffect, useState } from 'react';

import API from './API';

function App() {
  const [display, setDisplay] = useState([]);

  const [services, setServices] = useState([]);

  useEffect(() => {
    getCountersTicket();
    getServices();
  }, []);

  const getCountersTicket = async () => {
    const list = await API.getCountersTicket();
    //get display info from api
    setDisplay(list);
  };



  const getServices = async () => {
    const list = await API.getServices();
    //get queues info from api
    setServices(list);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>

        <Route path='/' element={<AppLayout/>}></Route>
        <Route path='/getTicket' element={<TicketRoute/>}> </Route>
        <Route path='/statistics' element={<StatisticsRoute/>}> </Route>
        <Route path='/display' element={<DisplayRoute services={services}/>}> </Route>
        <Route path='/nextCustomer' element={<NextRoute/>}> </Route>
          
        
        
        <Route path='*' element={<DefaultRoute />} />
        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
