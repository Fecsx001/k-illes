import { useMemo } from 'react';
import bg from '../assets/images/background.svg';
import mainPicture from '../assets/images/illes-krisztina.webp';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import OptionButton from '../components/Buttons/OptionButton.jsx';
import text from './contents/home.json';

export default function Home({ language = 'hu', onLanguageChange }) {
    const handleLanguageChange = onLanguageChange ?? (() => {});
    const content = useMemo(() => text[language] ?? text.hu, [language]);

    return (
        <>
            <img id="background" src={bg} alt="Background" />
            <Header language={language} onLanguageChange={handleLanguageChange} />
            <div className="HomeContent">
                <img id="main-picture" src={mainPicture} alt="Dr. Illés Krisztina" />
                <div className="home-title-texts">
                    <span className="title-1">{content['title-text-1']}<br /></span>
                    <span className="title-2">{content['title-text-2']}<br /></span>
                    <span className="title-3">{content['title-text-3']}<br /></span>
                    <span className="title-4">{content['title-text-4']}<br /></span>
                </div>
                <h1 id="home-main-title-text">{content['main-title']}</h1>
                <div id="home-descriptions">
                    <span className="home-description">{content['description-1']}<br /></span>
                    <span className="home-description">{content['description-2']}<br /></span>
                </div>
                <div className="home-buttons">
                    <OptionButton content={content['option-button-1']} link="/about" />
                    <OptionButton content={content['option-button-2']} link="/books" />
                </div>
            </div>
            <Footer language={language} />
        </>
    );
}