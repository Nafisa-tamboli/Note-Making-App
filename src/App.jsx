import { useState } from "react";
import { useDispatch } from "react-redux";
import NoteModal from "./components/NoteModal";
import NotesList from "./components/NotesList";
import TagFilter from "./components/TagFilter";
import { addNote, updateNote } from "./features/notes/notesSlice";

export default function App() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const openCreateModal = () => { setEditing(null); setOpen(true); };
  const openEditModal = (note) => { setEditing(note); setOpen(true); };

  const handleSave = (note) => {
    if (note.id) {
      dispatch(updateNote(note));
    } else {
      note.id = Date.now();
      dispatch(addNote(note));
    }
  };

  return (
    <div className="app-shell">
      <div className="app-container">

        {/* --- HEADER WITH LOGO --- */}
        <div className="app-header">
          <img 
            src="/logo.jpg"     
            alt="logo"
            style={{ width: 36, height: 36, borderRadius: 6 }}
          />
          <h1>Note Making App</h1>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
          <button className="btn" onClick={openCreateModal}>+ Create Note</button>
        </div>

        <TagFilter />
        <NotesList onEdit={openEditModal} />

        <NoteModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onSave={handleSave}
          editingNote={editing}
        />
      </div>
    </div>
  );
}
