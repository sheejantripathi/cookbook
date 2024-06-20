// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "./axiosConfig"; // Assuming axiosConfig.js is correctly configured
import RecipesList from "./components/RecipesList";
import LoginPage from "./components/LoginPage";
import CustomNavbar from "./components/Navbar";
import MyRecipes from "./components/MyRecipes";
import RecipeForm from "./components/RecipeForm";
import RecipeDetail from "./components/RecipeDetail";

const App = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (response) => setUser(response),
    onError: (error) => console.log("Login Failed:", error),
  });

  const getUserProfile = async () => {
    axios
      .get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtAccessToken")}`,
          "ngrok-skip-browser-warning": "true",
        },
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.error("Error fetching profile", err);
      });
  };

  const fetchGoogleProfileAndSaveUser = async (userData) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userData.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${userData.access_token}`,
            Accept: "application/json",
          },
        }
      );

      const profileData = res.data;

      const loginResponse = await axios.post("/login", {
        google_id: profileData.id,
        name: profileData.name,
        email: profileData.email,
        picture: profileData.picture,
      });

      const { token } = loginResponse.data;
      localStorage.setItem("jwtAccessToken", token);

      // Fetch the user profile from your backend
      getUserProfile();
    } catch (error) {
      console.error("Error during login or fetching profile:", error);
    }
  };

  // Check for JWT token in localStorage on app load (page refresh)
  useEffect(() => {
    if (localStorage.getItem("jwtAccessToken")) {
      getUserProfile();
    }
  }, []);

  // Handle Google OAuth login and save user info
  useEffect(() => {
    if (user) {
      fetchGoogleProfileAndSaveUser(user);
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    localStorage.removeItem("jwtAccessToken");
    setProfile(null);
  };

  return (
    <Router>
      <div>
        {profile ? (
          <>
            <CustomNavbar profile={profile} logOut={logOut} />
            <div className="container">
              <h1 className="mt-5 mb-5 text-center">
                <b>The Ultimate CookBook of Champions</b>
              </h1>
              <Routes>
                <Route path="/" element={<RecipesList />} />
                <Route
                  path="/my-recipes"
                  element={<MyRecipes userId={profile.id} />}
                />
                <Route path="/add-recipe" element={<RecipeForm />} />
                <Route path="/edit-recipe/:id" element={<RecipeForm />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
              </Routes>
            </div>
          </>
        ) : (
          <LoginPage login={login} />
        )}
      </div>
    </Router>
  );
};

export default App;
