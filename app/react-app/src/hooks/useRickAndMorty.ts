import { useEffect, useState } from "react";
import { rickAndMortyApi } from "../api/rickAndMorty/rickAndMortyApi";
import { useSearchParams } from 'react-router-dom';
import Character from "../types/api/rickAndMorty/Character";

export const useRickAndMorty = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [characters, setCharacters] = useState<Character[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const currentPage = Number(searchParams.get('page')) || 1;
  
    useEffect(() => {
      const fetchCharacters = async () => {
        try {
          setLoading(true)
          await delay(1000)
          const response = await rickAndMortyApi.getCharactersByPage(currentPage);
          setCharacters(response.results);
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
          setLoading(false);
        }
      };
  
      fetchCharacters();
    }, [currentPage]); // currentPageが変更されたら再フェッチ

    const setPage = (page: number) => {
        setSearchParams({ page: page.toString() });
    };

    return { characters, loading, error, currentPage, setPage };
  };

  function delay(ms: number): Promise<void> {
    return new Promise<void>(resolve =>
        setTimeout(resolve, ms)
    )
  }