import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Category from "./pages/Category"
import Filter from "./pages/Filter"
import Expense from "./pages/Expense"
import Income from "./pages/Income"
import { Toaster } from "react-hot-toast"
import { Navigate } from "react-router-dom"

function App() {
  return (
    <>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={root}/>
          <Route path="/dashboard" element={<Home></Home>}> </Route>
          <Route path="/signup" element={<SignUp/>}> </Route>
          <Route path="/login" element={<Login/>}> </Route>
          <Route path="/category" element={<Category/>}> </Route>
          <Route path="/income" element={<Income/>}> </Route>
          <Route path="/expense" element={<Expense/>}> </Route>
          <Route path="/filter" element={<Filter/>}> </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

const root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard"/>
  ):(
    <Navigate to="/login"/>
  );
}

export default App
