import './App.css';
import {Routes, Route} from 'react-router-dom';
import IndexPage from './pages/IndexPages';
import LoginPage from './pages/LoginPage';
import LayOut from './pages/LayOut';
import RegisterPage from './pages/RegisterPage';
import {UserContextProvider} from './UserContextFile'
import axios from 'axios';
import AccountPage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPages';
import PlacesFormpage from './pages/PlacesFormPage';
import SinglePlacePage from './pages/SingleplacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage'


axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element= {<LayOut />}>
          <Route index element={<IndexPage />} ></Route>
          <Route path='/login' element={<LoginPage />} ></Route>
          <Route path='/register' element={<RegisterPage/>} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormpage />} />
          <Route path="/account/places/:id" element={<PlacesFormpage />} />
          <Route path='/place/:id' element={<SinglePlacePage/>} />
          <Route path='/account/bookings' element={<BookingsPage/>} />
          <Route path='/account/bookings/:id' element={<BookingPage/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App
