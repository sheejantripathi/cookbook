// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "./axiosConfig";
import RecipesList from "./components/RecipesList";
import LoginPage from "./components/LoginPage";
import CustomNavbar from "./components/Navbar";
import MyRecipes from "./components/MyRecipes";

const App = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (response) => setUser(response),
    onError: (error) => console.log("Login Failed:", error),
  });

  const saveUserInfo = async (userData) => {
    try {
      const res = await axios.post("/login", {
        google_id: userData.id,
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
      });

      const { token } = res.data;
      localStorage.setItem("jwtAccessToken", token);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // const handleLoginSuccess = async (response) => {
  //   try {
  //     console.log("Login Success:", response);
  //     const res = await axios.post("http://localhost/auth.php", {
  //       google_id: response.googleId,
  //       name: response.name,
  //       email: response.email,
  //       picture: response.imageUrl,
  //     });

  //     const { token } = res.data;
  //     localStorage.setItem("jwtAccessToken", token);

  //     setProfile({
  //       google_id: response.googleId,
  //       name: response.name,
  //       email: response.email,
  //       picture: response.imageUrl,
  //     });
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //   }
  // };

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          saveUserInfo(res.data);
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
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
                <Route path="/my-recipes" element={<MyRecipes />} />
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
