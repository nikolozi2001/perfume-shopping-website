import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FragranceLogoGeo from "./Svgs/FragranceLogoGeo";
import SearchIcon from "./Svgs/SearchIcon";
import Socials from "../Socials/Socials";
import LanguageChanger from "../LanguageChanger/LanguageChanger";
import "./Header.scss";
import Navigation from "./Navigaton/Navigation";

const Header = () => {
  const { language } = useParams();
  const text = {
    ge: {
      title: "იპკურე",
      tagline: "ღია სუნამოების სამყარო",
      searchPlaceholder: "ძებნა ფრაგრანსების...",
    },

    en: {
      title: "Ipkure",
      tagline: "Discover Your Signature Scent",
      searchPlaceholder: "Search fragrances...",
    },
  };

  return (
    <>
      <header>
        <div className="header-container">
          <div className="brand-section">
            <Link to={`/${language}`} className="logo-link">
              <FragranceLogoGeo />
              <div className="brand-text">
                <h1>{text[language].title}</h1>
                <span className="tagline">{text[language].tagline}</span>
              </div>
            </Link>
          </div>

          <div className="search-section">
            <div className="search-container">
              <SearchIcon className="search-icon" size={18} />
              <input 
                type="search" 
                placeholder={text[language].searchPlaceholder}
                className="fragrance-search"
              />
            </div>
          </div>

          <div className="user-section">
            <div className="socials">
              <Socials />
              <LanguageChanger />
            </div>
          </div>
        </div>
        <Navigation />
      </header>
    </>
  );
};

export default Header;
