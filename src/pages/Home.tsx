import React from "react";

import { useHistory } from "react-router-dom";
import { firebase } from "../firebase";

import illustration from "../assets/illustration.svg";
import logoimg from "../assets/logo.svg";
import googleicon from "../assets/google-icon.svg";

import "../styles/home.scss";

export default function Home() {
  const history = useHistory();

  const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log("user", result.user?.displayName);
        history.push("/rooms/new");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div id="page-auth">
      <aside>
        <img src={illustration} alt="ilustration" />
        <strong>Crie suas salas Q&amp;A ao-vivo</strong>
        <p>Tire suas duvidas da audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="create-room">
          <img src={logoimg} alt="logoimg" />
          <button onClick={() => googleLogin()}>
            <img src={googleicon} />
            Crie sua sala com o Google
          </button>
          <div className="or-enter">Ou entre em uma sala</div>
        </div>
        <form>
          <input type="text" placeholder="Digite o codigo da sala" />
          <button type="submit">Entrar na sala</button>
        </form>
      </main>
    </div>
  );
}
