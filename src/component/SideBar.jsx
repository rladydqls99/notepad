import React, { useState } from "react";
import styled from "styled-components";
import NoteBooks from "./NoteBooks";
import CreateModal from "./CreateModal";
import Button from "./Button";

function SideBar() {
  const AllNote = JSON.parse(localStorage.getItem("AllNote")) || [];
  const [modalState, setModalState] = useState(false);
  const [renderState, setRenderState] = useState(false);

  const onClickCreateBtn = () => {
    setModalState(!modalState);
  };

  const deleteAll = () => {
    window.localStorage.clear();
  };
  return (
    <Container>
      <Button size="l" onClick={onClickCreateBtn} text="Create NoteBook" />
      {AllNote &&
        AllNote.map((notebook, index) => (
          <NoteBooks
            key={index}
            notebook={notebook}
            renderState={renderState}
            setRenderState={setRenderState}
          />
        ))}
      {modalState && (
        <CreateModal type={"notebook"} setModalState={setModalState} />
      )}
      <DeleteAllBtn onClick={deleteAll}>delete All Notebooks</DeleteAllBtn>
    </Container>
  );
}
export default SideBar;

const Container = styled.div`
  width: 200px;
  border-right: 1px solid lightgray;
  padding: 10px;

  display: flex;
  flex-direction: column;

  height: 100%;
  gap: 20px;

  button {
    background-color: transparent;
    border: 1px solid lightgray;
    border-radius: 10px;

    height: 50px;
    font-size: 16px;
  }
`;

const DeleteAllBtn = styled.button`
  margin-top: auto;
`;
