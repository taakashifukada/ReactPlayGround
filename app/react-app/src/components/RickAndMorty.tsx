// src/components/UserList.tsx
import React from "react";
import { useRickAndMorty } from "../hooks/useRickAndMorty";
import { resolve } from "path";

export const RickAndMortyList: React.FC = () => {
  const { characters, loading, error, currentPage, setPage } =
    useRickAndMorty();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>ユーザー一覧</h1>
      <ul>
        {characters?.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>

      {/* ページネーションUI */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          前へ
        </button>

        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage >= 42}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          次へ
        </button>
      </div>
    </div>
  );
};
