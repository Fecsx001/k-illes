import { Link } from 'react-router-dom';
import './OptionButton.css';

export default function OptionButton({ content, link }) {
    return link ? (
        <Link className="option-button" to={link}>
            {content}
        </Link>
    ) : (
        <button type="button" className="option-button">
            {content}
        </button>
    );
}