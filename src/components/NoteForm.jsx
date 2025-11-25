import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNote, updateNote } from "../features/notes/notesSlice";

export default function NoteForm({ editingNote, onClose }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  // Load note when editing
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setTags(editingNote.tags.join(", "));
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const noteData = {
      title,
      content,
      tags: tags.split(",").map((t) => t.trim())
    };

    if (editingNote) {
      dispatch(updateNote({ id: editingNote.id, ...noteData }));
    } else {
      dispatch(addNote(noteData));
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder="Enter title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Enter note content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Tags (comma separated, e.g., work, personal)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button type="submit">
        {editingNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}
