'use client';

import { Episode } from '@/@types/Episode';
import Portal from '@/components/Portal/Portal';
import {  URL_PATHS } from '@/lib/get/getRickAndMorty';
import { swrEpisodeFetcher } from '@/lib/utils/swrFetcher';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import pickle from '@/static/pickle.png'

interface CharacterEpisodesProps {
    episodeId: string | string[];
    showIndex?: boolean;
    className?: string;
}

function CharacterEpisodes ({ episodeId, showIndex, className } : CharacterEpisodesProps) {
    
    const { data: episodeList = [], error, isLoading } = useSWR<Episode[] | Episode>(episodeId, swrEpisodeFetcher, {
        revalidateOnFocus: false,
        shouldRetryOnError: false
    });

    if (isLoading) return <Portal mode='small' />;

   const normalizedEpisodes = Array.isArray(episodeList) ? episodeList : [episodeList];

    return (
        <ul>
            {normalizedEpisodes.map((episode, i) => (
                <li key={episode.id }>
                    <Link href={`/${URL_PATHS.episode}${episode.id}`} className={className}>
                        {showIndex && `${i + 1}.`} {episode.name}
                    </Link>
                </li>
            ))}
            {error &&
             <li>
                <p className='flex text-primaryRed '><Image src={pickle} width={20} height={10} alt="pickle error" className='mr-1'/> Error in loading episode... </p>
            </li>
            }
        </ul>
    );
};

export default CharacterEpisodes;
