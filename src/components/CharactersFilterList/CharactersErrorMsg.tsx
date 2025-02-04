import pickle from '@/static/pickle.png'
import Image from 'next/image';

export default function CharactersErrorMsg({title, filters} : {title: string, filters?: string}) {
    return (
        <div className="bg-primaryGrey text-red-400 p-4 rounded-lg shadow-md flex flex-col items-center w-full justify-center">
          <p className="font-bold text-4xl">{title || ''}</p>
          <p className='ricks-text nh text-2xl'>{filters || ''}</p>
          <Image src={pickle} width={50} height={20} alt="404"/>
        </div>
    )
}
