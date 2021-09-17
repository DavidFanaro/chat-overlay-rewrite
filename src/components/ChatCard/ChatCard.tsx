import React from "react";
import DOMPurify from 'dompurify';
import "./ChatCard.css";

type props = {
  name: string;
  mes: string;
  color: string;
};

function ChatCard({ name, mes, color }: props) {
  const safemes=DOMPurify.sanitize(mes)
  return (
    <div className="box">
      <div className="layout">
        <div className="time">
        <h2 style={{ color: color }} className="User">
          {name}
        </h2>
        <div className="date">
          {new Date().toLocaleTimeString("en-US", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </div>
        </div>
        <div dangerouslySetInnerHTML={{__html: safemes}} className="message"></div>
      </div>
    </div>
  );
}

export default ChatCard;
