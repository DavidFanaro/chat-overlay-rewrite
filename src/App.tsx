import { config } from "./config";
import { randomColor } from "./utils/randomColor";
import React, { useEffect, useState } from "react";
import { User } from "./types/user";
import { Message } from "./types/message";
import tmi from "tmi.js";
import "./App.css";
import ChatCard from "./components/ChatCard/ChatCard";

const client = new tmi.Client({
  channels: [config.channelName],
});
function setup() {
  client.connect();
}
const users: User[] = [];

function App() {
  const [mes, setmes] = useState<Message[]>([]);

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    client.on("message", (channel, tags, message, self) => {
      if (self) return;
      if (users.find((v) => v.name === tags["display-name"]) === undefined) {
        const currentUser: User = {
          name: tags["display-name"],
          color: randomColor(),
        };
        users.push(currentUser);
        const incomingMes: Message = {
          name: tags["display-name"],
          message: message,
          nameColor: currentUser.color,
        };
        setmes((i) => i.concat(incomingMes));
      }else{
        const user = users.find((v) => v.name === tags["display-name"])
        const incomingMes: Message = {
          name: tags["display-name"],
          message: message,
          nameColor: user!.color,
        };
        setmes((i) => i.concat(incomingMes));
      }
      console.log(users)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {mes.map((v, i) => {
        return <ChatCard name={v.name!} mes={v.message} color={v.nameColor} />;
      })}
    </div>
  );
}

export default App;
