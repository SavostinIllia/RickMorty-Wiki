import { Character } from "@/@types/Character";
import { Episode } from "@/@types/Episode";
import { RickMortyResponse } from "@/@types/RickMortyResponse";

export interface GetCharactersParams {
    charId?: string | string[];
    page?: number;
    status?: string;
    gender?: string;
    species? : string;
    name? : string
}

export const BASE_URL = 'https://rickandmortyapi.com/api/';

export const URL_PATHS = {
    character: 'character/',
    episode: 'episode/',
    location: 'location/'
};

async function getFromMortyApi<T>(path: string): Promise<T> {
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    try {
        const response = await fetch(`${BASE_URL}${path}`);
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json()
        return data;
    } catch (err) {
        throw new Error(`An error occurred while fetching data: ${(err as Error).message}`);
    }
}

export async function getCharacters(params: GetCharactersParams) :Promise<RickMortyResponse<Character> | Character[]>  {
    const { page, charId, status, gender, species, name } = params;

    let path = URL_PATHS.character;

    if (charId) {
        path += `${charId}`;
        return await getFromMortyApi(path); 
    } else {
        const queryParams = new URLSearchParams();

        if (page) queryParams.set('page', page.toString());
        if (status) queryParams.set('status', status);
        if (gender) queryParams.set('gender', gender);
        if (species) queryParams.set('species', species);
        if (name) queryParams.set('name', name);

        const queryString = queryParams.toString();
        if (queryString) {
            path += `?${queryString}`;
        }
    }

    return await getFromMortyApi(path); 
}

export async function getSingleCharacter(charId: string) : Promise<Character> {
    const path = `${URL_PATHS.character}${charId}`;
    return await getFromMortyApi(path);
}

export async function getEpisodes(page?: number): Promise<RickMortyResponse<Episode>>{
    let path = URL_PATHS.episode;
    if (page) path += `?page=${page}`;
    return await getFromMortyApi(path);
}

export async function getEpisode(episodeId: string[] | string) : Promise<Episode>{
    const path = `${URL_PATHS.episode}${episodeId}`;
    return await getFromMortyApi(path);
}

export async function getLocations(params: GetCharactersParams) :Promise<RickMortyResponse<Location>>{
    const { page } = params;
    let path = URL_PATHS.location;
    if (page) path += `?page=${page}`;
    return await getFromMortyApi(path);
}
