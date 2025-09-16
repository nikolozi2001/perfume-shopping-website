import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FragranceSets.scss';

// Mock fragrance sets data
const fragranceSetsData = [
  {
    id: 1,
    name: 'Luxury Discovery Set',
    nameGe: 'ლუქსუსური აღმოჩენის ნაკრები',
    brand: 'Premium Collection',
    brandGe: 'პრემიუმ კოლექცია',
    price: 299,
    originalPrice: 399,
    category: 'discovery',
    occasion: 'any',
    gender: 'unisex',
    description: 'Discover luxury fragrances with this curated collection of 5 premium scents',
    descriptionGe: 'აღმოაჩინეთ ლუქსუსური ფრაგრანსები ამ შერჩეული 5 პრემიუმ სუნის კოლექციით',
    items: [
      { name: 'Chanel No.5', size: '15ml', type: 'EDP' },
      { name: 'Dior Sauvage', size: '15ml', type: 'EDT' },
      { name: 'Tom Ford Oud Wood', size: '10ml', type: 'EDP' },
      { name: 'Creed Aventus', size: '10ml', type: 'EDP' },
      { name: 'Jo Malone English Pear', size: '15ml', type: 'EDC' }
    ],
    packaging: 'Elegant wooden box with silk lining',
    packagingGe: 'ელეგანტური ხის ყუთი აბრეშუმის ბალიშით',
    imageUrl: '/images/sets/luxury-discovery-set.jpg',
    rating: 4.9,
    reviews: 127,
    isNew: false,
    isBestseller: true,
    isOnSale: true,
    isLimitedEdition: false,
    stock: 8,
    giftWrapping: true,
    personalMessage: true
  },
  {
    id: 2,
    name: 'Romance Collection',
    nameGe: 'რომანტიკული კოლექცია',
    brand: 'Love Essentials',
    brandGe: 'სიყვარულის აუცილებლობები',
    price: 189,
    originalPrice: 189,
    category: 'romantic',
    occasion: 'romantic',
    gender: 'couples',
    description: 'Perfect for couples - his and hers romantic fragrance collection',
    descriptionGe: 'იდეალური წყვილებისთვის - მისი და მისი რომანტიკული ფრაგრანსების კოლექცია',
    items: [
      { name: 'Her Romance', size: '50ml', type: 'EDP' },
      { name: 'His Passion', size: '50ml', type: 'EDT' },
      { name: 'Shared Moments', size: '30ml', type: 'EDC' }
    ],
    packaging: 'Heart-shaped velvet box with golden details',
    packagingGe: 'გულის ფორმის ხავერდოვანი ყუთი ოქროსფერი დეტალებით',
    imageUrl: '/images/sets/romance-collection.jpg',
    rating: 4.7,
    reviews: 89,
    isNew: true,
    isBestseller: false,
    isOnSale: false,
    isLimitedEdition: true,
    stock: 15,
    giftWrapping: true,
    personalMessage: true
  },
  {
    id: 3,
    name: 'Travel Essentials',
    nameGe: 'მგზავრობის აუცილებლობები',
    brand: 'On The Go',
    brandGe: 'გზაზე',
    price: 129,
    originalPrice: 159,
    category: 'travel',
    occasion: 'travel',
    gender: 'unisex',
    description: 'Compact travel-size fragrances perfect for any journey',
    descriptionGe: 'კომპაქტური მგზავრობის ზომის ფრაგრანსები იდეალური ნებისმიერი მგზავრობისთვის',
    items: [
      { name: 'Fresh Morning', size: '20ml', type: 'EDT' },
      { name: 'Afternoon Breeze', size: '20ml', type: 'EDC' },
      { name: 'Evening Charm', size: '20ml', type: 'EDP' },
      { name: 'Night Mystery', size: '15ml', type: 'EDP' }
    ],
    packaging: 'Leather travel case with individual compartments',
    packagingGe: 'ტყავის მგზავრობის ყუთი ინდივიდუალური განყოფილებებით',
    imageUrl: '/images/sets/travel-essentials.jpg',
    rating: 4.6,
    reviews: 156,
    isNew: false,
    isBestseller: false,
    isOnSale: true,
    isLimitedEdition: false,
    stock: 22,
    giftWrapping: false,
    personalMessage: false
  },
  {
    id: 4,
    name: 'Seasonal Harmony',
    nameGe: 'სეზონური ჰარმონია',
    brand: 'Four Seasons',
    brandGe: 'ოთხი სეზონი',
    price: 249,
    originalPrice: 249,
    category: 'seasonal',
    occasion: 'any',
    gender: 'women',
    description: 'Four unique fragrances representing each season of the year',
    descriptionGe: 'ოთხი უნიკალური ფრაგრანსი, რომელიც წარმოადგენს წლის თითოეულ სეზონს',
    items: [
      { name: 'Spring Bloom', size: '25ml', type: 'EDP' },
      { name: 'Summer Breeze', size: '25ml', type: 'EDT' },
      { name: 'Autumn Leaves', size: '25ml', type: 'EDP' },
      { name: 'Winter Warmth', size: '25ml', type: 'EDP' }
    ],
    packaging: 'Crystal carousel with rotating display',
    packagingGe: 'კრისტალის კარუსელი მბრუნავი ჩვენებით',
    imageUrl: '/images/sets/seasonal-harmony.jpg',
    rating: 4.8,
    reviews: 203,
    isNew: false,
    isBestseller: true,
    isOnSale: false,
    isLimitedEdition: true,
    stock: 5,
    giftWrapping: true,
    personalMessage: true
  },
  {
    id: 5,
    name: 'Gentleman\'s Collection',
    nameGe: 'ჯენტლმენის კოლექცია',
    brand: 'Distinguished',
    brandGe: 'გამორჩეული',
    price: 219,
    originalPrice: 279,
    category: 'masculine',
    occasion: 'formal',
    gender: 'men',
    description: 'Sophisticated masculine fragrances for the modern gentleman',
    descriptionGe: 'დახვეწილი მამაკაცური ფრაგრანსები თანამედროვე ჯენტლმენისთვის',
    items: [
      { name: 'Executive', size: '30ml', type: 'EDT' },
      { name: 'Boardroom', size: '30ml', type: 'EDP' },
      { name: 'Weekend', size: '30ml', type: 'EDC' },
      { name: 'Evening', size: '20ml', type: 'Parfum' }
    ],
    packaging: 'Premium mahogany box with brass fittings',
    packagingGe: 'პრემიუმ მაჰაგონის ყუთი მპირქუშების გარნიტურით',
    imageUrl: '/images/sets/gentleman-collection.jpg',
    rating: 4.7,
    reviews: 174,
    isNew: false,
    isBestseller: false,
    isOnSale: true,
    isLimitedEdition: false,
    stock: 11,
    giftWrapping: true,
    personalMessage: true
  },
  {
    id: 6,
    name: 'Artisan Crafted',
    nameGe: 'ხელნაკეთი შემოქმედება',
    brand: 'Niche Masters',
    brandGe: 'ნიშური ოსტატები',
    price: 399,
    originalPrice: 399,
    category: 'niche',
    occasion: 'special',
    gender: 'unisex',
    description: 'Rare and exclusive artisan-crafted fragrances in limited quantities',
    descriptionGe: 'იშვიათი და ექსკლუზიური ხელნაკეთი ფრაგრანსები შეზღუდული რაოდენობით',
    items: [
      { name: 'Master\'s Blend', size: '30ml', type: 'Extrait' },
      { name: 'Artisan\'s Secret', size: '30ml', type: 'EDP' },
      { name: 'Craftsman\'s Pride', size: '25ml', type: 'Parfum' }
    ],
    packaging: 'Hand-carved wooden box with certificate of authenticity',
    packagingGe: 'ხელით ამოქანდაკებული ხის ყუთი ავთენტურობის სერტიფიკატით',
    imageUrl: '/images/sets/artisan-crafted.jpg',
    rating: 4.9,
    reviews: 67,
    isNew: true,
    isBestseller: false,
    isOnSale: false,
    isLimitedEdition: true,
    stock: 3,
    giftWrapping: true,
    personalMessage: true
  }
];

