import { useState } from "react";
import CharInfo from "../charInfo/CharInfo";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList"

export const MainPage = () => {
    const [selectedChar, setChar] = useState(1011334);
    const changeCharItemInfoID = (id) => {
        setChar(id);
    }
    return (
        <>
            <RandomChar />
            <div className="char__content">
                <CharList charItemID={selectedChar} changeCharItemInfoID={changeCharItemInfoID} />
                <CharInfo charID={selectedChar} />
            </div>
        </>
    )
}