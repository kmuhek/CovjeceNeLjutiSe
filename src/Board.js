import React from "react";
import "./board.css";

const Board = ({ data }) => {
  return (
    <div className="board">
      <div className="top-row">
        <div className="tile">{data.tiles.field[4]}</div>
        <div className="tile">{data.tiles.field[5]}</div>
        <div className="tile">{data.tiles.field[6]}</div>
        <div className="tile">{data.tiles.field[7]}</div>
        <div className="tile">{data.tiles.field[8]}</div>
      </div>

      <div className="bottom-row">
        <div className="tile">{data.tiles.field[0]}</div>
        <div className="tile">{data.tiles.field[15]}</div>
        <div className="tile">{data.tiles.field[14]}</div>
        <div className="tile">{data.tiles.field[13]}</div>
        <div className="tile">{data.tiles.field[12]}</div>
      </div>

      <div className="left-col">
        <div className="tile">{data.tiles.field[3]}</div>
        <div className="tile">{data.tiles.field[2]}</div>
        <div className="tile">{data.tiles.field[1]}</div>
      </div>

      <div className="right-col">
        <div className="tile">{data.tiles.field[9]}</div>
        <div className="tile">{data.tiles.field[10]}</div>
        <div className="tile">{data.tiles.field[11]}</div>
      </div>

      <div
        className={`tile special special-1 ${
          data.tiles.special[0] ? "filled" : ""
        }`}
      ></div>
      <div
        className={`tile special special-2 ${
          data.tiles.special[1] ? "filled" : ""
        }`}
      ></div>
      <div
        className={`tile special special-3 ${
          data.tiles.special[2] ? "filled" : ""
        }`}
      ></div>
      <div
        className={`tile special special-4 ${
          data.tiles.special[3] ? "filled" : ""
        }`}
      ></div>
      {data.done && <div className="finish">Igra je gotova</div>}
    </div>
  );
};

export default Board;
