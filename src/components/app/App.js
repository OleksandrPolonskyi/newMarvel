import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

// import decoration from '../../resources/img/vision.png';
import { Component } from "react";

class App extends Component {
    state = {
        charItemInfoID: 1011334
    }
    changeCharItemInfoID = (id) => {
        this.setState({
            charItemInfoID: id
        })
    }
    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList charItemID={this.state.charItemInfoID} changeCharItemInfoID={this.changeCharItemInfoID} />
                        <CharInfo charID={this.state.charItemInfoID} />
                    </div>
                    {/* <img className="bg-decoration" src={decoration} alt="vision" /> */}
                </main>
            </div>
        )
    }
}

export default App;