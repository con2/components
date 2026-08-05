"use client";

import { Column, ReorderableDataTable } from "@con2/components";
import { useState } from "react";

interface Track {
  id: number;
  title: string;
  artist: string;
}

const initialTracks: Track[] = [
  { id: 1, title: "Intro", artist: "Alice" },
  { id: 2, title: "Second Movement", artist: "Bob" },
  { id: 3, title: "Interlude", artist: "Carol" },
  { id: 4, title: "Finale", artist: "Dave" },
];

const columns: Column<Track>[] = [
  { slug: "title", title: "Title", scope: "row" },
  { slug: "artist", title: "Artist" },
];

export default function ReorderableDataTablePage() {
  const [tracks, setTracks] = useState(initialTracks);

  return (
    <div>
      <h1>ReorderableDataTable</h1>
      <p>Drag rows by the handle to reorder the playlist below.</p>
      <ReorderableDataTable
        rows={tracks}
        columns={columns}
        keyColumn="id"
        onReorderRows={setTracks}
        messages={{ dragToReorder: "Drag to reorder" }}
        getTotalMessage={(total) => `${total} tracks`}
      />
      <p>
        Current order: {tracks.map((t) => t.title).join(", ")}
      </p>
    </div>
  );
}
