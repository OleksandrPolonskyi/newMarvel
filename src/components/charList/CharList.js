/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */

import { useState, useEffect } from 'react';

import MarvelService from '../../service/MarvelService';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);

    const marvelService = new MarvelService();

    //Запускається після того як уже все відрендерелось, тому може визиватись самого верху
    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        charListLoading();
        marvelService.getCharacters(offset)
            .then(charListLoaded)
            .catch(charListError)
    }

    const charListLoading = () => {
        setError(false)
        setLoading(loading => true)
    }

    const charListError = () => {
        setError(true)
        setLoading(loading => false)
    }

    const charListLoaded = (newCharList) => {
        setCharList(charList => [...charList, ...newCharList])
        setError(false)
        setLoading(loading => false)
        setOffset(offset => offset + 9)
    }

    const renderCharItem = (arr) => {
        const item = arr.map((item) => {
            const { name, thumbnail, id } = item;
            let charList_item_style = 'char__item';
            if (props.charItemID === id) {
                charList_item_style = 'char__item_selected'
            }
            return (
                <li className={charList_item_style} key={id} onClick={() => props.changeCharItemInfoID(id)}>
                    <img src={thumbnail} alt={name} />
                    <div className="char__name">{name}</div>
                </li>
            )
        })
        return (
            <ul className="char__grid">
                {item}
            </ul>
        )
    }


    const content = renderCharItem(charList);
    const spinnner = loading ? <Spinner /> : null;
    const errorMessage = error ? <h3>Виникла якась помилка, перезагрузіть сторінку</h3> : null;
    return (
        <div className="char__list" >
            {errorMessage}
            {content}
            {spinnner}
            <button className="button button__main button__long" onClick={() => onRequest(offset)}>
                <div className="inner">загрузиити більше персонажів</div>
            </button>
        </div>
    )

}

export default CharList;