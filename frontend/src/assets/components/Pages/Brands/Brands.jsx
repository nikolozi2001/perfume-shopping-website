import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Brands.scss';

// Mock brands data - moved outside component to avoid dependency warning
const brands = [
  {
    id: 1,
    name: 'Chanel',
    nameGe: 'შანელი',
    category: 'luxury',
    country: 'France',
    countryGe: 'საფრანგეთი',
    founded: 1910,
    description: 'Legendary French luxury brand known for timeless elegance and sophistication',
    descriptionGe: 'ლეგენდარული ფრანგული ლუქსი ბრენდი, რომელიც ცნობილია მარადიული ელეგანტურობითა და დახვეწილობით',
    logoUrl: '/images/brands/chanel-logo.jpg',
    coverUrl: '/images/brands/chanel-cover.jpg',
    productsCount: 45,
    rating: 4.9,
    established: true,
    specialty: 'Classic French Perfumery'
  },
  {
    id: 2,
    name: 'Dior',
    nameGe: 'დიორი',
    category: 'luxury',
    country: 'France',
    countryGe: 'საფრანგეთი',
    founded: 1946,
    description: 'Iconic fashion house renowned for innovative and luxurious fragrances',
    descriptionGe: 'იკონური მოდის სახლი, რომელიც ცნობილია ინოვაციური და ლუქსუსური ფრაგრანსებით',
    logoUrl: '/images/brands/dior-logo.jpg',
    coverUrl: '/images/brands/dior-cover.jpg',
    productsCount: 38,
    rating: 4.8,
    established: true,
    specialty: 'Modern Luxury'
  },
  {
    id: 3,
    name: 'Tom Ford',
    nameGe: 'ტომ ფორდი',
    category: 'premium',
    country: 'USA',
    countryGe: 'აშშ',
    founded: 2006,
    description: 'Contemporary luxury brand offering bold and sensual fragrances',
    descriptionGe: 'თანამედროვე ლუქსუსური ბრენდი, რომელიც გთავაზობთ თამამ და სენსუალურ ფრაგრანსებს',
    logoUrl: '/images/brands/tomford-logo.jpg',
    coverUrl: '/images/brands/tomford-cover.jpg',
    productsCount: 32,
    rating: 4.7,
    established: false,
    specialty: 'Bold & Sensual'
  },
  {
    id: 4,
    name: 'Jo Malone',
    nameGe: 'ჯო მალონი',
    category: 'niche',
    country: 'UK',
    countryGe: 'დიდი ბრიტანეთი',
    founded: 1994,
    description: 'British luxury fragrance house known for elegant simplicity and unique scent combinations',
    descriptionGe: 'ბრიტანული ლუქსუსური ფრაგრანსების სახლი, რომელიც ცნობილია ელეგანტური სიმარტივითა და უნიკალური სუნების კომბინაციებით',
    logoUrl: '/images/brands/jomalone-logo.jpg',
    coverUrl: '/images/brands/jomalone-cover.jpg',
    productsCount: 28,
    rating: 4.6,
    established: false,
    specialty: 'Elegant Simplicity'
  },
  {
    id: 5,
    name: 'Creed',
    nameGe: 'კრიდი',
    category: 'luxury',
    country: 'France',
    countryGe: 'საფრანგეთი',
    founded: 1760,
    description: 'Historic luxury perfume house with centuries of heritage and royal connections',
    descriptionGe: 'ისტორიული ლუქსუსური პარფიუმერიის სახლი საუკუნოვანი მემკვიდრეობითა და სამეფო კავშირებით',
    logoUrl: '/images/brands/creed-logo.jpg',
    coverUrl: '/images/brands/creed-cover.jpg',
    productsCount: 22,
    rating: 4.9,
    established: true,
    specialty: 'Royal Heritage'
  },
  {
    id: 6,
    name: 'Maison Margiela',
    nameGe: 'მეზონ მარჟელა',
    category: 'niche',
    country: 'France',
    countryGe: 'საფრანგეთი',
    founded: 1988,
    description: 'Avant-garde fashion house creating unique and artistic fragrances',
    descriptionGe: 'ავანგარდული მოდის სახლი, რომელიც ქმნის უნიკალურ და მხატვრულ ფრაგრანსებს',
    logoUrl: '/images/brands/margiela-logo.jpg',
    coverUrl: '/images/brands/margiela-cover.jpg',
    productsCount: 18,
    rating: 4.5,
    established: false,
    specialty: 'Artistic Innovation'
  },
  {
    id: 7,
    name: 'Armani',
    nameGe: 'არმანი',
    category: 'premium',
    country: 'Italy',
    countryGe: 'იტალია',
    founded: 1975,
    description: 'Italian fashion powerhouse known for sophisticated and modern fragrances',
    descriptionGe: 'იტალიური მოდის გიგანტი, რომელიც ცნობილია დახვეწილი და თანამედროვე ფრაგრანსებით',
    logoUrl: '/images/brands/armani-logo.jpg',
    coverUrl: '/images/brands/armani-cover.jpg',
    productsCount: 42,
    rating: 4.4,
    established: false,
    specialty: 'Modern Sophistication'
  },
  {
    id: 8,
    name: 'Byredo',
    nameGe: 'ბაირედო',
    category: 'niche',
    country: 'Sweden',
    countryGe: 'შვედეთი',
    founded: 2006,
    description: 'Contemporary niche brand creating minimalist and innovative fragrances',
    descriptionGe: 'თანამედროვე ნიშური ბრენდი, რომელიც ქმნის მინიმალისტურ და ინოვაციურ ფრაგრანსებს',
    logoUrl: '/images/brands/byredo-logo.jpg',
    coverUrl: '/images/brands/byredo-cover.jpg',
    productsCount: 25,
    rating: 4.6,
    established: false,
    specialty: 'Minimalist Innovation'
  }
];

