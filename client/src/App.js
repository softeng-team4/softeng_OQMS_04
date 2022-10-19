import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout, DefaultRoute, TicketRoute, StatisticsRoute, NextRoute, DisplayRoute } from './components/View';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout/>}></Route>
          <Route path='/getTicket' element={<TicketRoute/>}> </Route>
          <Route path='/statistics' element={<StatisticsRoute/>}> </Route>
          <Route path='/display' element={<DisplayRoute/>}> </Route>
          <Route path='/nextCustomer' element={<NextRoute/>}> </Route>
          <Route path='*' element={<DefaultRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
