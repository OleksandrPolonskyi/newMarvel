import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _baseURL = 'https://gateway.marvel.com:443/v1/public/';
    const _baseAPI_KEY = 'apikey=5ea2353f622e4acf2092e82961db2dba';

    const getCharacter = async (id) => {
        const res = await request(`${_baseURL}characters/${id}?${_baseAPI_KEY}`);
        return _charTransformation(res.data.results[0]);
    }

    const getCharacters = async (offset) => {
        const res = await request(`${_baseURL}characters?limit=9&offset=${offset}&${_baseAPI_KEY}`);
        return res.data.results.map(_charTransformation)
    }

    const _charTransformation = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description.slice(0, 200) : 'No description',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return { loading, error, getCharacter, getCharacters, clearError }
}

export default useMarvelService