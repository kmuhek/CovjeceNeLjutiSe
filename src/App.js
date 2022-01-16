import React, { useState } from "react";
import BoardAgent from "./BoardAgent";
import PlayerAgent from "./PlayerAgent";
import Board from "./Board";

function App() {
  const { agent: boardAgent, board } = BoardAgent({ id: "boardAgent" });
  const player1 = PlayerAgent({ id: "player1" });
  const player2 = PlayerAgent({ id: "player2" });
  const [btnDisabled, setBtnDisabled] = useState(false);

  const startGame = () => {
    Promise.all([boardAgent.ready, player1.ready, player2.ready]).then(() => {
      setBtnDisabled(true);
      boardAgent.startGame();
    });
  };

  return (
    <div className="App">
      <button disabled={btnDisabled} onClick={startGame}>
        Pokreni igru
      </button>
      <Board data={board} />
    </div>
  );
}

export default App;
