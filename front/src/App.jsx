import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/authContext"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {

  return (

<AuthProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1 className="text-4xl font-bold">App Todo User</h1>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/register" element={<RegisterPage/>}></Route>
      <Route path="/tasks" element={<h1 className="text-4xl font-bold">Tasks</h1>}></Route>
      <Route path="/add-task" element={<h1 className="text-4xl font-bold">Add Task</h1>}></Route>
      <Route path="/task/:id" element={<h1 className="text-4xl font-bold">Task</h1>}></Route>
      <Route path="/profile" element={<h1 className="text-4xl font-bold">Profile</h1>}></Route>
    </Routes>          
  </BrowserRouter>
</AuthProvider>



)
}

export default App
