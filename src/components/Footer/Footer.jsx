import translations from './text.json';
import './Footer.css';


export default function Footer ({ language }) {
    const content = translations[language] ?? translations.hu;

    return (
        <footer className="footer-container">
            <div className="footer-texts-left">
                <span className="footer-text">{content['copyright']}</span>
                <span className="footer-text">{content['translation']}</span>
            </div>
            <div className="footer-texts-right">
                <span className="footer-text" dangerouslySetInnerHTML={{ __html: content['webpage'] }} />
            </div>
        </footer>
    )
}