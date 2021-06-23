import React, { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { firebase } from "../firebase";

import ContextUser from "../hooks/userHook";

import illustration from "../assets/illustration.svg";
import logoimg from "../assets/logo.svg";

import "../styles/newroom.scss";

export default function NewRoom() {
  const { user } = ContextUser();
  const [newRoom, setNewRoom] = useState("");

  const history = useHistory();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const roomRef = await firebase.database().ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      author: user?.email,
    });

    history.push(`/room/${firebaseRoom.key}`);

    console.log(firebaseRoom);
  };
  return (
    <div id="page-newroom">
      <aside>
        <img src={illustration} alt="ilustration" />
        <strong>Crie suas salas Q&amp;A ao-vivo</strong>
        <p>Tire suas duvidas da audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="create-room">
          <img src={logoimg} alt="logo" />
          <strong>Crie uma nova sala</strong>
        </div>

        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            onChange={(event) => setNewRoom(event.target.value)}
            value={newRoom}
            type="text"
            placeholder="Digite o nome da sala"
          />
          <button>Criar sala</button>
        </form>
        <div className="join-room">
          <span>Quer entrar em uma sala existente?</span>
          <a href="#">Click aki</a>
        </div>
      </main>
    </div>
  );
}
