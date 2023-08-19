import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

import ProtectedRoutes from "./ProtectedRoutes";
import NavBar from "./components/NavBar";
function App() {

  return (

<AuthProvider>
  <TaskProvider>
  <BrowserRouter>
    <NavBar/>
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
  </TaskProvider>
</AuthProvider>



)
}

export default App
