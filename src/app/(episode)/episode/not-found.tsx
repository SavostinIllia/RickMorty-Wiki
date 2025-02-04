import Image from "next/image";
import pickle404 from '@/static/pickle.png'
import title404 from '@/static/404title.png'

export default function NotFound() {
  return (
    <div className="container mx-auto text-center ">
      PAGE BUilding in progress
        <div className="relative flex flex-wrap items-center justify-center">
            <div className=" w-[550px] h-[400px] relative" >
                <Image src={title404} fill alt="404 page" className="w-1/3"/>
            </div>
            <div className=" w-[150px] h-[200px] relative">
                <Image src={pickle404} fill alt="404 page" className="w-1/3"/>
            </div>
        </div>
    </div>
  )
}