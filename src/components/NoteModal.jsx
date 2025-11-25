import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function NoteModal({ isOpen, onClose, onSave, editingNote }) {
  // ensure tags is always an array (defensive)
  const tags = useSelector((state) => (state.notes && state.notes.tags) || []);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // Load existing note for editing
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || "");
      setBody(editingNote.body || "");
      setSelectedTags(Array.isArray(editingNote.tags) ? editingNote.tags : []);
    } else {
      setTitle("");
      setBody("");
      setSelectedTags([]);
    }
  }, [editingNote, isOpen]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    const note = {
      id: editingNote?.id,
      title,
      body,
      tags: selectedTags,
    };

    onSave(note); // Send note back to App.jsx
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{editingNote ? "Edit Note" : "Create Note"}</DialogTitle>

      <DialogContent>
        <Box className="space-y-3 mt-2">
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Body (Markdown supported)"
            fullWidth
            multiline
            rows={6}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {(tags || []).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                clickable
                variant={selectedTags.includes(tag) ? "filled" : "outlined"}
                onClick={() => toggleTag(tag)}
              />
            ))}
          </div>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSubmit}>
          {editingNote ? "Save Changes" : "Add Note"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
