import Typography from '@/components/Typography/Typography'
import CharacterEpisodes from '@/components/CharacterList/CharacterEpisodes/CharacterEpisodes'
import { Character } from '@/@types/Character'
import { URL_PATHS } from '@/lib/get/getRickAndMorty'
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.scss'


function CharacterCard ({name, id, status,  gender,  image, location, episode, species} : Character ) {
  
  return (

    <article className={`${styles['character-card']} flex h-full `}>

        <div className='relative w-full flex-1 max-w-56'>
         <Image fill src={image} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt={name} loading='lazy'/>
        </div>

        <div className='char-information flex-1 p-4 flex flex-wrap flex-col text-left gap-3'>
          <div>
            <Link className="ricks-text" href={{
                  pathname: `/${URL_PATHS.character}${decodeURIComponent(name)}/`,
                  query: { id },
            }}>
              <Typography tag='h2' className='inline-block'> {name} </Typography >
            </Link>
            <Typography tag='span' className='flex items-center text-lg'> 
              <span className={`rounded mr-2 ${styles.indicator} ${styles[status.toLowerCase()]}`}>&nbsp;</span> 
              <span className={`rounded mr-2 ${styles[status.toLowerCase()]}`}>{status}</span> - {gender} - {species}
            </Typography >
          </div>

          <div>
            <Typography tag='p' className='flex items-center text-secoundaryGrey font-bold'>Last known location:</Typography >
            <Typography tag='p' className='flex items-center text-lg'>{location.name}</Typography >
          </div>

          <div className='h-12'>
            <Typography tag='p' className='flex items-center text-secoundaryGrey font-bold'>First seen in:</Typography >
            <CharacterEpisodes episodeId={episode[0]} className=' text-2xl mortys-text' />
          </div>
      </div>
    
    </article>
    
  )
}

export default CharacterCard