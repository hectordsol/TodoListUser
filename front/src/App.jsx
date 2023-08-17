import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
// import { ToastContainer } from 'react-toastify';
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
// import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from "./ProtectedRoutes";
function App() {

  return (

<AuthProvider>
  {/* <ToastContainer/> */}
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/register" element={<RegisterPage/>}></Route>
      <Route element={<ProtectedRoutes/>}>
        <Route path="/tasks" element={<TasksPage/>}></Route>
        <Route path="/add-task" element={<TaskFormPage/>}></Route>
        <Route path="/task/:id" element={<TaskFormPage/>}></Route>
        <Route path="/profile" element={<ProfilePage/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
</AuthProvider>



)
}

export default App
