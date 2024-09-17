import './App.css';
import { Route, Routes } from 'react-router-dom'
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import EmployeeForm from './components/EmployeeForm';
import EmployeeDetails from './components/EmployeeDetails';
import { useNavigate } from 'react-router-dom';


const PrivateRoute = ({ component: Component }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  return token ? <Component /> : navigate('/login')
};

function App() {
  return (
    <>
      <Routes>
        <Route path='/' Component={ HomeComponent} />
        <Route path='/login' Component={LoginComponent} />
        <Route path='/employee' element={<PrivateRoute component={EmployeeForm}/>} />
        <Route path='/employee/:id' element={<PrivateRoute component={EmployeeDetails}/>}  />
      </Routes>
    </>
  );
}

export default App;
