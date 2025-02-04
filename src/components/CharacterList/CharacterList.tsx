import CharacterCard from './CharacterCard/CharacterCard';
import { getCharacters } from '@/lib/get/getRickAndMorty';
import { randomPage } from '@/lib/utils/randomPage';
import { Character } from '@/@types/Character';
import { notFound } from 'next/navigation';
import SkeletonList from '../SkeletonLoader/SkeletonLoader';
import Image from 'next/image';
import pickle from '@/static/pickle.png'
import { RickMortyResponse } from '@/@types/RickMortyResponse';


interface CharacterListProps {
  className?: string,
  randompage: boolean,
  charId? : string | string[],
  page?: string;
}

async function CharacterList ({ randompage, charId }:CharacterListProps) {
 
  let characters: Character[] = [];

  try {
    if (randompage) {
      const data = await getCharacters({ page: randomPage() }) as RickMortyResponse<Character>;
      characters = data?.results ? data.results.slice(0, 6) : [];
    }
    if (charId) {
      const data  = await getCharacters({ charId });
      characters = Array.isArray(data) ? data : []
    }
  } catch (err) {
    console.log('err', err)
    return (
      <>
        <p className='flex text-primaryRed w-full text-center flex-1 justify-center items-center mb-3'><Image src={pickle} width={20} height={10} alt="pickle error" className='mr-1'/> Error in loading episode... </p>
        <SkeletonList items={6}/>
      </>
    )
  }

 if (characters.length === 0) notFound();

  return (
    <ul className='container-2xl mx-auto px-4 flex flex-wrap gap-5'>
      {characters.map((char: Character) => (
        <li key={char.id} className='flex-1 min-w-[25%] min-h-[220px] text-white  text-center rounded-lg overflow-hidden self-stretch'>
          <CharacterCard {...char} />
        </li>
      ))}
    </ul>
  );
};

export default CharacterList;
