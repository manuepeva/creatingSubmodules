import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./_join.scss";

export const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading" data-cy="titulo">Iniciar Sesión</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
            data-cy="login"
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
            data-cy="input-room"
          />
        </div>
        <Link
          data-cy="chatname"
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button 
          data-cy="submit"
          className="button mt-20" 
          type="submit">
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Join;
