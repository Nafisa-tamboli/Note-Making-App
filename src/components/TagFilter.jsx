import { useSelector, useDispatch } from "react-redux";
import { setActiveTag, addTag } from "../features/notes/notesSlice";
import { useState } from "react";

export default function TagFilter(){
  const dispatch = useDispatch();
  const tags = useSelector(s => s.notes.tags || []);
  const active = useSelector(s => s.notes.activeTag || "All");

  const [newTag, setNewTag] = useState("");

  const submitTag = (e) => {
    e.preventDefault();
    const t = newTag.trim();
    if (!t) return;
    dispatch(addTag(t));
    setNewTag("");
  };

  return (
    <>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div className="tag-row">
          <button
            className={`tag-btn ${active === "All" ? "active" : ""}`}
            onClick={() => dispatch(setActiveTag("All"))}
          >
            All
          </button>

          {tags.map(t => (
            <button
              key={t}
              className={`tag-btn ${active === t ? "active" : ""}`}
              onClick={() => dispatch(setActiveTag(t))}
            >
              {t}
            </button>
          ))}
        </div>

        <form onSubmit={submitTag} style={{display:'flex', gap:8, alignItems:'center'}}>
          <input
            value={newTag}
            onChange={e=>setNewTag(e.target.value)}
            placeholder="Add tag"
            style={{padding:'6px 8px', borderRadius:8, border:'1px solid #e6eefc'}}
          />
          <button className="btn secondary" type="submit">Add</button>
        </form>
      </div>
    </>
  );
}
