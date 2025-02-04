
import { getEpisode } from "../get/getRickAndMorty";

export const swrFetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error(`HTTP error! status: ${response.status}`);
    throw error;
  }
  
  return response.json(); 
};

export const swrEpisodeFetcher = async (episodeId: string | string[]) => {
  const episodeKey = Array.isArray(episodeId)
      ? episodeId.join(',')
      : episodeId.split('/episode/')[1] || episodeId;
  return getEpisode(episodeKey);
};
