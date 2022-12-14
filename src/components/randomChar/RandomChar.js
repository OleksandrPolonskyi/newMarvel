/* eslint-disable react-hooks/exhaustive-deps */
import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../service/MarvelService';
import Spinner from '../spinner/Spinner';

import { useState, useEffect } from 'react';

const RandomChar = () => {
    const [char, setChar] = useState({});
    const { loading, error, getCharacter } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, []);

    const updateChar = () => {
        let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const errorMessage = error ? 'Some Error' : null;
    const spinner = loading ? <Spin /> : null;
    const content = !(error || loading) ? <View char={char} /> : null

    return (
        <div className="randomchar">
            <div className="randomchar__block">
                {spinner}
                {content}
                {errorMessage}
            </div>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const Spin = () => {
    return (
        <div className="spinner">
            <Spinner />
        </div>
    )
}

const View = ({ char }) => {
    const { name, thumbnail, description, homepage, wiki } = char;
    return (
        <>
            <img src={thumbnail} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default RandomChar;