import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { atoms } from "../atom";
import styled from "styled-components";
import Button from "./Button";

function Main() {
  const [atom, setAtom] = useRecoilState(atoms);
  const [displayState, setDisplayState] = useState();
  const [firstState, setFirstState] = useState(true);
  const [inputState, setInputState] = useState(false);
  const [textState, setTextState] = useState(false);

  useEffect(() => {
    if (Object.keys(atom)[0] === "notebook") {
      setDisplayState(JSON.parse(localStorage.getItem(Object.values(atom)[0])));
      setTextState(true);
      setFirstState(false);
      setInputState(false);
    }
    if (Object.keys(atom)[0] === "memo") {
      const display = Object.values(atom)[0][1];
      setDisplayState(display);
      setTextState(false);
      setFirstState(false);
      setInputState(true);
    }
  }, [atom]);

  const onChangeTextArea = (e) => {
    const { value } = e.target;
    setDisplayState(value);
  };
  const onClickTextArea = () => {
    const memos = JSON.parse(localStorage.getItem(atom.memo[0]));

    const deleteMemos = memos.filter((memo) => memo !== atom.memo[1]);
    const updateMemos = [...deleteMemos, displayState];

    localStorage.setItem(atom.memo[0], JSON.stringify(updateMemos));
    setAtom({ memo: [atom.memo[0], displayState] });
  };

  return (
    <Container>
      {firstState ? (
        <div>환영합니다.</div>
      ) : inputState ? (
        <TextBox>
          <h1>Memo</h1>
          <textarea onChange={onChangeTextArea} value={displayState} />
          <Button size="m" onClick={onClickTextArea} text="confirm" />
        </TextBox>
      ) : (
        textState &&
        (displayState ? (
          displayState.map((memo, index) => (
            <MemoBox key={index}>{memo}</MemoBox>
          ))
        ) : (
          <div>해당 notebook에 메모가 없습니다. 메모를 시작해보세요!</div>
        ))
      )}
    </Container>
  );
}

export default Main;

const Container = styled.div`
  width: 100%;

  margin: 0px 30px;
  padding: 10px;

  display: flex;
`;

const TextBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  textarea {
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    padding: 20px;

    border: 1px solid lightgray;
    font-size: 18px;
  }

  button {
    background-color: transparent;
    border: 1px solid lightgray;
    border-radius: 10px;

    width: 100px;
    height: 50px;
    font-size: 16px;

    margin-left: auto;
  }
`;

const MemoBox = styled.div`
  width: 100px;
  height: 100px;

  border: 1px solid lightgray;
  border-radius: 5px;

  margin-right: 10px;

  padding: 20px;
  text-align: center;
`;
