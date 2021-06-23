import { createContext, useContext, useState } from "react";

import { firebase } from "../firebase";

type User = {
  uid: string;
  name: string;
  email: string;
  avatar: string;
};

type UserContextProps = {
  user: User | undefined;
  singInWithGoogle: () => void;
};

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: any) {
  const [user, setUser] = useState<User>();

  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    await firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
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

        console.log("user", result);
      })
      .catch((e) => console.log(e));
  }

  return (
    <UserContext.Provider value={{ user, singInWithGoogle }}>
      {children}
    </UserContext.Provider>
  );
}
