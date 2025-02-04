import CharacterList from "@/components/CharacterList/CharacterList";
import SkeletonList from "@/components/SkeletonLoader/SkeletonLoader";
import { Suspense } from "react";


 function RickMortyHeroPage (){

  return (
    <div>
      <Suspense fallback={<SkeletonList items={6}/>}>
          <CharacterList randompage={true}/>
      </Suspense>
    </div>
  );
}


export default RickMortyHeroPage