import { createContext, useContext, useState, useEffect } from "react";

import { firebase } from "../firebase";

type User = {
  uid: string;
  name: string;
  email: string;
  avatar: string;
};

type UserContextProps = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
};

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      console.log("on auths", user?.uid);

      if (user) {
        const { uid, displayName, email, photoURL } = user;
        if (!uid || !displayName || !email || !photoURL) {
          throw new Error("Missing information of Google Account");
        }

        setUser({
          uid: uid,
          name: displayName,
          email: email,
          avatar: photoURL,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await firebase.auth().signInWithPopup(provider);

    if (result.user) {
      const { uid, displayName, email, photoURL } = result.user;
      if (!uid || !displayName || !email || !photoURL) {
        throw new Error("Missing information of Google Account");
      }

      setUser({
        uid: uid,
        name: displayName,
        email: email,
        avatar: photoURL,
      });
    } else {
      throw new Error("Error to sign in");
    }
  }

  return (
    <UserContext.Provider value={{ user, singInWithGoogle }}>
      {children}
    </UserContext.Provider>
  );
}
