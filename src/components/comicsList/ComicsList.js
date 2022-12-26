/* eslint-disable react-hooks/exhaustive-deps */
import './comicsList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../service/MarvelService';
import Spinner from '../spinner/Spinner';

const ComicsList = () => {
    const { loading, error, getCommics } = useMarvelService();

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        getCommics(offset)
            .then(comicsListLoaded)
    }

    const comicsListLoaded = (newComicsList) => {
        setComicsList([...comicsList, ...newComicsList]);
        setOffset(offset => offset + 8);
    }

    const comicsItem = (arr) => {
        const item = arr.map((item) => {
            const { name, thumbnail, price, id } = item;
            let classNames = 'comics__item-img';
            if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                classNames = 'comics__item-noimg'
            }
            return (
                <li className="comics__item" key={id}>
                    <a href="dd">
                        <img src={thumbnail} alt="ultimate war" className={classNames} />
                        <div className="comics__item-name">{name}</div>
                        <div className="comics__item-price">{price}</div>
                    </a>
                </li>
            )

        })
        return (
            <ul className="comics__grid">
                {item}
            </ul>
        )
    }

    const content = comicsItem(comicsList);
    const spinnner = loading ? <Spinner /> : null;
    const errorMessage = error ? <h3>Виникла якась помилка, перезагрузіть сторінку</h3> : null;
    return (
        <div className="comics__list">
            {content}
            {spinnner}
            {errorMessage}
            <button className="button button__main button__long">
                <div className="inner" onClick={() => onRequest(offset)}>load more</div>
            </button>
        </div>
    )
}

export default ComicsList;