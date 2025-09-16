import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import FragranceLogoGeo from "./Svgs/FragranceLogoGeo";
import SearchIcon from "./Svgs/SearchIcon";
import HeartIcon from "./Svgs/HeartIcon";
import ShoppingBagIcon from "./Svgs/ShoppingBagIcon";
import UserIcon from "./Svgs/UserIcon";
import Socials from "../Socials/Socials";
import LanguageChanger from "../LanguageChanger/LanguageChanger";
import CurrencySelector from "../CurrencySelector/CurrencySelector";
import PromotionalBanner from "../PromotionalBanner/PromotionalBanner";
import "./Header.scss";
import Navigation from "./Navigaton/Navigation";

const Header = () => {
  const { language } = useParams();
  
  // Mock data for demonstration - in real app this would come from state management
  const [wishlistCount] = useState(3);
  const [cartCount] = useState(1);
  
  const text = {
    ge: {
      title: "იპკურე",
      tagline: "ღია სუნამოების სამყარო",
      searchPlaceholder: "სუნამოების ძებნა...",
      wishlist: "სურვილების სია",
      cart: "კალათა",
      account: "ანგარიში",
      // Enhanced fragrance-specific terms
      fragranceNotes: "სუნამოს ნოტები",
      topNotes: "ზედა ნოტები",
      middleNotes: "გულის ნოტები",
      baseNotes: "ბაზისური ნოტები",
      sillage: "შელახვა",
      longevity: "ხანგრძლივობა",
      projection: "ანაბეჭდი",
      concentration: "კონცენტრაცია",
      luxury: "ლუქსი",
      niche: "ნიშური",
      designer: "დიზაინერი",
      unisex: "უნისექს",
      seasonal: "სეზონური",
      signature: "ხელმოწერა",
      artisanal: "ხელნაკეთი",
      exclusive: "ექსკლუზიური",
    },

    en: {
      title: "Ipkure",
      tagline: "Discover Your Signature Scent",
      searchPlaceholder: "Search fragrances...",
      wishlist: "Wishlist",
      cart: "Cart",
      account: "Account",
      // Enhanced fragrance-specific terms
      fragranceNotes: "Fragrance Notes",
      topNotes: "Top Notes",
      middleNotes: "Heart Notes", 
      baseNotes: "Base Notes",
      sillage: "Sillage",
      longevity: "Longevity",
      projection: "Projection",
      concentration: "Concentration",
      luxury: "Luxury",
      niche: "Niche",
      designer: "Designer",
      unisex: "Unisex",
      seasonal: "Seasonal",
      signature: "Signature",
      artisanal: "Artisanal",
      exclusive: "Exclusive",
    },
  };

  return (
    <>
      <PromotionalBanner />
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
            <div className="user-actions">
              <button className="action-btn wishlist-btn" title={text[language].wishlist}>
                <HeartIcon size={18} />
                {wishlistCount > 0 && <span className="count-badge">{wishlistCount}</span>}
              </button>
              
              <button className="action-btn cart-btn" title={text[language].cart}>
                <ShoppingBagIcon size={18} />
                {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
              </button>
              
              <button className="action-btn account-btn" title={text[language].account}>
                <UserIcon size={18} />
              </button>
            </div>
            
            <div className="locale-section">
              <Socials />
              <LanguageChanger />
              <CurrencySelector />
            </div>
          </div>
        </div>
        <Navigation />
      </header>
    </>
  );
};

export default Header;
