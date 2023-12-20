export function createNotebook(notebookName) {
  const allNoteString = localStorage.getItem("AllNote");
  const allNote = allNoteString ? JSON.parse(allNoteString) : [];

  const updateAllNote = [...allNote, notebookName];
  localStorage.setItem("AllNote", JSON.stringify(updateAllNote));
}

export function createMemo(memo, notebookName, setAtom) {
  const notebookString = localStorage.getItem(notebookName);
  const notebook = notebookString ? JSON.parse(notebookString) : [];

  const updateNotebook = [...notebook, memo];

  localStorage.setItem(notebookName, JSON.stringify(updateNotebook));
  setAtom({ memo: [notebookName, memo] });
}
