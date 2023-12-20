import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { atoms } from "../atom";

function createNotebook(notebookName) {
  const allNoteString = localStorage.getItem("AllNote");
  const allNote = allNoteString ? JSON.parse(allNoteString) : [];

  const updateAllNote = [...allNote, notebookName];
  localStorage.setItem("AllNote", JSON.stringify(updateAllNote));
}

function createMemo(memo, notebookName, setAtom) {
  const notebookString = localStorage.getItem(notebookName);
  const notebook = notebookString ? JSON.parse(notebookString) : [];

  const updateNotebook = [...notebook, memo];

  localStorage.setItem(notebookName, JSON.stringify(updateNotebook));
  setAtom({ memo: [notebookName, memo] });
}

function CreateModal({ type, setModalState, notebook }) {
  const [inputState, setInputState] = useState("");
  const [_, setAtom] = useRecoilState(atoms);

  const onChange = (e) => {
    const { value } = e.target;
    setInputState(value);
  };
  const onClickCreate = () => {
    if (type === "notebook") {
      createNotebook(inputState);
    } else {
      createMemo(inputState, notebook, setAtom);
    }
    setModalState(false);
  };
  const onClickCancle = () => {
    setModalState(false);
  };

  return (
    <Overlay>
      <Container>
        <h1>Name</h1>
        {type === "notebook" ? (
          <>
            <input
              onChange={onChange}
              value={inputState}
              placeholder="Enter noteBook name"
            />
            <ButtonBox>
              <button onClick={onClickCancle}>Cancle</button>
              <button onClick={onClickCreate}>Create</button>
            </ButtonBox>
          </>
        ) : (
          <>
            <textarea
              onChange={onChange}
              value={inputState}
              placeholder="Enter memo"
            />
            <ButtonBox>
              <button onClick={onClickCancle}>Cancle</button>
              <button onClick={onClickCreate}>Create</button>
            </ButtonBox>
          </>
        )}
      </Container>
    </Overlay>
  );
}

export default CreateModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Container = styled.div`
  width: 500px;
  height: 320px;

  background-color: white;
  border-radius: 8px;
  padding: 20px;

  display: flex;
  flex-direction: column;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 1000;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  textarea {
    height: 180px;
    font-size: 16px;
    margin-bottom: auto;

    padding: 5px;
  }
  input {
    height: 50px;
    font-size: 20px;
    padding: 5px;
    margin-bottom: auto;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;

  gap: 10px;
  height: 30px;
  margin-bottom: 10px;

  button {
    background-color: transparent;
    border: 1px solid black;
    border-radius: 5px;
  }
`;
