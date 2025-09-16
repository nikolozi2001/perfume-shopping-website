import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Women.scss';

// Mock women's fragrance data
const womenFragrancesData = [
  {
    id: 1,
    name: 'Chanel No. 5',
    nameGe: 'შანელ ნომერი 5',
    brand: 'Chanel',
    brandGe: 'შანელი',
    price: 158,
    originalPrice: 198,
    category: 'floral',
    concentration: 'EDP',
    size: '50ml',
    description: 'The world\'s most iconic fragrance with aldehydic floral bouquet',
    descriptionGe: 'მსოფლიოში ყველაზე ცნობილი ფრაგრანსი ალდეჰიდური ყვავილოვანი ბუკეტით',
    notes: {
      top: ['Aldehydes', 'Ylang-Ylang', 'Neroli'],
      heart: ['Rose', 'Jasmine', 'Lily of the Valley'],
      base: ['Sandalwood', 'Vetiver', 'Vanilla']
    },
    occasion: 'evening',
    season: 'spring',
    sillage: 'strong',
    longevity: 'long',
    imageUrl: '/images/fragrances/chanel-no5.jpg',
    rating: 4.8,
    reviews: 2847,
    isNew: false,
    isBestseller: true,
    isOnSale: true,
    isLimitedEdition: false,
    stock: 15,
    launched: '1921'
  },
  {
    id: 2,
    name: 'Dior Miss Dior',
    nameGe: 'დიორ მის დიორი',
    brand: 'Christian Dior',
    brandGe: 'კრისტიან დიორი',
    price: 142,
    originalPrice: 142,
    category: 'floral',
    concentration: 'EDP',
    size: '50ml',
    description: 'Elegant and romantic rose bouquet with fresh citrus opening',
    descriptionGe: 'ელეგანტური და რომანტიკული ვარდის ბუკეტი ახალი ციტრუსოვანი შესავლით',
    notes: {
      top: ['Blood Orange', 'Mandarin', 'Pink Pepper'],
      heart: ['Damask Rose', 'Peony', 'Lily of the Valley'],
      base: ['Patchouli', 'White Musk', 'Rosewood']
    },
    occasion: 'daytime',
    season: 'spring',
    sillage: 'moderate',
    longevity: 'moderate',
    imageUrl: '/images/fragrances/miss-dior.jpg',
    rating: 4.6,
    reviews: 1923,
    isNew: false,
    isBestseller: true,
    isOnSale: false,
    isLimitedEdition: false,
    stock: 23,
    launched: '2012'
  },
  {
    id: 3,
    name: 'Tom Ford Black Orchid',
    nameGe: 'ტომ ფორდ შავი ორქიდეა',
    brand: 'Tom Ford',
    brandGe: 'ტომ ფორდი',
    price: 198,
    originalPrice: 198,
    category: 'oriental',
    concentration: 'EDP',
    size: '50ml',
    description: 'Luxurious and mysterious oriental fragrance with dark chocolate notes',
    descriptionGe: 'ლუქსუსური და იდუმალი აღმოსავლური ფრაგრანსი მუქი შოკოლადის ნოტებით',
    notes: {
      top: ['Truffle', 'Gardenia', 'Black Currant'],
      heart: ['Orchid', 'Spices', 'Lotus Wood'],
      base: ['Mexican Chocolate', 'Patchouli', 'Sandalwood']
    },
    occasion: 'evening',
    season: 'winter',
    sillage: 'very strong',
    longevity: 'very long',
    imageUrl: '/images/fragrances/black-orchid.jpg',
    rating: 4.7,
    reviews: 1456,
    isNew: false,
    isBestseller: false,
    isOnSale: false,
    isLimitedEdition: false,
    stock: 8,
    launched: '2006'
  },
  {
    id: 4,
    name: 'Yves Saint Laurent Libre',
    nameGe: 'ივ სენ ლოران ლიბრე',
    brand: 'Yves Saint Laurent',
    brandGe: 'ივ სენ ლორანი',
    price: 135,
    originalPrice: 165,
    category: 'floral',
    concentration: 'EDP',
    size: '50ml',
    description: 'Modern floral fragrance combining lavender and orange blossom',
    descriptionGe: 'თანამედროვე ყვავილოვანი ფრაგრანსი ლავანდისა და ნარინჯისფერის შერწყმით',
    notes: {
      top: ['Mandarin', 'Black Currant', 'Lavender'],
      heart: ['Orange Blossom', 'Jasmine', 'Orchid'],
      base: ['Madagascar Vanilla', 'Musk', 'Ambergris']
    },
    occasion: 'daytime',
    season: 'summer',
    sillage: 'moderate',
    longevity: 'moderate',
    imageUrl: '/images/fragrances/ysl-libre.jpg',
    rating: 4.5,
    reviews: 1124,
    isNew: true,
    isBestseller: false,
    isOnSale: true,
    isLimitedEdition: false,
    stock: 34,
    launched: '2019'
  },
  {
    id: 5,
    name: 'Lancôme La Vie Est Belle',
    nameGe: 'ლანკომ ლა ვი ე ბელი',
    brand: 'Lancôme',
    brandGe: 'ლანკომი',
    price: 128,
    originalPrice: 128,
    category: 'gourmand',
    concentration: 'EDP',
    size: '50ml',
    description: 'Sweet gourmand fragrance with iris and praline notes',
    descriptionGe: 'ტკბილი გურმანული ფრაგრანსი ირისისა და პრალინეს ნოტებით',
    notes: {
      top: ['Black Currant', 'Pear'],
      heart: ['Iris', 'Jasmine', 'Orange Blossom'],
      base: ['Praline', 'Vanilla', 'Patchouli']
    },
    occasion: 'daytime',
    season: 'autumn',
    sillage: 'strong',
    longevity: 'long',
    imageUrl: '/images/fragrances/la-vie-est-belle.jpg',
    rating: 4.4,
    reviews: 2156,
    isNew: false,
    isBestseller: true,
    isOnSale: false,
    isLimitedEdition: false,
    stock: 19,
    launched: '2012'
  },
  {
    id: 6,
    name: 'Maison Margiela Replica Beach Walk',
    nameGe: 'მეზონ მარჟელა რეპლიკა ბიჩ ვოლკი',
    brand: 'Maison Margiela',
    brandGe: 'მეზონ მარჟელა',
    price: 152,
    originalPrice: 152,
    category: 'marine',
    concentration: 'EDT',
    size: '50ml',
    description: 'Fresh marine fragrance evoking sunny beach memories',
    descriptionGe: 'ახალი ზღვისპირული ფრაგრანსი მზიანი პლაჟის მოგონებებით',
    notes: {
      top: ['Bergamot', 'Lemon', 'Pink Pepper'],
      heart: ['Ylang-Ylang', 'Coconut Milk', 'Heliotrope'],
      base: ['Cedar', 'Benzoin', 'White Musk']
    },
    occasion: 'daytime',
    season: 'summer',
    sillage: 'moderate',
    longevity: 'moderate',
    imageUrl: '/images/fragrances/beach-walk.jpg',
    rating: 4.3,
    reviews: 892,
    isNew: true,
    isBestseller: false,
    isOnSale: false,
    isLimitedEdition: true,
    stock: 12,
    launched: '2020'
  },
  {
    id: 7,
    name: 'Guerlain Mon Guerlain',
    nameGe: 'გერლენ მონ გერლენი',
    brand: 'Guerlain',
    brandGe: 'გერლენი',
    price: 145,
    originalPrice: 175,
    category: 'oriental',
    concentration: 'EDP',
    size: '50ml',
    description: 'Sophisticated oriental fragrance with lavender and vanilla',
    descriptionGe: 'დახვეწილი აღმოსავლური ფრაგრანსი ლავანდისა და ვანილით',
    notes: {
      top: ['Lavender', 'Bergamot', 'Carla Lavander'],
      heart: ['Jasmine Sambac', 'Rose', 'Freesia'],
      base: ['Vanilla Tahitensis', 'Coumarin', 'Australian Sandalwood']
    },
    occasion: 'evening',
    season: 'autumn',
    sillage: 'strong',
    longevity: 'long',
    imageUrl: '/images/fragrances/mon-guerlain.jpg',
    rating: 4.6,
    reviews: 1634,
    isNew: false,
    isBestseller: false,
    isOnSale: true,
    isLimitedEdition: false,
    stock: 16,
    launched: '2017'
  },
  {
    id: 8,
    name: 'Jo Malone Peony & Blush Suede',
    nameGe: 'ჯო მალონ პიონია და ბლაშ სუედი',
    brand: 'Jo Malone London',
    brandGe: 'ჯო მალონ ლონდონი',
    price: 118,
    originalPrice: 118,
    category: 'floral',
    concentration: 'EDC',
    size: '50ml',
    description: 'Delicate floral fragrance with soft suede undertones',
    descriptionGe: 'ნაზი ყვავილოვანი ფრაგრანსი რბილი ზამშის ქვეტონებით',
    notes: {
      top: ['Red Apple', 'Peony'],
      heart: ['Rose', 'Gillyflower', 'Jasmine'],
      base: ['Suede', 'Soft Musk']
    },
    occasion: 'daytime',
    season: 'spring',
    sillage: 'light',
    longevity: 'moderate',
    imageUrl: '/images/fragrances/peony-blush-suede.jpg',
    rating: 4.2,
    reviews: 756,
    isNew: false,
    isBestseller: false,
    isOnSale: false,
    isLimitedEdition: false,
    stock: 27,
    launched: '2013'
  }
];

