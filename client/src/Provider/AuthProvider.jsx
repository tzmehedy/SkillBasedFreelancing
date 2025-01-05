import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const [loading,setLoading] = useState(true)

    const provider = new GoogleAuthProvider()

    const createUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email,password)
    }

    const updateUser = (name, photo) =>{
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    const loginWithEmailAndPassword = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }
    const loginWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    const getToken = async(email) =>{
        const { data } = await axios.post(`${import.meta.env.VITE_url}/jwt`, {
          email: email,
        }, {withCredentials:true});
        return data
    }

    const removeToken = async () =>{
        const { data } = await axios.get(`${import.meta.env.VITE_url}/logout`, {
          withCredentials: true,
        });
        console.log("inside logout",data)
        return data
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            console.log(currentUser)
            setUser(currentUser)
            if(currentUser){
                getToken(currentUser.email)
            }
            else{
                removeToken()
            }
            setLoading(false)
        })

        return ()=>{
            unSubscribe()
        }
    },[])

    const info = {
      user,
      createUser,
      loginWithGoogle,
      loginWithEmailAndPassword,
      logOut,
      updateUser,
      loading,
      setLoading,
    };
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;