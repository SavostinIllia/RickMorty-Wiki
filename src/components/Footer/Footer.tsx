import { getCharacters, getEpisodes, getLocations, URL_PATHS } from "@/lib/get/getRickAndMorty";
import Typography from "../Typography/Typography";
import Link from "next/link";
import Image from 'next/image';
import pickle from '@/static/pickle.png'
import { RickMortyResponse } from "@/@types/RickMortyResponse";
import { Character } from "@/@types/Character";


async function  Footer () {
  let characters, episodes, locations;
  let fetchError = false;
  try {
    [characters, episodes, locations] = await Promise.all([
      getCharacters({ page: 1 }) as Promise<RickMortyResponse<Character>>,
      getEpisodes(),
      getLocations({ page: 1 }),
    ]);
  } catch (err) {
    console.log('err', err)
    fetchError = true
  }

  return (
    <footer className="my-4 text-center flex items-center justify-center gap-5 w-full absolute bottom-0 left-0">
      <Link href={`/${URL_PATHS.character}`}>
        <Typography tag="p" className="font-bold text-xl ricks-text flex">
        Characters: {characters?.info?.count ?? 'N/A'} {fetchError && <Image src={pickle} width={20} height={10} alt="pickle error" className='mr-1'/>}
        </Typography>
      </Link>
      <Link href={`/${URL_PATHS.episode}`}>
        <Typography tag="p" className="font-bold text-xl ricks-text flex">
          Episodes: {episodes?.info.count ?? 'N/A'} {fetchError && <Image src={pickle} width={20} height={10} alt="pickle error" className='mr-1'/>}
        </Typography>
      </Link>
      <Link href={`/${URL_PATHS.location}`}>
        <Typography tag="p" className="font-bold text-xl ricks-text flex">
          Locations: {locations?.info?.count?? 'N/A'} {fetchError && <Image src={pickle} width={20} height={10} alt="pickle error" className='mr-1'/>}
        </Typography>
      </Link>
    </footer>
  );
};

export default Footer;
