import { useState } from "react";
import { useParams } from "react-router-dom";
import DownVectorGray from "../LanguageChanger/Svgs/DownVectorGray";
import UpVectorGray from "../LanguageChanger/Svgs/UpVectorGray";
import "./CurrencySelector.scss";

const CurrencySelector = () => {
  const { language } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("GEL");

  const currencies = {
    ge: [
      { code: "GEL", symbol: "₾", name: "ლარი" },
      { code: "USD", symbol: "$", name: "დოლარი" },
      { code: "EUR", symbol: "€", name: "ევრო" },
    ],
    en: [
      { code: "GEL", symbol: "₾", name: "Georgian Lari" },
      { code: "USD", symbol: "$", name: "US Dollar" },
      { code: "EUR", symbol: "€", name: "Euro" },
    ],
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency.code);
    setIsOpen(false);
  };

  const currentCurrency = currencies[language]?.find(
    (curr) => curr.code === selectedCurrency
  ) || currencies[language]?.[0];

  return (
    <div className="currency-selector">
      <button
        className="currency-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="currency-info">
          <span className="currency-symbol">{currentCurrency?.symbol}</span>
          <span className="currency-code">{currentCurrency?.code}</span>
        </span>
        {isOpen ? <UpVectorGray /> : <DownVectorGray />}
      </button>

      {isOpen && (
        <div className="currency-dropdown">
          {currencies[language]?.map((currency) => (
            <button
              key={currency.code}
              className={`currency-option ${
                currency.code === selectedCurrency ? "active" : ""
              }`}
              onClick={() => handleCurrencySelect(currency)}
            >
              <span className="symbol">{currency.symbol}</span>
              <span className="details">
                <span className="code">{currency.code}</span>
                <span className="name">{currency.name}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;