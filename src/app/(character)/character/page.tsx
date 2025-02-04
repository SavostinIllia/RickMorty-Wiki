import { getCharacters } from "@/lib/get/getRickAndMorty";
import CharactersFilterList from "@/components/CharactersFilterList/CharactersFilterList";
import Filter from "@/components/Filter/Filter";
import { Character } from "@/@types/Character";
import { RickMortyResponse } from "@/@types/RickMortyResponse";

interface CharactersPageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function CharactersPage({ searchParams }: CharactersPageProps) {

  let characters : Character[] = [];
  const queryFilter = await searchParams || {}; 

  try{
    const response = await getCharacters({ page: 1, ...queryFilter }) as RickMortyResponse<Character>;
    characters = response?.results ?? [];
  }catch(err) {
    console.log('err', err)
  }

  
  return (
    <div className="flex flex-wrap container-xl px-5 gap-5">
      <Filter />
      <CharactersFilterList initialCharacters={characters} queryFilter={JSON.stringify(queryFilter)} />
    </div>
  );
}
