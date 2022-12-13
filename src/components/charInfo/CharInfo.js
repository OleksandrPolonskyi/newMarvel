import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../service/MarvelService';
import Spinner from '../spinner/Spinner';

class CharInfo extends Component {
    state = {
        char: {},
        error: false,
        loading: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharInfo();
    }

    componentDidUpdate(prevProp) {
        if (this.props.charID !== prevProp.charID) {
            this.updateCharInfo();
        }
    }

    updateCharInfo = () => {
        const { charID } = this.props;
        if (!charID) {
            return;
        }
        this.newCharInfoLodading();
        this.marvelService
            .getCharacter(charID)
            .then(this.newCharInfoLodaded)
            .catch(this.newCharInfoError)
    }

    newCharInfoLodading = () => {
        this.setState({
            loading: true,
            error: false
        })
    }

    newCharInfoError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    newCharInfoLodaded = (char) => {
        this.setState({
            char,
            error: false,
            loading: false
        })
    }

    render() {
        const { char, error, loading } = this.state;
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