import React, { FormEvent, useState } from "react";
import { firebase } from "../firebase";

import ContextUser from "../hooks/userHook";

import { useHistory } from "react-router-dom";

import illustration from "../assets/illustration.svg";
import logoimg from "../assets/logo.svg";
import googleicon from "../assets/google-icon.svg";

import "../styles/home.scss";

export default function Home() {
  const history = useHistory();
  const { user, singInWithGoogle } = ContextUser();

  const [roomId, setRoomId] = useState("");

  const handleLogin = async () => {
    console.log(user);

    if (user) {
      return history.push("/room/new");
    }

    try {
      await singInWithGoogle();
      history.push("/room/new");
    } catch (e) {
      alert(e);
    }
  };

  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (roomId.trim() == "") return;

    console.log(roomId)

    // const roomRef = await firebase.database().ref(`rooms/${roomId}`).get()
    const roomRef = await firebase.database().ref(`rooms/${roomId}`).get()
    
    console.log(roomRef.exists())

    if(!roomRef.exists()) return alert('Room doest exists!')
    
    history.push(`/room/${roomId}`)

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
          <button onClick={() => handleLogin()}>
            <img src={googleicon} />
            Crie sua sala com o Google
          </button>
          <div className="or-enter">Ou entre em uma sala</div>
        </div>
        <form onSubmit={(event) => handleJoinRoom(event)}>
          <input
            value={roomId}
            onChange={(event) => setRoomId(event.target.value)}
            type="text"
            placeholder="Digite o codigo da sala"
          />
          <button type="submit">Entrar na sala</button>
        </form>
      </main>
    </div>
  );
}
