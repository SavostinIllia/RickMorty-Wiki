import Typography from '@/components/Typography/Typography'
import Image from 'next/image'
import { Character } from '@/@types/Character'
import CharacterEpisodes from '../CharacterList/CharacterEpisodes/CharacterEpisodes'
import { Suspense } from 'react'
import Portal from '../Portal/Portal'
import styles from './styles.module.scss'

function CharacterProfile (character : Character) {

  const currentCharacterEpisodeId = character.episode.map( ep =>  ep.split('/episode/')[1])

  const characterDetails = [
    { label: 'Species', value: character?.species },
    { label: 'Gender', value: character?.gender },
    { label: 'Status', value: character?.status, className: `${(character?.status).toLocaleLowerCase()}` },
    { label: 'Type', value: character?.type },
    { label: 'Origin', value: character?.origin?.name },
    { label: 'Location', value: character?.location?.name },
  ];

  return (
    <main className={`${styles['character-profile']} container mx-auto flex justify-center gap-7 items-start`}>

      <aside className='w-1/5 border-2 border-primaryGrey text-center  rounded-md overflow-hidden'>
          
          <Typography tag='h1' className='title p-2 bg-primaryTeal ' >
            {character.name}
          </Typography>
          
          <div className='relative w-full min-h-[300px]'>
            <Image src={character.image} fill alt={character.name}/>
          </div>

          <div>
          {characterDetails.map(({ label, value, className }) => (
            value && 
            <Typography
              key={label}
              tag="p"
              className={`p-2 flex justify-between border-b-2 border-background items-center text-right font-bold text-xl last:border-b-0 gap-3 bg-primaryGrey`}
            >
              <span className='min-w-[100px] font-thin text-left'>{label}:</span> 
              <span className={ className ? styles[className] : ''} >{value}</span>
            </Typography>
          ))}
          </div>

          <Suspense  fallback={<Portal mode='small' className='w-5'/>}>
            <Typography className={` ${styles['episode-link']} min-w-28 p-2 flex justify-between border-y-2 border-background  items-center text-right font-bold text-xl gap-3 bg-primaryGrey`}>
              <span className='min-w-[100px] font-thin text-left'>First seen in:</span> <CharacterEpisodes episodeId={character.episode[0]} className='ricks-text'/>
            </Typography>
            <Typography className={` ${styles['episode-link']} min-w-28 p-2 flex justify-between items-center  border-background  text-right font-bold text-xl gap-3 bg-primaryGrey `}>
              <span className='min-w-[100px] font-thin text-left'>Last seen in:</span> <CharacterEpisodes episodeId={character.episode[character.episode.length - 1]} className='ricks-text'/>
            </Typography>
          </Suspense>

      </aside>

      <aside className='w-1/5 border-2 border-primaryGrey text-center  rounded-md overflow-hidden'>
          <Typography tag='h2' className={`title p-2 bg-primaryTeal title`} >
            Episodes
          </Typography>
          <Suspense  fallback={<Portal mode='small' className='w-5'/>}>
          <div className={`${ styles['episodes-list']} ${styles['episode-link']} text-left`}>
            <CharacterEpisodes episodeId={currentCharacterEpisodeId} showIndex={true} className='ricks-text'/>
          </div>
          </Suspense>
      </aside>
    </main>
   
  )
}

export default CharacterProfile