import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [
    // Example note (optional) - can remove if you don't want a seed note
    // { id: 1, title: "Attend the meeting", body: "Zoom @ 4pm", tags: ["urgent"] }
  ],
  activeTag: "All",
  tags: ["urgent", "personal", "important"] // default tags shown in UI
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      // action.payload should be { id, title, body, tags }
      state.notes.unshift(action.payload);
      // keep tags list up-to-date (add any new tag)
      (action.payload.tags || []).forEach(t => {
        if (!state.tags.includes(t)) state.tags.push(t);
      });
    },

    updateNote: (state, action) => {
      const idx = state.notes.findIndex(n => n.id === action.payload.id);
      if (idx !== -1) state.notes[idx] = action.payload;
      // add any new tags from updated note
      (action.payload.tags || []).forEach(t => {
        if (!state.tags.includes(t)) state.tags.push(t);
      });
    },

    deleteNote: (state, action) => {
      state.notes = state.notes.filter(n => n.id !== action.payload);
    },

    setActiveTag: (state, action) => {
      state.activeTag = action.payload;
    },

    addTag: (state, action) => {
      const t = action.payload?.trim();
      if (t && !state.tags.includes(t)) state.tags.push(t);
    }
  }
});

export const { addNote, updateNote, deleteNote, setActiveTag, addTag } = notesSlice.actions;
export default notesSlice.reducer;
