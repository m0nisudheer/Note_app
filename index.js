
const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

// Load and display existing notes
getNotes().forEach((note) => {
  const noteEl = createNoteEl(note.id, note.content);
  appEl.insertBefore(noteEl, btnEl);
});

// Create a new note element
function createNoteEl(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;

  // Event listener for double-click to delete the note
  element.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id, element);
    }
  });

  // Event listener for input to update the note
  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });

  return element;
}

// Delete a note by its ID
function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id !== id);
  saveNote(notes);
  appEl.removeChild(element);
}

// Update the content of a note
function updateNote(id, content) {
  const notes = getNotes();
  const target = notes.find((note) => note.id === id);
  if (target) {
    target.content = content;
    saveNote(notes);
  }
}

// Add a new note
function addNote() {
  const notes = getNotes();
  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };
  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  appEl.insertBefore(noteEl, btnEl);

  notes.push(noteObj);

  saveNote(notes);
}

// Save notes to localStorage
function saveNote(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}


function getNotes() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}


btnEl.addEventListener("click", addNote);
