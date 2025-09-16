import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import "./PromotionalBanner.scss";

const PromotionalBanner = () => {
  const { language } = useParams();
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  const promotions = useMemo(() => ({
    ge: [
      {
        id: 1,
        icon: "🌸",
        text: "გაზაფხულის კოლექცია 2025 | უფასო მიტანა 75₾+ შეძენაზე",
        highlight: "გაზაფხულის კოლექცია 2025",
        cta: "ნახვა",
      },
      {
        id: 2,
        icon: "🎁",
        text: "ყიდულობთ 2 სუნამოს - მე-3 საჩუქრად!",
        highlight: "მე-3 საჩუქრად",
        cta: "დეტალები",
      },
      {
        id: 3,
        icon: "✨",
        text: "ლუქს ბრენდები 30%-მდე ფასდაკლებით",
        highlight: "30%-მდე ფასდაკლებით",
        cta: "შოპინგი",
      },
    ],
    en: [
      {
        id: 1,
        icon: "🌸",
        text: "Spring Collection 2025 | Free Shipping on Orders $75+",
        highlight: "Spring Collection 2025",
        cta: "Shop Now",
      },
      {
        id: 2,
        icon: "🎁",
        text: "Buy 2 Fragrances - Get 3rd FREE!",
        highlight: "Get 3rd FREE",
        cta: "Learn More",
      },
      {
        id: 3,
        icon: "✨",
        text: "Luxury Brands up to 30% OFF",
        highlight: "up to 30% OFF",
        cta: "Shop Sale",
      },
    ],
  }), []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prev) => 
        (prev + 1) % (promotions[language]?.length || 1)
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [language, promotions]);

  if (!promotions[language]) return null;

  const currentPromo = promotions[language][currentPromoIndex];

  return (
    <div className="promotional-banner">
      <div className="promo-content">
        <span className="promo-icon">{currentPromo.icon}</span>
        <span className="promo-text">
          {currentPromo.text.split(currentPromo.highlight).map((part, index) => (
            <span key={index}>
              {part}
              {index === 0 && (
                <strong className="highlight">{currentPromo.highlight}</strong>
              )}
            </span>
          ))}
        </span>
        <button className="promo-cta">{currentPromo.cta}</button>
      </div>
      
      <div className="promo-indicators">
        {promotions[language].map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentPromoIndex ? 'active' : ''}`}
            onClick={() => setCurrentPromoIndex(index)}
            aria-label={`Promotion ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionalBanner;