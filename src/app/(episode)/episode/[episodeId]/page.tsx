import CharacterList from '@/components/CharacterList/CharacterList';
import Typography from '@/components/Typography/Typography';
import { getEpisode, URL_PATHS } from '@/lib/get/getRickAndMorty';


export default async function EpisodeInformationPage({
  params
}: {
  params: Promise<{episodeId : string}>
}) {

  const { episodeId } = await params; 
  
  const episodeInformation = await getEpisode(episodeId);
  
  const charactersInEpisodeId = episodeInformation.characters.map(char => 
    char.split(URL_PATHS.character)[1]
  );


  return (
    <div className='container-xl mx-auto px-4'>

      <div className='mb-5 px-4'>
        <Typography tag='h1' >Episode name: <span className='text-primaryTeal font-bold'>{episodeInformation.name}</span></Typography>
        <Typography tag='h2' > Сharacters in episode: <span className='text-primaryTeal font-bold'>{charactersInEpisodeId.length}</span></Typography>
        <Typography tag='h2' > Episode: <span className='text-primaryTeal font-bold'>{episodeInformation.episode}</span></Typography>
      </div>

      <CharacterList randompage={false} charId={charactersInEpisodeId} />

    </div>
  );
}
