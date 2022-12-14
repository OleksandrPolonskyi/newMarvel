import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { useState } from "react";


const App = () => {

    const [selectedChar, setChar] = useState(1011334);

    const changeCharItemInfoID = (id) => {
        setChar(id);
    }

    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar />
                <div className="char__content">
                    <CharList charItemID={selectedChar} changeCharItemInfoID={changeCharItemInfoID} />
                    <CharInfo charID={selectedChar} />
                </div>
            </main>
        </div>
    )
}

export default App;