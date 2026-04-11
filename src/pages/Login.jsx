import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/appContext";
import { saveAuthData } from "../util/authStorage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter valid email address");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    setError(null);

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const token = response.data?.token;
      const user = response.data?.user ?? null;

      if (!token) {
        throw new Error("Login response did not include a token");
      }

      saveAuthData({ token, user });
      setUser(user);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img
        src={assets.login_bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 overflow-y-auto max-h-[90vh]">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back
          </h3>

          <p className="text-sm text-slate-700 text-center mb-8">
            Please enter your details to login.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="mail@example.com"
              type="email"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="********"
              type="password"
            />
            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
            <button
              disabled={isLoading}
              className={`btn-primary w-full py-2 text-base font-medium flex items-center justify-center gap-2 ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
              type="submit"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Logging In...
                </>
              ) : (
                "Login"
              )}
            </button>
            <p className="text-sm text-slate-800 text-center mt-6">
              Don't have an account?
              <Link
                to="/signup"
                className="font-medium text-primary underline text-primary-dark transition-colors"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
