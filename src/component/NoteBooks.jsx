import React, { useState } from "react";
import styled from "styled-components";
import CreateModal from "./CreateModal";
import { useRecoilState } from "recoil";
import { atoms } from "../atom";

function NoteBooks({ notebook, renderState, setRenderState }) {
  const [toggleState, setToggleState] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [_, setAtom] = useRecoilState(atoms);

  const memoList = JSON.parse(localStorage.getItem(notebook)) || [];
  const onClickToggle = () => {
    setToggleState(!toggleState);
  };
  const onClickPlusBtn = () => {
    setModalState(!modalState);
  };
  const onClickDeleteNote = () => {
    const result = window.confirm(
      "Are you sure you want to delete the notebook?"
    );
    if (result) {
      const allNotes = JSON.parse(localStorage.getItem("AllNote")) || [];
      const newNotes = allNotes.filter((note) => note !== notebook);
      localStorage.setItem("AllNote", JSON.stringify(newNotes));
      localStorage.removeItem(notebook);
      setRenderState(!renderState);
    }
  };
  const onClickDeleteMemo = (memo) => {
    const result = window.confirm("Are you sure you want to delete the memo?");
    if (result) {
      const allMemo = JSON.parse(localStorage.getItem(notebook)) || [];
      const newMemo = allMemo.filter((oldMemo) => oldMemo !== memo);

      localStorage.setItem(notebook, JSON.stringify(newMemo));
      setRenderState(!renderState);
    }
  };

  return (
    <>
      <Box togglestate={toggleState ? 0 : 1}>
        <span
          onClick={onClickToggle}
          className="material-symbols-outlined arrow"
        >
          arrow_forward_ios
        </span>
        <h1 onClick={() => setAtom({ notebook: notebook })}>{notebook}</h1>
        <div>
          <span onClick={onClickPlusBtn} className="material-symbols-outlined">
            add
          </span>
          <span
            onClick={onClickDeleteNote}
            className="material-symbols-outlined"
          >
            delete
          </span>
        </div>
      </Box>
      <MemoList togglestate={toggleState ? 0 : 1} length={memoList.length * 30}>
        {memoList.map((memo, index) => (
          <div key={index}>
            <li onClick={() => setAtom({ memo: [notebook, memo] })}>{memo}</li>
            <span
              onClick={() => onClickDeleteMemo(memo)}
              className="material-symbols-outlined"
            >
              delete
            </span>
          </div>
        ))}
      </MemoList>
      {modalState && (
        <CreateModal
          type={"memo"}
          setModalState={setModalState}
          notebook={notebook}
        />
      )}
    </>
  );
}

export default NoteBooks;

const Box = styled.div`
  height: 20px;
  display: flex;
  justify-content: space-between;

  h1 {
    color: skyblue;
  }
  button {
    background-color: transparent;
    border: none;
  }
  span {
    font-size: 18px;
    color: lightgray;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
  }
  .arrow {
    ${(props) =>
      props.togglestate === 1 &&
      `
      -ms-transform: rotate(90deg);
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    `}
  }
`;

const MemoList = styled.ul`
  max-height: ${(props) =>
    props.togglestate === 0 ? "0px" : `${props.length}px`};
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;

  list-style: none;
  padding: 0;
  margin: 0;

  div {
    display: flex;
    margin-left: 15px;
    margin-bottom: 10px;
  }

  li {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 80%;
  }

  span {
    font-size: 18px;
    color: lightgray;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    margin-right: 18px;
  }
`;
