import { rickAndMortyApiClient } from './rickAndMortyApiClient';
import Response from '../../types/api/rickAndMorty/Response';

export const rickAndMortyApi = {
    
  getCharactersByPage: async (page: number): Promise<Response> => {
    const response = await rickAndMortyApiClient.get<Response>('/character', {
        params: {
            page,
        }
    });
    return response.data;
  },
};