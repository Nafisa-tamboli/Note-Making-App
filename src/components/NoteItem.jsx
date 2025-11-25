export default function NoteItem({ note, onDelete, onEdit }) {
  return (
    <div className="note-card">
      <h3>{note.title || "Untitled"}</h3>

      <p className="note-body">
        {(note.body || note.content || "").length > 220
          ? (note.body || note.content || "").slice(0,220) + "..."
          : (note.body || note.content || "")}
      </p>

      <div className="tags">
        {(note.tags || []).map(t => (
          <span key={t} className="tag-pill">{t}</span>
        ))}
      </div>

      <div className="actions">
        <button className="action-small" onClick={onEdit}>Edit</button>
        <button className="action-small" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
