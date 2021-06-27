import { createContext, useEffect, useState } from 'react';
import { ReactNode } from "react";
import { auth, firebase } from '../services/firebase';
type User = { 
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProps = {
  children: ReactNode; 
}

export function AuthContextProvider(props: AuthContextProps) { 

  const [user, setUser] = useState<User>();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        const {displayName, photoURL, uid} = user 
          if(!displayName || !photoURL){
            throw new Error('Faltando informação');
          }
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL 
          })
          console.log(user);
      }
    })
    return () => {
      unsubscribe();
    }
  }, []);
  
 async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
     const result = await auth.signInWithPopup(provider).then(result => {
      console.log(result);
      if(result.user){
        const {displayName, photoURL, uid} = result.user 
        if(!displayName || !photoURL){
          throw new Error('Faltando informação')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL 
        })
      }
  }).catch(error => console.log("Ocorreu um erro verifique"));
}

return (
  <AuthContext.Provider value={{user, signInWithGoogle}}>
    {props.children}
    </AuthContext.Provider>
);
}