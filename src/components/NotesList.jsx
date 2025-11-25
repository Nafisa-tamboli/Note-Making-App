import { useSelector } from "react-redux";

export default function NotesList({ onEdit }) {
  // Get notes and active tag
  const notes = useSelector((state) => state.notes.notes);
  const activeTag = useSelector((state) => state.notes.activeTag);

  // Filter notes based on active tag
  const filteredNotes =
    activeTag === "all"
      ? notes
      : notes.filter((note) => note.tags.includes(activeTag));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {filteredNotes.map((note) => (
        <div
          key={note.id}
          className="border p-4 rounded-lg bg-white shadow-sm hover:shadow-md cursor-pointer"
          onClick={() => onEdit(note)}
        >
          <h2 className="font-semibold text-lg">{note.title}</h2>
          <p className="text-gray-700 mt-2 whitespace-pre-wrap">{note.body}</p>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap mt-3">
            {note.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-1 bg-gray-200 rounded-md text-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* If no notes */}
      {filteredNotes.length === 0 && (
        <p className="text-gray-500 col-span-full text-center mt-6">
          No notes found 😴
        </p>
      )}
    </div>
  );
}
