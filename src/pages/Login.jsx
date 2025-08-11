import React, { useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from "../assets/assets";
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import { validateEmail } from '../utils/Validation';
import axiosConfig from '../utils/axiosConfig';
import { API_ENDPOINTS } from '../utils/apiEndpoints';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import { AppContext} from '../context/AppContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    //it will stop reloading 
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter your valid email");
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      setLoading(false);
      return;
    }

    setError("");
    console.log(email, password);

    //Login in API CALLS
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
      }

      if (response.status === 201 || response.status === 200) {
        toast.success("Profile Successfully Logined");
        navigate("/dashboard");
      }
    }
    catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      }
      else {
        console.error("Something went wrong", err);
        setError(err.message);
      }

    }
    finally {
      setLoading(false);
    }
  }



  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Background image with blur*/}
      <img src={assets.logo} alt="background" className="absolute inset-0 w-full h-full object-cover filter blur-sm"></img>
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Login In Your Account
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Start your personalize management by joining with us;
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="email"
                  placeHolder="fullname@example.com"
                  type="email"></Input>
              </div>

              <div className="col-span-2">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="password"
                  placeHolder="*********"
                  type="password">
                </Input>
              </div>
            </div>

            {
              error && (
                <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded"> {error} </p>
              )
            }

            <button disabled={isLoading} className={`bg-purple-700 text-white w-full py-3 text-lg font-medium rounded-lg flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`} type="submit">
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5"></LoaderCircle>
                  loading....
                </>)
                :
                (
                  "LOGIN "
                )
              }
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Don't have an account?
              <Link to="/signup" className="font-medium text-purple-600 underline hover:text-primary-dark transition-colors"> Register</Link>
            </p>


          </form>
        </div>

      </div>
    </div>
  )
}

export default Login