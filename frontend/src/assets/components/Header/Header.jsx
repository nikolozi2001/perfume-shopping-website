import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FragranceLogoGeo from "./Svgs/FragranceLogoGeo";
import Socials from "../Socials/Socials";
import LanguageChanger from "../LanguageChanger/LanguageChanger";
import "./Header.scss";
import Navigation from "./Navigaton/Navigation";

const Header = () => {
  const { language } = useParams();
  const text = {
    ge: {
      title: "იპკურე",
    },

    en: {
      title: "Ipkure",
    },
  };

  const isEnglish = language === "en";

  return (
    <>
      <header>
        <div className="header-container">
          <div className="right">
            <Link to={`/${language}`}>
              {!isEnglish ? <FragranceLogoGeo /> : <FragranceLogoGeo />}
            </Link>

            {isEnglish ? (
              <h1>{text[language].title}</h1>
            ) : (
              <h1>{text[language].title}</h1>
            )}
          </div>
          <div className="left">
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
