import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/firebase.config';

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

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
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