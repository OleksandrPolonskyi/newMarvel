/* eslint-disable react-hooks/exhaustive-deps */
import './charInfo.scss';
import { useState, useEffect } from 'react';

import MarvelService from '../../service/MarvelService';
import Spinner from '../spinner/Spinner';

const CharInfo = (props) => {
    const [char, setChar] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateCharInfo();
    }, [props.charID])

    const updateCharInfo = () => {
        const { charID } = props;
        if (!charID) {
            return;
        }
        newCharInfoLodading();
        marvelService
            .getCharacter(charID)
            .then(newCharInfoLodaded)
            .catch(newCharInfoError)
    }

    const newCharInfoLodading = () => {
        setError(false)
        setLoading(true)
    }

    const newCharInfoError = () => {
        setError(true)
        setLoading(false)
    }

    const newCharInfoLodaded = (char) => {
        setError(false)
        setLoading(false)
        setChar(char)
    }

    const skeleton = loading ? <Spinner /> : null;
    const errorMessage = error ? <h3>Виникла якась помилка, клікніть на другий елемент</h3> : null;
    const content = !(loading || error) ? <View char={char} /> : null;
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const { name, thumbnail, homepage, wiki, description, comics } = char;
    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics?.map((item, i) => {
                        return (
                            <li className="char__comics-item" key={i}>
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;