const FragranceSets = () => {
  const [language, setLanguage] = useState('en');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [selectedSet, setSelectedSet] = useState(null);
  const [showCustomization, setShowCustomization] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    occasion: 'all',
    gender: 'all',
    priceRange: 'all',
    inStock: false,
    giftWrapping: false
  });

  const categories = [
    { value: 'all', label: 'All Categories', labelGe: 'ყველა კატეგორია' },
    { value: 'discovery', label: 'Discovery Sets', labelGe: 'აღმოჩენის ნაკრები' },
    { value: 'romantic', label: 'Romantic', labelGe: 'რომანტიკული' },
    { value: 'travel', label: 'Travel Size', labelGe: 'მგზავრობის ზომა' },
    { value: 'seasonal', label: 'Seasonal', labelGe: 'სეზონური' },
    { value: 'masculine', label: 'Masculine', labelGe: 'მამაკაცური' },
    { value: 'niche', label: 'Niche & Artisan', labelGe: 'ნიშური & ხელნაკეთი' }
  ];

  const occasions = [
    { value: 'all', label: 'All Occasions', labelGe: 'ყველა შემთხვევა' },
    { value: 'any', label: 'Everyday', labelGe: 'ყოველდღიური' },
    { value: 'romantic', label: 'Romantic', labelGe: 'რომანტიკული' },
    { value: 'formal', label: 'Formal Events', labelGe: 'ოფიციალური ღონისძიებები' },
    { value: 'travel', label: 'Travel', labelGe: 'მგზავრობა' },
    { value: 'special', label: 'Special Occasions', labelGe: 'განსაკუთრებული შემთხვევები' }
  ];

  const genders = [
    { value: 'all', label: 'All', labelGe: 'ყველა' },
    { value: 'women', label: 'Women', labelGe: 'ქალები' },
    { value: 'men', label: 'Men', labelGe: 'მამაკაცები' },
    { value: 'unisex', label: 'Unisex', labelGe: 'უნისექს' },
    { value: 'couples', label: 'Couples', labelGe: 'წყვილები' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices', labelGe: 'ყველა ფასი' },
    { value: '0-150', label: '$0 - $150', labelGe: '$0 - $150' },
    { value: '150-250', label: '$150 - $250', labelGe: '$150 - $250' },
    { value: '250-350', label: '$250 - $350', labelGe: '$250 - $350' },
    { value: '350+', label: '$350+', labelGe: '$350+' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z', labelGe: 'სახელი ა-ზ' },
    { value: 'price-low', label: 'Price: Low to High', labelGe: 'ფასი: დაბლიდან მაღლამდე' },
    { value: 'price-high', label: 'Price: High to Low', labelGe: 'ფასი: მაღლიდან დაბლამდე' },
    { value: 'rating', label: 'Highest Rated', labelGe: 'ყველაზე შეფასებული' },
    { value: 'newest', label: 'Newest First', labelGe: 'ყველაზე ახალი' }
  ];

  // Filter and sort sets
  const filteredAndSortedSets = useMemo(() => {
    let filtered = [...fragranceSetsData];

    // Apply filters
    if (filters.category !== 'all') {
      filtered = filtered.filter(set => set.category === filters.category);
    }
    if (filters.occasion !== 'all') {
      filtered = filtered.filter(set => set.occasion === filters.occasion);
    }
    if (filters.gender !== 'all') {
      filtered = filtered.filter(set => set.gender === filters.gender);
    }
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(p => p === '' ? Infinity : parseInt(p));
      filtered = filtered.filter(set => {
        if (max === undefined) return set.price >= min;
        return set.price >= min && set.price <= max;
      });
    }
    if (filters.inStock) {
      filtered = filtered.filter(set => set.stock > 0);
    }
    if (filters.giftWrapping) {
      filtered = filtered.filter(set => set.giftWrapping);
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
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

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

  const openCustomization = (set) => {
    setSelectedSet(set);
    setShowCustomization(true);
  };

  const addToCart = (setId, customization = null) => {
    console.log('Added to cart:', setId, customization);
    setShowCustomization(false);
  };

  return (
    <div className="fragrance-sets-page">
      {/* Hero Section */}
      <section className="sets-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1>{getText('Luxury Fragrance Gift Sets', 'ლუქსუსური ფრაგრანსების სასაჩუქრე ნაკრები')}</h1>
            <p>{getText(
              'Discover our curated collection of exquisite fragrance gift sets, perfect for any special occasion',
              'აღმოაჩინეთ ჩვენი შერჩეული ექსკლუზიური ფრაგრანსების სასაჩუქრე ნაკრები, იდეალური ნებისმიერი განსაკუთრებული შემთხვევისთვის'
            )}</p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="page-layout">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3>{getText('Category', 'კატეგორია')}</h3>
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

            <div className="filter-section">
              <h3>{getText('Occasion', 'შემთხვევა')}</h3>
              <div className="filter-options">
                {occasions.map(occasion => (
                  <label key={occasion.value} className="filter-option">
                    <input
                      type="radio"
                      name="occasion"
                      value={occasion.value}
                      checked={filters.occasion === occasion.value}
                      onChange={(e) => handleFilterChange('occasion', e.target.value)}
                    />
                    <span>{getText(occasion.label, occasion.labelGe)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>{getText('For Whom', 'ვისთვის')}</h3>
              <div className="filter-options">
                {genders.map(gender => (
                  <label key={gender.value} className="filter-option">
                    <input
                      type="radio"
                      name="gender"
                      value={gender.value}
                      checked={filters.gender === gender.value}
                      onChange={(e) => handleFilterChange('gender', e.target.value)}
                    />
                    <span>{getText(gender.label, gender.labelGe)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>{getText('Price Range', 'ფასების დიაპაზონი')}</h3>
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
                    checked={filters.giftWrapping}
                    onChange={(e) => handleFilterChange('giftWrapping', e.target.checked)}
                  />
                  <span>{getText('Gift Wrapping Available', 'სასაჩუქრე შეფუთვა ხელმისაწვდომია')}</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="sets-content">
            {/* Controls Bar */}
            <div className="controls-bar">
              <div className="results-info">
                <span>
                  {getText(
                    `${filteredAndSortedSets.length} gift sets found`,
                    `${filteredAndSortedSets.length} სასაჩუქრე ნაკრები მოიძებნა`
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

            {/* Sets Grid/List */}
            <div className={`sets-container ${viewMode}`}>
              {filteredAndSortedSets.map(set => (
                <div key={set.id} className="set-card">
                  <div className="set-image">
                    <div 
                      className="image-placeholder"
                      style={{
                        background: `linear-gradient(135deg, 
                          ${set.category === 'discovery' ? '#667eea, #764ba2' : 
                            set.category === 'romantic' ? '#ff9a9e, #fecfef' : 
                            set.category === 'travel' ? '#4facfe, #00f2fe' : 
                            set.category === 'seasonal' ? '#ffeaa7, #fdcb6e' : 
                            set.category === 'masculine' ? '#2c3e50, #34495e' : 
                            '#a8edea, #fed6e3'})`
                      }}
                    >
                      <span className="set-initial">{set.name.charAt(0)}</span>
                    </div>

                    {/* Badges */}
                    <div className="badges">
                      {set.isNew && (
                        <span className="badge new">{getText('New', 'ახალი')}</span>
                      )}
                      {set.isBestseller && (
                        <span className="badge bestseller">{getText('Bestseller', 'ბესტსელერი')}</span>
                      )}
                      {set.isOnSale && (
                        <span className="badge sale">{getText('Sale', 'აქცია')}</span>
                      )}
                      {set.isLimitedEdition && (
                        <span className="badge limited">{getText('Limited', 'შეზღუდული')}</span>
                      )}
                    </div>

                    {/* Stock indicator */}
                    {set.stock <= 5 && set.stock > 0 && (
                      <div className="stock-warning">
                        {getText(`Only ${set.stock} left`, `დარჩა მხოლოდ ${set.stock}`)}
                      </div>
                    )}
                  </div>

                  <div className="set-info">
                    <div className="brand-name">
                      {getText(set.brand, set.brandGe)}
                    </div>

                    <h3 className="set-name">
                      {getText(set.name, set.nameGe)}
                    </h3>

                    <div className="set-rating">
                      <div className="stars">
                        {renderStars(set.rating)}
                      </div>
                      <span className="rating-text">
                        {set.rating} ({set.reviews} {getText('reviews', 'შეფასება')})
                      </span>
                    </div>

                    <div className="set-description">
                      {getText(set.description, set.descriptionGe)}
                    </div>

                    <div className="set-items">
                      <h4>{getText('Includes:', 'შეიცავს:')}</h4>
                      <ul>
                        {set.items.slice(0, 3).map((item, index) => (
                          <li key={index}>
                            {item.name} ({item.size} {item.type})
                          </li>
                        ))}
                        {set.items.length > 3 && (
                          <li className="more-items">
                            +{set.items.length - 3} {getText('more items', 'მეტი ნივთი')}
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="packaging-info">
                      <strong>{getText('Packaging:', 'შეფუთვა:')}</strong>
                      <p>{getText(set.packaging, set.packagingGe)}</p>
                    </div>

                    <div className="set-pricing">
                      <span className="current-price">${set.price}</span>
                      {set.isOnSale && set.originalPrice > set.price && (
                        <span className="original-price">${set.originalPrice}</span>
                      )}
                    </div>

                    <div className="set-features">
                      {set.giftWrapping && (
                        <span className="feature">
                          🎁 {getText('Gift Wrapping', 'სასაჩუქრე შეფუთვა')}
                        </span>
                      )}
                      {set.personalMessage && (
                        <span className="feature">
                          💌 {getText('Personal Message', 'პირადი წერილი')}
                        </span>
                      )}
                    </div>

                    <div className="set-actions">
                      <button 
                        className="customize-btn"
                        onClick={() => openCustomization(set)}
                      >
                        {getText('Customize & Add to Cart', 'მორგება & კალათაში დამატება')}
                      </button>
                      <Link 
                        to={`/${language}/sets/${set.id}`}
                        className="view-details-btn"
                      >
                        {getText('View Details', 'დეტალები')}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAndSortedSets.length === 0 && (
              <div className="no-results">
                <h3>{getText('No gift sets found', 'სასაჩუქრე ნაკრები ვერ მოიძებნა')}</h3>
                <p>{getText(
                  'Try adjusting your filters or search criteria',
                  'სცადეთ თქვენი ფილტრების ან ძებნის კრიტერიუმების შეცვლა'
                )}</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomization && selectedSet && (
        <div className="customization-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{getText('Customize Your Gift Set', 'მოირგეთ თქვენი სასაჩუქრე ნაკრები')}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowCustomization(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="set-preview">
                <h4>{getText(selectedSet.name, selectedSet.nameGe)}</h4>
                <p>{getText(selectedSet.description, selectedSet.descriptionGe)}</p>
              </div>
              
              <div className="customization-options">
                <div className="option-group">
                  <label>
                    <input type="checkbox" defaultChecked={selectedSet.giftWrapping} />
                    {getText('Premium Gift Wrapping (+$15)', 'პრემიუმ სასაჩუქრე შეფუთვა (+$15)')}
                  </label>
                </div>
                
                <div className="option-group">
                  <label>
                    <input type="checkbox" defaultChecked={selectedSet.personalMessage} />
                    {getText('Personal Message Card (+$5)', 'პირადი წერილის ბარათი (+$5)')}
                  </label>
                  <textarea 
                    placeholder={getText('Enter your personal message...', 'შეიყვანეთ თქვენი პირადი წერილი...')}
                    className="message-input"
                  />
                </div>
                
                <div className="option-group">
                  <label>{getText('Delivery Date:', 'მიწოდების თარიღი:')}</label>
                  <input type="date" className="date-input" />
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(selectedSet.id, {})}
                >
                  {getText('Add to Cart', 'კალათაში დამატება')} - ${selectedSet.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FragranceSets;
