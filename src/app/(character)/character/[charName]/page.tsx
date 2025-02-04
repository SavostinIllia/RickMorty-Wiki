import { Character } from "@/@types/Character";
import CharacterProfile from "@/components/CharacterProfile/CharacterProfile";
import { getSingleCharacter } from "@/lib/get/getRickAndMorty";
import { notFound } from "next/navigation";


export default async function CharacterPage({
  searchParams
}: {
  searchParams: Promise<{id : string}>
}) {
  
  const {id} = await searchParams

  if (!id) {  
    notFound(); 
  }

  try {
    const character: Character = await getSingleCharacter(id);
    if (!character) {
      notFound();
    }

    return <CharacterProfile {...character} />;
  } catch (err) {
    console.log(err)
    notFound();
  }
}



