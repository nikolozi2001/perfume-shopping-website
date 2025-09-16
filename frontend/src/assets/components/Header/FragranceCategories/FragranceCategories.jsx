import { Link, useParams } from "react-router-dom";
import "./FragranceCategories.scss";

const FragranceCategories = () => {
  const { language } = useParams();

  const categories = {
    ge: [
      { key: "new", label: "ახალი კოლექცია", path: "/new-arrivals" },
      { key: "bestsellers", label: "ბესტსელერები", path: "/bestsellers" },
      { key: "luxury", label: "ლუქს ბრენდები", path: "/luxury" },
      { key: "niche", label: "ნიშური სუნამოები", path: "/niche" },
      { key: "unisex", label: "უნისექს", path: "/fragrance/unisex" },
      { key: "artisanal", label: "ხელნაკეთი", path: "/artisanal" },
    ],
    en: [
      { key: "new", label: "New Collection", path: "/new-arrivals" },
      { key: "bestsellers", label: "Best Sellers", path: "/bestsellers" },
      { key: "luxury", label: "Luxury Brands", path: "/luxury" },
      { key: "niche", label: "Niche Fragrances", path: "/niche" },
      { key: "unisex", label: "Unisex", path: "/fragrance/unisex" },
      { key: "artisanal", label: "Artisanal", path: "/artisanal" },
    ],
  };

  return (
    <div className="fragrance-categories">
      <div className="categories-container">
        {categories[language]?.map((category) => (
          <Link
            key={category.key}
            to={`/${language}${category.path}`}
            className="category-pill"
          >
            {category.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FragranceCategories;