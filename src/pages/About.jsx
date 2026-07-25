import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import bg from "../assets/images/background.svg";
import mainPicture from "../assets/images/illes-krisztina.webp";
import {useMemo} from "react";
import text from "./contents/about.json";

export default function About ({language = 'hu', onLanguageChange}) {
    const handleLanguageChange = onLanguageChange ?? (() => {});
    const content = useMemo(() => text[language] ?? text.hu, [language]);
    return <>
        <img id="background" src={bg} alt="Background" />
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <div className="AboutContent">
            <img id="main-picture" src={mainPicture} alt="Dr. Illés Krisztina" />
            <h1 className="AboutHeading">{content['title-1']}</h1>
            <div className="AboutBody">
                <span className="about-content">{content['description-1-1']}<br/></span>
                <span className="about-content">{content['description-1-2']}<br/></span>
            </div>
            <h2 className="AboutTitle2">{content['title-2']}</h2>
            <div className="AboutBody">
                <span className="about-content">{content['description-2-1']}</span>
                <span className="about-content" dangerouslySetInnerHTML={{ __html: content['description-2-2'] }}></span>
                <span className="about-content">{content['description-2-3']}</span>
                <span className="about-content">{content['description-2-4']}</span>
                <span className="about-content">{content['description-2-5']}</span>
            </div>
        </div>
        <Footer />
    </>
}