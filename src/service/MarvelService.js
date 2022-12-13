import { Component } from "react";

class MarvelService extends Component {
    _baseURL = 'https://gateway.marvel.com:443/v1/public/';
    _baseAPI_KEY = 'apikey=5ea2353f622e4acf2092e82961db2dba';
    _offset_ID = 0;

    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }
        return await res.json();
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._baseURL}characters/${id}?${this._baseAPI_KEY}`);
        return this._charTransformation(res.data.results[0]);
    }

    getCharacters = async (offset = this._offset_ID) => {
        const res = await this.getResource(`${this._baseURL}characters?limit=9&offset=${offset}&${this._baseAPI_KEY}`);
        return res.data.results.map(this._charTransformation)
    }

    _charTransformation = (char) => {
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
}

export default MarvelService