const Brands = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [language, setLanguage] = useState('en');

  const filterOptions = [
    { value: 'all', label: 'All Brands', labelGe: 'ყველა ბრენდი' },
    { value: 'luxury', label: 'Luxury', labelGe: 'ლუქსი' },
    { value: 'premium', label: 'Premium', labelGe: 'პრემიუმი' },
    { value: 'niche', label: 'Niche', labelGe: 'ნიშური' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Brand Name', labelGe: 'ბრენდის სახელი' },
    { value: 'founded', label: 'Year Founded', labelGe: 'დაარსების წელი' },
    { value: 'rating', label: 'Rating', labelGe: 'რეიტინგი' },
    { value: 'products', label: 'Product Count', labelGe: 'პროდუქტების რაოდენობა' }
  ];

  // Filter and sort brands
  const filteredAndSortedBrands = useMemo(() => {
    let filtered = brands;

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(brand => brand.category === activeFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.nameGe.includes(searchTerm) ||
        brand.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'founded':
          return b.founded - a.founded;
        case 'rating':
          return b.rating - a.rating;
        case 'products':
          return b.productsCount - a.productsCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [activeFilter, searchTerm, sortBy]);

  // Get language from URL or localStorage
  useEffect(() => {
    const pathLang = window.location.pathname.startsWith('/ge') ? 'ge' : 'en';
    setLanguage(pathLang);
  }, []);

  const getText = (enText, geText) => {
    return language === 'ge' ? geText : enText;
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

  return (
    <div className="brands-page">
      {/* Hero Section */}
      <section className="brands-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1>{getText('Luxury Fragrance Brands', 'ლუქსუსური ფრაგრანსების ბრენდები')}</h1>
            <p>{getText(
              'Discover the world\'s most prestigious fragrance houses and their exquisite creations',
              'აღმოაჩინეთ მსოფლიოს ყველაზე პრესტიჟული ფრაგრანსების სახლები და მათი განსაკუთრებული შემოქმედება'
            )}</p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="brands-controls">
        <div className="container">
          <div className="controls-wrapper">
            {/* Search */}
            <div className="search-box">
              <input
                type="text"
                placeholder={getText('Search brands...', 'ძებნა ბრენდებში...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="filter-tabs">
              {filterOptions.map(option => (
                <button
                  key={option.value}
                  className={`filter-tab ${activeFilter === option.value ? 'active' : ''}`}
                  onClick={() => setActiveFilter(option.value)}
                >
                  {getText(option.label, option.labelGe)}
                </button>
              ))}
            </div>

            {/* Sort */}
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
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="brands-grid-section">
        <div className="container">
          <div className="brands-grid">
            {filteredAndSortedBrands.map(brand => (
              <div key={brand.id} className="brand-card">
                <div className="brand-cover">
                  <div 
                    className="cover-image"
                    style={{
                      background: `linear-gradient(135deg, 
                        ${brand.category === 'luxury' ? '#d4af37, #f1c40f' : 
                          brand.category === 'premium' ? '#667eea, #764ba2' : 
                          '#ff9a9e, #fecfef'})`
                    }}
                  ></div>
                  {brand.established && (
                    <div className="heritage-badge">
                      {getText('Heritage', 'მემკვიდრეობა')}
                    </div>
                  )}
                </div>

                <div className="brand-info">
                  <div className="brand-header">
                    <div className="brand-logo">
                      <div className="logo-placeholder">
                        {brand.name.charAt(0)}
                      </div>
                    </div>
                    <div className="brand-meta">
                      <h3 className="brand-name">
                        {getText(brand.name, brand.nameGe)}
                      </h3>
                      <p className="brand-origin">
                        {getText(brand.country, brand.countryGe)} • {brand.founded}
                      </p>
                    </div>
                  </div>

                  <div className="brand-rating">
                    <div className="stars">
                      {renderStars(brand.rating)}
                    </div>
                    <span className="rating-value">{brand.rating}</span>
                  </div>

                  <p className="brand-description">
                    {getText(brand.description, brand.descriptionGe)}
                  </p>

                  <div className="brand-stats">
                    <div className="stat">
                      <span className="stat-value">{brand.productsCount}</span>
                      <span className="stat-label">
                        {getText('Products', 'პროდუქტი')}
                      </span>
                    </div>
                    <div className="specialty">
                      {brand.specialty}
                    </div>
                  </div>

                  <div className="brand-actions">
                    <Link 
                      to={`/${language}/brands/${brand.id}`} 
                      className="view-brand-btn"
                    >
                      {getText('View Collection', 'კოლექციის ნახვა')}
                    </Link>
                    <Link 
                      to={`/${language}/fragrance?brand=${brand.id}`} 
                      className="shop-btn"
                    >
                      {getText('Shop Now', 'ახლავე იყიდე')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAndSortedBrands.length === 0 && (
            <div className="no-results">
              <h3>{getText('No brands found', 'ბრენდები ვერ მოიძებნა')}</h3>
              <p>{getText(
                'Try adjusting your search or filter criteria',
                'სცადეთ თქვენი ძებნის ან ფილტრის კრიტერიუმების შეცვლა'
              )}</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories">
        <div className="container">
          <h2>{getText('Explore by Category', 'კატეგორიების მიხედვით მოძებნა')}</h2>
          <div className="categories-grid">
            <Link 
              to={`/${language}/fragrance/women`} 
              className="category-link"
            >
              <div className="category-card women">
                <h3>{getText('Women\'s Fragrances', 'ქალბატონების ფრაგრანსები')}</h3>
                <p>{getText('Elegant & Sophisticated', 'ელეგანტური & დახვეწილი')}</p>
              </div>
            </Link>
            
            <Link 
              to={`/${language}/fragrance/men`} 
              className="category-link"
            >
              <div className="category-card men">
                <h3>{getText('Men\'s Fragrances', 'მამაკაცების ფრაგრანსები')}</h3>
                <p>{getText('Bold & Masculine', 'თამამი & მამაკაცური')}</p>
              </div>
            </Link>
            
            <Link 
              to={`/${language}/gift-sets`} 
              className="category-link"
            >
              <div className="category-card gifts">
                <h3>{getText('Gift Sets', 'საჩუქრების ნაკრები')}</h3>
                <p>{getText('Perfect for Special Occasions', 'იდეალური განსაკუთრებული ოკაზიებისთვის')}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Brands;