const Women = () => {
  const [language, setLanguage] = useState('en');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    brand: 'all',
    concentration: 'all',
    occasion: 'all',
    season: 'all',
    sillage: 'all',
    inStock: false,
    onSale: false
  });

  const categories = [
    { value: 'all', label: 'All Categories', labelGe: 'ყველა კატეგორია' },
    { value: 'floral', label: 'Floral', labelGe: 'ყვავილოვანი' },
    { value: 'oriental', label: 'Oriental', labelGe: 'აღმოსავლური' },
    { value: 'gourmand', label: 'Gourmand', labelGe: 'გურმანული' },
    { value: 'marine', label: 'Marine', labelGe: 'ზღვისპირული' }
  ];

  const brands = [
    { value: 'all', label: 'All Brands', labelGe: 'ყველა ბრენდი' },
    { value: 'Chanel', label: 'Chanel', labelGe: 'შანელი' },
    { value: 'Christian Dior', label: 'Christian Dior', labelGe: 'კრისტიან დიორი' },
    { value: 'Tom Ford', label: 'Tom Ford', labelGe: 'ტომ ფორდი' },
    { value: 'Yves Saint Laurent', label: 'Yves Saint Laurent', labelGe: 'ივ სენ ლორანი' },
    { value: 'Lancôme', label: 'Lancôme', labelGe: 'ლანკომი' },
    { value: 'Maison Margiela', label: 'Maison Margiela', labelGe: 'მეზონ მარჟელა' },
    { value: 'Guerlain', label: 'Guerlain', labelGe: 'გერლენი' },
    { value: 'Jo Malone London', label: 'Jo Malone London', labelGe: 'ჯო მალონ ლონდონი' }
  ];

  const concentrations = [
    { value: 'all', label: 'All Types', labelGe: 'ყველა ტიპი' },
    { value: 'EDC', label: 'Eau de Cologne', labelGe: 'ო დე კოლონი' },
    { value: 'EDT', label: 'Eau de Toilette', labelGe: 'ო დე ტუალეტი' },
    { value: 'EDP', label: 'Eau de Parfum', labelGe: 'ო დე პარფუმი' },
    { value: 'Parfum', label: 'Parfum', labelGe: 'პარფუმი' }
  ];

  const occasions = [
    { value: 'all', label: 'All Occasions', labelGe: 'ყველა შემთხვევა' },
    { value: 'daytime', label: 'Daytime', labelGe: 'დღისთვის' },
    { value: 'evening', label: 'Evening', labelGe: 'საღამოსთვის' },
    { value: 'office', label: 'Office', labelGe: 'ოფისისთვის' },
    { value: 'special', label: 'Special Events', labelGe: 'განსაკუთრებული ღონისძიებები' }
  ];

  const seasons = [
    { value: 'all', label: 'All Seasons', labelGe: 'ყველა სეზონი' },
    { value: 'spring', label: 'Spring', labelGe: 'გაზაფხული' },
    { value: 'summer', label: 'Summer', labelGe: 'ზაფხული' },
    { value: 'autumn', label: 'Autumn', labelGe: 'შემოდგომა' },
    { value: 'winter', label: 'Winter', labelGe: 'ზამთარი' }
  ];

  const sillageOptions = [
    { value: 'all', label: 'All Sillage', labelGe: 'ყველა სისტანგე' },
    { value: 'light', label: 'Light', labelGe: 'მსუბუქი' },
    { value: 'moderate', label: 'Moderate', labelGe: 'ზომიერი' },
    { value: 'strong', label: 'Strong', labelGe: 'ძლიერი' },
    { value: 'very strong', label: 'Very Strong', labelGe: 'ძალიან ძლიერი' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices', labelGe: 'ყველა ფასი' },
    { value: '0-100', label: '$0 - $100', labelGe: '$0 - $100' },
    { value: '100-150', label: '$100 - $150', labelGe: '$100 - $150' },
    { value: '150-200', label: '$150 - $200', labelGe: '$150 - $200' },
    { value: '200+', label: '$200+', labelGe: '$200+' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z', labelGe: 'სახელი ა-ზ' },
    { value: 'price-low', label: 'Price: Low to High', labelGe: 'ფასი: დაბლიდან მაღლამდე' },
    { value: 'price-high', label: 'Price: High to Low', labelGe: 'ფასი: მაღლიდან დაბლამდე' },
    { value: 'rating', label: 'Highest Rated', labelGe: 'ყველაზე შეფასებული' },
    { value: 'newest', label: 'Newest First', labelGe: 'ყველაზე ახალი' },
    { value: 'popularity', label: 'Most Popular', labelGe: 'ყველაზე პოპულარული' }
  ];

  // Filter and sort fragrances
  const filteredAndSortedFragrances = useMemo(() => {
    let filtered = [...womenFragrancesData];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(fragrance =>
        fragrance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fragrance.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fragrance.nameGe.includes(searchTerm) ||
        fragrance.brandGe.includes(searchTerm)
      );
    }

    // Apply filters
    if (filters.category !== 'all') {
      filtered = filtered.filter(fragrance => fragrance.category === filters.category);
    }
    if (filters.brand !== 'all') {
      filtered = filtered.filter(fragrance => fragrance.brand === filters.brand);
    }
    if (filters.concentration !== 'all') {
      filtered = filtered.filter(fragrance => fragrance.concentration === filters.concentration);
    }
    if (filters.occasion !== 'all') {
      filtered = filtered.filter(fragrance => fragrance.occasion === filters.occasion);
    }
    if (filters.season !== 'all') {
      filtered = filtered.filter(fragrance => fragrance.season === filters.season);
    }
    if (filters.sillage !== 'all') {
      filtered = filtered.filter(fragrance => fragrance.sillage === filters.sillage);
    }
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(p => p === '' ? Infinity : parseInt(p));
      filtered = filtered.filter(fragrance => {
        if (max === undefined) return fragrance.price >= min;
        return fragrance.price >= min && fragrance.price <= max;
      });
    }
    if (filters.inStock) {
      filtered = filtered.filter(fragrance => fragrance.stock > 0);
    }
    if (filters.onSale) {
      filtered = filtered.filter(fragrance => fragrance.isOnSale);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.isNew ? 1 : -1;
        case 'popularity':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filters, sortBy]);

  // Get language from URL
  useEffect(() => {
    const pathLang = window.location.pathname.startsWith('/ge') ? 'ge' : 'en';
    setLanguage(pathLang);
  }, []);

  const getText = (enText, geText) => {
    return language === 'ge' ? geText : enText;
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: 'all',
      priceRange: 'all',
      brand: 'all',
      concentration: 'all',
      occasion: 'all',
      season: 'all',
      sillage: 'all',
      inStock: false,
      onSale: false
    });
    setSearchTerm('');
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span 
        key={index} 
        className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}
      >
        ★
      </span>
    ));
  };

  const addToCart = (fragranceId) => {
    console.log('Added to cart:', fragranceId);
  };

  const addToWishlist = (fragranceId) => {
    console.log('Added to wishlist:', fragranceId);
  };

  return (
    <div className="women-fragrance-page">
      {/* Hero Section */}
      <section className="women-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1>{getText('Women\'s Fragrances', 'ქალბატონების ფრაგრანსები')}</h1>
            <p>{getText(
              'Discover our exquisite collection of feminine fragrances, from delicate florals to sophisticated orientals',
              'აღმოაჩინეთ ჩვენი ექსკლუზიური ქალბატონური ფრაგრანსების კოლექცია, ნაზი ყვავილოვანიდან დახვეწილ აღმოსავლურ სუნამდე'
            )}</p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="page-layout">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div className="filter-header">
              <h3>{getText('Filters', 'ფილტრები')}</h3>
              <button className="clear-filters" onClick={clearAllFilters}>
                {getText('Clear All', 'ყველას წაშლა')}
              </button>
            </div>

            {/* Search */}
            <div className="filter-section">
              <h4>{getText('Search', 'ძებნა')}</h4>
              <input
                type="text"
                placeholder={getText('Search fragrances...', 'ძებნა ფრაგრანსების...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Category Filter */}
            <div className="filter-section">
              <h4>{getText('Category', 'კატეგორია')}</h4>
              <div className="filter-options">
                {categories.map(category => (
                  <label key={category.value} className="filter-option">
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={filters.category === category.value}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                    />
                    <span>{getText(category.label, category.labelGe)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="filter-section">
              <h4>{getText('Brand', 'ბრენდი')}</h4>
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="filter-select"
              >
                {brands.map(brand => (
                  <option key={brand.value} value={brand.value}>
                    {getText(brand.label, brand.labelGe)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="filter-section">
              <h4>{getText('Price Range', 'ფასების დიაპაზონი')}</h4>
              <div className="filter-options">
                {priceRanges.map(range => (
                  <label key={range.value} className="filter-option">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range.value}
                      checked={filters.priceRange === range.value}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    />
                    <span>{getText(range.label, range.labelGe)}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Concentration Filter */}
            <div className="filter-section">
              <h4>{getText('Concentration', 'კონცენტრაცია')}</h4>
              <select
                value={filters.concentration}
                onChange={(e) => handleFilterChange('concentration', e.target.value)}
                className="filter-select"
              >
                {concentrations.map(conc => (
                  <option key={conc.value} value={conc.value}>
                    {getText(conc.label, conc.labelGe)}
                  </option>
                ))}
              </select>
            </div>

            {/* Occasion Filter */}
            <div className="filter-section">
              <h4>{getText('Occasion', 'შემთხვევა')}</h4>
              <select
                value={filters.occasion}
                onChange={(e) => handleFilterChange('occasion', e.target.value)}
                className="filter-select"
              >
                {occasions.map(occasion => (
                  <option key={occasion.value} value={occasion.value}>
                    {getText(occasion.label, occasion.labelGe)}
                  </option>
                ))}
              </select>
            </div>

            {/* Season Filter */}
            <div className="filter-section">
              <h4>{getText('Season', 'სეზონი')}</h4>
              <select
                value={filters.season}
                onChange={(e) => handleFilterChange('season', e.target.value)}
                className="filter-select"
              >
                {seasons.map(season => (
                  <option key={season.value} value={season.value}>
                    {getText(season.label, season.labelGe)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sillage Filter */}
            <div className="filter-section">
              <h4>{getText('Sillage', 'სისტანგე')}</h4>
              <select
                value={filters.sillage}
                onChange={(e) => handleFilterChange('sillage', e.target.value)}
                className="filter-select"
              >
                {sillageOptions.map(sillage => (
                  <option key={sillage.value} value={sillage.value}>
                    {getText(sillage.label, sillage.labelGe)}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Filters */}
            <div className="filter-section">
              <div className="checkbox-filters">
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                  />
                  <span>{getText('In Stock Only', 'მხოლოდ საწყობში არსებული')}</span>
                </label>
                
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.onSale}
                    onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                  />
                  <span>{getText('On Sale', 'აქციაზე')}</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="fragrances-content">
            {/* Controls Bar */}
            <div className="controls-bar">
              <div className="results-info">
                <span>
                  {getText(
                    `${filteredAndSortedFragrances.length} fragrances found`,
                    `${filteredAndSortedFragrances.length} ფრაგრანსი მოიძებნა`
                  )}
                </span>
              </div>

              <div className="controls">
                <div className="sort-dropdown">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {getText(option.label, option.labelGe)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="view-toggle">
                  <button
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    ⊞
                  </button>
                  <button
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    ☰
                  </button>
                </div>
              </div>
            </div>

            {/* Fragrances Grid/List */}
            <div className={`fragrances-container ${viewMode}`}>
              {filteredAndSortedFragrances.map(fragrance => (
                <div key={fragrance.id} className="fragrance-card">
                  <div className="fragrance-image">
                    <div 
                      className="image-placeholder"
                      style={{
                        background: `linear-gradient(135deg, 
                          ${fragrance.category === 'floral' ? '#ff9a9e, #fecfef' : 
                            fragrance.category === 'oriental' ? '#667eea, #764ba2' : 
                            fragrance.category === 'gourmand' ? '#ffeaa7, #fdcb6e' : 
                            fragrance.category === 'marine' ? '#4facfe, #00f2fe' : 
                            '#a8edea, #fed6e3'})`
                      }}
                    >
                      <span className="fragrance-initial">{fragrance.name.charAt(0)}</span>
                    </div>

                    {/* Badges */}
                    <div className="badges">
                      {fragrance.isNew && (
                        <span className="badge new">{getText('New', 'ახალი')}</span>
                      )}
                      {fragrance.isBestseller && (
                        <span className="badge bestseller">{getText('Bestseller', 'ბესტსელერი')}</span>
                      )}
                      {fragrance.isOnSale && (
                        <span className="badge sale">{getText('Sale', 'აქცია')}</span>
                      )}
                      {fragrance.isLimitedEdition && (
                        <span className="badge limited">{getText('Limited', 'შეზღუდული')}</span>
                      )}
                    </div>

                    {/* Stock indicator */}
                    {fragrance.stock <= 5 && fragrance.stock > 0 && (
                      <div className="stock-warning">
                        {getText(`Only ${fragrance.stock} left`, `დარჩა მხოლოდ ${fragrance.stock}`)}
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="quick-actions">
                      <button 
                        className="wishlist-btn"
                        onClick={() => addToWishlist(fragrance.id)}
                      >
                        ♡
                      </button>
                    </div>
                  </div>

                  <div className="fragrance-info">
                    <div className="brand-name">
                      {getText(fragrance.brand, fragrance.brandGe)}
                    </div>

                    <h3 className="fragrance-name">
                      {getText(fragrance.name, fragrance.nameGe)}
                    </h3>

                    <div className="fragrance-meta">
                      <span className="concentration">{fragrance.concentration}</span>
                      <span className="size">{fragrance.size}</span>
                      <span className="launched">{fragrance.launched}</span>
                    </div>

                    <div className="fragrance-rating">
                      <div className="stars">
                        {renderStars(fragrance.rating)}
                      </div>
                      <span className="rating-text">
                        {fragrance.rating} ({fragrance.reviews} {getText('reviews', 'შეფასება')})
                      </span>
                    </div>

                    <div className="fragrance-description">
                      {getText(fragrance.description, fragrance.descriptionGe)}
                    </div>

                    <div className="fragrance-notes">
                      <div className="notes-section">
                        <span className="notes-label">{getText('Top:', 'ზედა:')}</span>
                        <span className="notes-list">{fragrance.notes.top.join(', ')}</span>
                      </div>
                      <div className="notes-section">
                        <span className="notes-label">{getText('Heart:', 'გული:')}</span>
                        <span className="notes-list">{fragrance.notes.heart.join(', ')}</span>
                      </div>
                      <div className="notes-section">
                        <span className="notes-label">{getText('Base:', 'ბაზა:')}</span>
                        <span className="notes-list">{fragrance.notes.base.join(', ')}</span>
                      </div>
                    </div>

                    <div className="fragrance-details">
                      <div className="detail-item">
                        <span>{getText('Occasion:', 'შემთხვევა:')}</span>
                        <span>{fragrance.occasion}</span>
                      </div>
                      <div className="detail-item">
                        <span>{getText('Season:', 'სეზონი:')}</span>
                        <span>{fragrance.season}</span>
                      </div>
                      <div className="detail-item">
                        <span>{getText('Sillage:', 'სისტანგე:')}</span>
                        <span>{fragrance.sillage}</span>
                      </div>
                      <div className="detail-item">
                        <span>{getText('Longevity:', 'გრძელვადიანობა:')}</span>
                        <span>{fragrance.longevity}</span>
                      </div>
                    </div>

                    <div className="fragrance-pricing">
                      <span className="current-price">${fragrance.price}</span>
                      {fragrance.isOnSale && fragrance.originalPrice > fragrance.price && (
                        <span className="original-price">${fragrance.originalPrice}</span>
                      )}
                    </div>

                    <div className="fragrance-actions">
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => addToCart(fragrance.id)}
                        disabled={fragrance.stock === 0}
                      >
                        {fragrance.stock === 0 
                          ? getText('Out of Stock', 'აღარ არის საწყობში')
                          : getText('Add to Cart', 'კალათაში დამატება')
                        }
                      </button>
                      <Link 
                        to={`/${language}/fragrances/women/${fragrance.id}`}
                        className="view-details-btn"
                      >
                        {getText('View Details', 'დეტალები')}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAndSortedFragrances.length === 0 && (
              <div className="no-results">
                <h3>{getText('No fragrances found', 'ფრაგრანსები ვერ მოიძებნა')}</h3>
                <p>{getText(
                  'Try adjusting your filters or search criteria',
                  'სცადეთ თქვენი ფილტრების ან ძებნის კრიტერიუმების შეცვლა'
                )}</p>
                <button className="clear-filters-btn" onClick={clearAllFilters}>
                  {getText('Clear All Filters', 'ყველა ფილტრის წაშლა')}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Women;
