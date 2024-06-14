import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipesList from "./components/RecipesList";
import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import LoginPage from "./components/LoginPage";
import CustomNavbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null); // Changed from [] to null
  const [profile, setProfile] = useState(null); // Changed from [] to null

  const login = useGoogleLogin({
    onSuccess: (response) => setUser(response),
    onError: (error) => console.log("Login Failed:", error),
  });

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
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
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
              </Routes>
            </div>
          </>
        ) : (
          <LoginPage login={login} />
        )}
      </div>
    </Router>
  );
}

export default App;
