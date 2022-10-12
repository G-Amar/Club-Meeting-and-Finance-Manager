import { useContext } from 'react';
import { UsersContext } from './context/UsersProvider';

import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Header from './components/Header/Header';
import Events from './pages/Events/Events';
import MessageMembers from './pages/MessageMembers/MessageMembers';
import AddEvent from './pages/AddEvent/AddEvent';
import IncomeStatement from './pages/IncomeStatement/IncomeStatement';
import Expenses from './pages/Expenses/Expenses';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Footer from './components/Footer/Footer';

function App() {
  const { authUser, getAuthUser } = useContext(UsersContext);
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>

        <Route
          element={
            <ProtectedRoute
              isAllowed={authUser == null}
              redirectTo='/profile'
            />
          }
        >
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Route>

        <Route element={<ProtectedRoute isAllowed={authUser != null} />}>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/events' element={<Events />}></Route>
        </Route>

        <Route
          element={
            <ProtectedRoute
              isAllowed={
                getAuthUser()?.role === 'treasurer' ||
                getAuthUser()?.role === 'coach'
              }
            />
          }
        >
          <Route path='/messageMembers' element={<MessageMembers />}></Route>
        </Route>

        <Route
          element={
            <ProtectedRoute isAllowed={getAuthUser()?.role === 'treasurer'} />
          }
        >
          <Route path='/incomeStatement' element={<IncomeStatement />}></Route>
          <Route path='/expenses' element={<Expenses></Expenses>}></Route>
          <Route path='/addEvent' element={<AddEvent />}></Route>
        </Route>
      </Routes>
      {
        //<Footer />
      }
    </>
  );
}

export default App;
