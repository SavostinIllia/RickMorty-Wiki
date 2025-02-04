'use client';

import { BASE_URL, URL_PATHS } from '@/lib/get/getRickAndMorty';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useSWR from 'swr';
import { swrFetcher } from '@/lib/utils/swrFetcher';
import CharacterCard from '@/components/CharacterList/CharacterCard/CharacterCard';
import { Character } from '@/@types/Character';
import Portal from '../Portal/Portal';
import CharactersErrorMsg from './CharactersErrorMsg';



export default function CharactersFilterList({
  initialCharacters,
  queryFilter,
}: {
  initialCharacters: Character[] | [];
  queryFilter: Record<string, string> | string;
}) {


  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    threshold: 1,
    rootMargin: '-60px 0px'
  });

  const parsedQueryFilter = JSON.parse(queryFilter as string);
  const queryString = new URLSearchParams(parsedQueryFilter).toString();
  const swrKey = `${BASE_URL}${URL_PATHS.character}?page=${page}&${queryString}`;

  const { data, error } = useSWR(swrKey, swrFetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnMount: false,
    fallbackData: page === 1 ? { results: initialCharacters } : undefined,
    shouldRetryOnError: false,
    onError: (err) => {
      if (err.status === 404) {
        setHasMore(false);
      }
    }
  });

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    if (queryFilter) {
      setCharacters([]);
    }
  }, [queryFilter]);

  useEffect(() => {
    if (data?.results) {
      setCharacters(prev => {

        if (page === 1) return data.results;

        return [...prev, ...data.results];
      });
      setHasMore(data.info?.next !== null);
    }
  }, [data, page]);

  useEffect(() => {
    if (inView && !error && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [inView, error, hasMore]);


  if(!initialCharacters || initialCharacters.length === 0) {
    const filters = Object.entries(parsedQueryFilter).map(([key, value]) => `${key}-${value}`).join(' ');

    return (
      <div className='w-auto flex flex-1 items-center justify-center'>
        <CharactersErrorMsg title={`No characters with selected filters: `} filters={filters} />
      </div>
      )
  }
  
  return (
    <div className="flex flex-wrap flex-1 justify-center items-center ">
      <ul className="container flex flex-wrap gap-5">
        {characters.map((character) => (
          <li
            key={character.id}
            className="flex-1 min-w-[25%] min-h-[220px] text-white text-center rounded-lg overflow-hidden self-stretch"
          >
            <CharacterCard {...character} />
          </li>
        ))}
      </ul>
      <div ref={ref} className="w-full container px-4 text-center h-96 mt-12 ">
        {error 
        ? 
          <div className='w-full flex justify-center items-center'>
            <CharactersErrorMsg title={"That's all the characters"} />
          </div>
        : hasMore ? 
          inView ? (
            <Portal mode="big" />
          ) : (
            <p className="text-gray-500 text-lg animate-bounce">
              Scroll down to load more... <Portal mode="small" />
            </p>
          )
         : <CharactersErrorMsg  title={'No more '} filters={parsedQueryFilter['name']}  />}
      </div>
    </div>
  );
}