import { Component } from 'react';

import './charList.scss';

import MarvelService from '../../service/MarvelService';
import Spinner from '../spinner/Spinner';

class CharList extends Component {
    state = {
        charList: [],
        error: false,
        loading: true,
        offset: 0
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.charListLoading();
        this.marvelService.getCharacters(offset)
            .then(this.charListLoaded)
            .catch(this.charListError)
    }

    charListLoading = () => {
        this.setState({
            loading: true,
            error: false
        })
    }

    charListError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    charListLoaded = (newCharList) => {
        this.setState(({ offset, charList }) => ({
            charList: [...charList, ...newCharList],
            error: false,
            loading: false,
            offset: offset + 9
        }))
    }

    renderCharItem(items) {
        const item = items.map((item) => {
            const { name, thumbnail, id } = item;

            const { charItemID } = this.props;

            let charList_item_style = 'char__item';
            if (charItemID === id) {
                charList_item_style = 'char__item_selected'
            }

            return (
                <li className={charList_item_style} key={id} onClick={() => this.props.changeCharItemInfoID(id)}>
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

    render() {
        const { charList, loading, error, offset } = this.state;
        const content = this.renderCharItem(charList);
        const spinnner = loading ? <Spinner /> : null;
        const errorMessage = error ? <h3>Виникла якась помилка, перезагрузіть сторінку</h3> : null;

        return (
            <div className="char__list" >
                {errorMessage}
                {content}
                {spinnner}
                <button className="button button__main button__long" onClick={() => this.onRequest(offset)}>
                    <div className="inner">загрузиити більше персонажів</div>
                </button>
            </div>
        )
    }
}


export default CharList;