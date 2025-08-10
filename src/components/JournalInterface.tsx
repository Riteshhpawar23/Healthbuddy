import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

// Example journal entries
const journalEntries = [
  {
    id: 1,
    title: "Gratitude Journal",
    date: "2025-08-10",
    content: "Today I am grateful for my family and the support they give me.",
    image: undefined,
  },
  {
    id: 2,
    title: "Reflection",
    date: "2025-08-09",
    content: "I learned a lot about patience and perseverance at work today.",
    image: undefined,
  },
  {
    id: 3,
    title: "Mood Tracker",
    date: "2025-08-08",
    content: "Feeling optimistic and energetic after a good night's sleep.",
    image: undefined,
  },
];



const JournalInterface: React.FC = () => {
  const [entries, setEntries] = useState(journalEntries);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title && !content && !image) return;
    if (editId !== null) {
      // Edit existing entry
      setEntries(entries.map(entry => entry.id === editId ? {
        ...entry,
        title,
        content,
        image,
      } : entry));
      setEditId(null);
    } else {
      // Add new entry
      const newEntry = {
        id: entries.length ? Math.max(...entries.map(e => e.id)) + 1 : 1,
        title: title || "Untitled",
        date: new Date().toISOString().slice(0, 10),
        content,
        image,
      };
      setEntries([newEntry, ...entries]);
    }
    setTitle("");
    setContent("");
    setImage(null);
  };

  const handleEdit = (entry: typeof journalEntries[0]) => {
    setTitle(entry.title);
    setContent(entry.content);
    setImage(entry.image || null);
    setEditId(entry.id);
  };

  const handleDelete = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
    if (editId === id) {
      setTitle("");
      setContent("");
      setImage(null);
      setEditId(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white/80 rounded-xl shadow flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring"
        />
        <textarea
          placeholder="Write your journal entry..."
          value={content}
          onChange={e => {
            setContent(e.target.value);
            const textarea = e.target;
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
          }}
          className="border rounded px-3 py-2 min-h-[3rem] resize-none focus:outline-none focus:ring overflow-hidden"
          style={{height: 'auto'}}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700"
        />
        {image && (
          <img src={image} alt="Preview" className="max-h-40 rounded-lg border object-cover" />
        )}
        <Button type="submit" className="mt-2">{editId !== null ? "Update Entry" : "Add Entry"}</Button>
        {editId !== null && (
          <Button type="button" variant="ghost" className="mt-2" onClick={() => {
            setTitle("");
            setContent("");
            setImage(null);
            setEditId(null);
          }}>Cancel Edit</Button>
        )}
      </form>
      <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Card key={entry.id}>
            <CardHeader className="relative">
              <CardTitle>{entry.title}</CardTitle>
              <div className="text-sm text-muted-foreground">{entry.date}</div>
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="p-2"><MoreVertical size={20} /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(entry)}>
                      Edit Entry
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(entry.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p>{entry.content}</p>
              {entry.image && (
                <img src={entry.image} alt="Journal" className="mt-4 max-h-40 rounded-lg border object-cover" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JournalInterface;
