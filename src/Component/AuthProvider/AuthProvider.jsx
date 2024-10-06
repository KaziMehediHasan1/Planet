import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../Firebase/Firebase";
import useAxiosPublic from "../../hooks/AxiosPublic/useAxiosPublic";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

  // create user...
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login User ...
  const LoginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // resetPassword..
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  //   Logout..
  const Logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // User observing...
  useEffect(() => {
    const unSubscriber = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // get token and store client..
        const userInfo = { email: currentUser?.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res?.data?.token) {
            localStorage.setItem("access-token", res.data?.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    return () => {
      unSubscriber();
    };
  }, [axiosPublic]);

  // update User..
  const updateUser = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const GoogleProviders = new GoogleAuthProvider();
  const GoogleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProviders);
  };

  const authInfo = {
    user,
    loading,
    createUser,
    LoginUser,
    Logout,
    updateUser,
    GoogleLogin,
    resetPassword
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
