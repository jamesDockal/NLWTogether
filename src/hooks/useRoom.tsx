import { useContext, useEffect, useState } from "react";
import { firebase } from "../firebase";

type RoomType = {
  author: string;
  title: string;
  // questions: Object;
};

export default function useRoom(roomId: string) {
  // const [room, setRoom] = useState<RoomType | undefined>();
  const [room, setRoom] = useState<RoomType>();
  const roomRef = firebase.database().ref(`rooms/${roomId}`);

  useEffect(() => {
    roomRef.on("value", (roomInfo) => {
      console.log("roominfo", roomInfo.val());
      setRoom(roomInfo.val());

      // const a = roomInfo.val()
    });
  }, []);

  return room;
}
