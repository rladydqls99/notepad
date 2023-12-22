import React from "react";
import styled from "styled-components";

function Button({ size, onClick, text }) {
  let style;
  switch (size) {
    case "l":
      style = {
        height: "50px",
        fontSize: "16px",
      };
      break;
    case "m":
      style = {
        width: "100px",
        height: "50px",
        fontSize: "16px",
        marginLeft: "auto",
      };
      break;
    case "s":
      style = {
        width: "70px",
        height: "50px",
        fontSize: "16px",
      };
      break;
    default:
      style = {
        height: "50px",
        fontSize: "16px",
      };
  }

  return (
    <Btn onClick={onClick} style={style}>
      {text}
    </Btn>
  );
}

export default Button;

const Btn = styled.button`
  background-color: #0040ff;
  color: white;
  border: 1px solid lightgray;
  border-radius: 10px;
`;
