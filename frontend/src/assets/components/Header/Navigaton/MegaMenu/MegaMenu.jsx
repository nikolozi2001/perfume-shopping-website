import { useParams, Link } from "react-router-dom";
import "./MegaMenu.scss";

const MegaMenu = ({ section, isVisible, onLinkClick }) => {
  const { language } = useParams();

  // Enhanced fragrance menu data
  const fragranceMenuData = {
    categories: {
      ge: [
        { name: "ქალი", link: "women", description: "ელეგანტური და მომხიბლავი" },
        { name: "კაცი", link: "men", description: "ძლიერი და მისაჩანი" },
        { name: "უნისექს", link: "unisex", description: "ყველასთვის შესაფერისი" },
      ],
      en: [
        { name: "Women", link: "women", description: "Elegant & Captivating" },
        { name: "Men", link: "men", description: "Strong & Distinctive" },
        { name: "Unisex", link: "unisex", description: "Perfect for Everyone" },
      ],
    },
    fragranceNotes: {
      ge: [
        { name: "ჟასმინი", type: "ყვავილოვანი" },
        { name: "ვანილი", type: "ტკბილი" },
        { name: "ცედრუსი", type: "ხეოვანი" },
        { name: "ბერგამოტი", type: "ციტრუსი" },
        { name: "რძე", type: "კრემისფერი" },
        { name: "ამბრა", type: "აღმოსავლური" },
      ],
      en: [
        { name: "Jasmine", type: "Floral" },
        { name: "Vanilla", type: "Sweet" },
        { name: "Cedar", type: "Woody" },
        { name: "Bergamot", type: "Citrus" },
        { name: "Musk", type: "Creamy" },
        { name: "Amber", type: "Oriental" },
      ],
    },
    collections: {
      ge: [
        { name: "გაზაფხულის კოლექცია", season: "spring" },
        { name: "ზაფხულის სიახლეები", season: "summer" },
        { name: "შემოდგომის კლასიკა", season: "autumn" },
        { name: "ზამთრის ლუქსი", season: "winter" },
      ],
      en: [
        { name: "Spring Collection", season: "spring" },
        { name: "Summer Freshness", season: "summer" },
        { name: "Autumn Classics", season: "autumn" },
        { name: "Winter Luxury", season: "winter" },
      ],
    },
    topBrands: [
      "Chanel", "Dior", "Tom Ford", "Creed", "Maison Francis Kurkdjian", "Amouage"
    ],
  };

  if (section.id !== 3) return null; // Only show for fragrance section

  return (
    <div className={`mega-menu ${isVisible ? 'visible' : ''}`}>
      <div className="mega-menu-content">
        {/* Categories Section */}
        <div className="menu-section categories">
          <h3>{language === 'ge' ? 'კატეგორიები' : 'Categories'}</h3>
          <div className="category-grid">
            {fragranceMenuData.categories[language]?.map((category, index) => (
              <Link 
                key={index} 
                to={`/${language}/${section.href}/${category.link}`}
                className="category-card" 
                onClick={onLinkClick}
              >
                <div className="category-name">{category.name}</div>
                <div className="category-description">{category.description}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Fragrance Notes Section */}
        <div className="menu-section fragrance-notes">
          <h3>{language === 'ge' ? 'სუნამოს ნოტები' : 'Fragrance Notes'}</h3>
          <div className="notes-grid">
            {fragranceMenuData.fragranceNotes[language]?.slice(0, 6).map((note, index) => (
              <div key={index} className="note-item">
                <span className="note-name">{note.name}</span>
                <span className="note-type">{note.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Collections */}
        <div className="menu-section collections">
          <h3>{language === 'ge' ? 'სეზონური კოლექციები' : 'Seasonal Collections'}</h3>
          <div className="collections-list">
            {fragranceMenuData.collections[language]?.map((collection, index) => (
              <div key={index} className={`collection-item ${collection.season}`}>
                <span className="collection-name">{collection.name}</span>
                <div className={`season-indicator ${collection.season}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Brands */}
        <div className="menu-section brands">
          <h3>{language === 'ge' ? 'ტოპ ბრენდები' : 'Top Brands'}</h3>
          <div className="brands-grid">
            {fragranceMenuData.topBrands.map((brand, index) => (
              <Link 
                key={index} 
                to={`/${language}/brands?filter=${brand.toLowerCase()}`}
                className="brand-item" 
                onClick={onLinkClick}
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;