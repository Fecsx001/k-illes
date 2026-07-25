import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import translations from './text.json';
import './Header.css';

const languageOptions = {
    hu: { flag: '🇭🇺', label: 'Magyar' },
    en: { flag: '🇬🇧', label: 'English' }
};

export default function Header({ language = 'hu', onLanguageChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [booksOpen, setBooksOpen] = useState(false);
    const drawerRef = useRef(null);
    const buttonRef = useRef(null);

    const safeLanguage = translations[language] ? language : 'hu';
    const text = useMemo(() => translations[safeLanguage], [safeLanguage]);
    const nextLanguage = safeLanguage === 'hu' ? 'en' : 'hu';
    const nextLanguageOption = languageOptions[nextLanguage];

    const toggleMenu = () => setIsOpen((open) => !open);
    const closeMenu = () => {
        setIsOpen(false);
        setBooksOpen(false);
    }

    // Close menu when clicking outside of the drawer or the menu button
    useEffect(() => {
        function onDocClick(e) {
            if (!isOpen) return;
            const drawer = drawerRef.current;
            const button = buttonRef.current;
            if (drawer && !drawer.contains(e.target) && button && !button.contains(e.target)) {
                setIsOpen(false);
                setBooksOpen(false);
            }
        }
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [isOpen]);

    const switchLanguage = () => {
        if (onLanguageChange) {
            onLanguageChange(nextLanguage);
        }
    };

    return (
        <header className="header">
            <Link className="header__title" to="/" onClick={closeMenu}>{text.title}</Link>
            <button
                type="button"
                ref={buttonRef}
                className={`header__menuButton${isOpen ? ' is-open' : ''}`}
                aria-label={isOpen ? 'Close menu' : text.menuAria}
                aria-expanded={isOpen}
                aria-controls="header-drawer"
                onClick={toggleMenu}
            >
                <span className="header__bar" />
                <span className="header__bar" />
                <span className="header__bar" />
            </button>

            <div
                className={`header__backdrop${isOpen ? ' is-open' : ''}`}
                aria-hidden="true"
                onClick={closeMenu}
            />

            <nav ref={drawerRef} id="header-drawer" className={`header__drawer${isOpen ? ' is-open' : ''}`} aria-label="Main menu">
                <div className="header__links">
                    <Link to="/" onClick={closeMenu}>{text.home}</Link>

                    <Link to="/about" onClick={closeMenu}>{text.about}</Link>

                    <div className="header__menuItem">
                        <div className="header__menuMain">
                            <Link
                                to="/books"
                                onClick={(e) => {
                                    if (!booksOpen) {
                                        // open submenu instead of navigating on first click
                                        e.preventDefault();
                                        setBooksOpen(true);
                                    } else {
                                        // allow navigation to landing page, menu will close
                                        closeMenu();
                                    }
                                }}
                            >{text.works}</Link>

                            <button
                                type="button"
                                className={`header__submenuToggle${booksOpen ? ' is-open' : ''}`}
                                aria-expanded={booksOpen}
                                onClick={() => setBooksOpen((v) => !v)}
                            >
                                ▾
                            </button>
                        </div>

                        {booksOpen && (
                            <div className="header__sublist">
                                <Link to="/books/book1" onClick={closeMenu}>Book 1</Link>
                                <Link to="/books/book2" onClick={closeMenu}>Book 2</Link>
                                <Link to="/books/book3" onClick={closeMenu}>Book 3</Link>
                            </div>
                        )}
                    </div>
                    <Link to="/contact" onClick={closeMenu}>{text.contact}</Link>
                </div>

                <div className="header__language">
                    <button
                        type="button"
                        onClick={switchLanguage}
                        aria-label={nextLanguageOption.label}
                        title={nextLanguageOption.label}
                    >
                        <span aria-hidden="true">{nextLanguageOption.flag}</span>
                    </button>
                </div>
            </nav>
        </header>
    );
}