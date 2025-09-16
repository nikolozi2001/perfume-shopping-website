import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Men.scss';

// Mock men's fragrance data
const menFragrances = [
  {
    id: 1,
    name: 'Bleu de Chanel',
    nameGe: 'ბლო დე შანელ',
    brand: 'Chanel',
    brandGe: 'შანელი',
    price: 120,
    originalPrice: 150,
    size: '100ml',
    category: 'fresh',
    notes: ['Citrus', 'Cedar', 'Sandalwood'],
    notesGe: ['ციტრუსი', 'კედარი', 'სანდალი'],
    description: 'A fresh, clean and profoundly sensual fragrance',
    descriptionGe: 'ახალი, სუფთა და ღრმად სენსუალური ფრაგრანსი',
    imageUrl: '/images/fragrances/men/bleu-chanel.jpg',
    rating: 4.8,
    reviews: 245,
    isNew: false,
    isBestseller: true,
    isOnSale: true,
    stock: 15,
    type: 'Eau de Parfum'
  },
  {
    id: 2,
    name: 'Sauvage',
    nameGe: 'სოვაჟი',
    brand: 'Dior',
    brandGe: 'დიორი',
    price: 95,
    originalPrice: 95,
    size: '100ml',
    category: 'woody',
    notes: ['Bergamot', 'Pepper', 'Ambroxan'],
    notesGe: ['ბერგამოტი', 'პილპილი', 'ამბროქსანი'],
    description: 'Radically fresh composition with raw, noble ingredients',
    descriptionGe: 'რადიკალურად ახალი კომპოზიცია ნედლი, კეთილშობილი ინგრედიენტებით',
    imageUrl: '/images/fragrances/men/sauvage-dior.jpg',
    rating: 4.9,
    reviews: 312,
    isNew: false,
    isBestseller: true,
    isOnSale: false,
    stock: 8,
    type: 'Eau de Toilette'
  },
  {
    id: 3,
    name: 'Oud Wood',
    nameGe: 'უდ ვუდი',
    brand: 'Tom Ford',
    brandGe: 'ტომ ფორდი',
    price: 220,
    originalPrice: 220,
    size: '50ml',
    category: 'oriental',
    notes: ['Oud', 'Rose', 'Sandalwood'],
    notesGe: ['უდი', 'ვარდი', 'სანდალი'],
    description: 'Exotic blend of rare oud wood with sandalwood and rose',
    descriptionGe: 'იშვიათი უდის ხის ეგზოტიკური ნაზავი სანდალითა და ვარდით',
    imageUrl: '/images/fragrances/men/oud-wood.jpg',
    rating: 4.7,
    reviews: 156,
    isNew: true,
    isBestseller: false,
    isOnSale: false,
    stock: 5,
    type: 'Eau de Parfum'
  },
  {
    id: 4,
    name: 'Aventus',
    nameGe: 'ავენტუსი',
    brand: 'Creed',
    brandGe: 'კრიდი',
    price: 350,
    originalPrice: 350,
    size: '100ml',
    category: 'fruity',
    notes: ['Pineapple', 'Birch', 'Oakmoss'],
    notesGe: ['ანანასი', 'არყი', 'მუხის ნაცარი'],
    description: 'Legendary fruity and smoky fragrance for successful men',
    descriptionGe: 'ლეგენდარული ხილოვანი და კვამლიანი ფრაგრანსი წარმატებული მამაკაცებისთვის',
    imageUrl: '/images/fragrances/men/aventus-creed.jpg',
    rating: 4.9,
    reviews: 189,
    isNew: false,
    isBestseller: true,
    isOnSale: false,
    stock: 3,
    type: 'Eau de Parfum'
  },
  {
    id: 5,
    name: 'Stronger with You',
    nameGe: 'სტრონგერ ვით იუ',
    brand: 'Armani',
    brandGe: 'არმანი',
    price: 85,
    originalPrice: 110,
    size: '100ml',
    category: 'sweet',
    notes: ['Cardamom', 'Sage', 'Vanilla'],
    notesGe: ['ელი', 'ბაღამდარი', 'ვანილი'],
    description: 'Intense and addictive fragrance with sweet and spicy notes',
    descriptionGe: 'ინტენსიური და ამომქრალი ფრაგრანსი ტკბილი და ცხარე ნოტებით',
    imageUrl: '/images/fragrances/men/stronger-armani.jpg',
    rating: 4.6,
    reviews: 198,
    isNew: false,
    isBestseller: false,
    isOnSale: true,
    stock: 12,
    type: 'Eau de Parfum'
  },
  {
    id: 6,
    name: 'Gypsy Water',
    nameGe: 'ჯიფსი ვოტერი',
    brand: 'Byredo',
    brandGe: 'ბაირედო',
    price: 160,
    originalPrice: 160,
    size: '100ml',
    category: 'woody',
    notes: ['Pine', 'Juniper', 'Vanilla'],
    notesGe: ['ფიჭვი', 'იუნიპერი', 'ვანილი'],
    description: 'Fresh and aromatic woody fragrance inspired by the bohemian lifestyle',
    descriptionGe: 'ახალი და არომატული ხიოვანი ფრაგრანსი ბოჰემური ცხოვრების სტილით',
    imageUrl: '/images/fragrances/men/gypsy-water.jpg',
    rating: 4.5,
    reviews: 87,
    isNew: true,
    isBestseller: false,
    isOnSale: false,
    stock: 7,
    type: 'Eau de Parfum'
  }
];

const Men = () => {
  const [searchParams] = useSearchParams();
  const [language, setLanguage] = useState('en');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('name');
  const [filters, setFilters] = useState({
    brand: searchParams.get('brand') || 'all',
    category: 'all',
    priceRange: 'all',
    inStock: false
  });

  const categories = [
    { value: 'all', label: 'All Categories', labelGe: 'ყველა კატეგორია' },
    { value: 'fresh', label: 'Fresh & Aquatic', labelGe: 'ახალი & წყლოვანი' },
    { value: 'woody', label: 'Woody', labelGe: 'ხიოვანი' },
    { value: 'oriental', label: 'Oriental', labelGe: 'აღმოსავლური' },
    { value: 'fruity', label: 'Fruity', labelGe: 'ხილოვანი' },
    { value: 'sweet', label: 'Sweet & Gourmand', labelGe: 'ტკბილი & გურმანი' }
  ];

  const brands = [
    { value: 'all', label: 'All Brands', labelGe: 'ყველა ბრენდი' },
    { value: 'Chanel', label: 'Chanel', labelGe: 'შანელი' },
    { value: 'Dior', label: 'Dior', labelGe: 'დიორი' },
    { value: 'Tom Ford', label: 'Tom Ford', labelGe: 'ტომ ფორდი' },
    { value: 'Creed', label: 'Creed', labelGe: 'კრიდი' },
    { value: 'Armani', label: 'Armani', labelGe: 'არმანი' },
    { value: 'Byredo', label: 'Byredo', labelGe: 'ბაირედო' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices', labelGe: 'ყველა ფასი' },
    { value: '0-100', label: '$0 - $100', labelGe: '$0 - $100' },
    { value: '100-200', label: '$100 - $200', labelGe: '$100 - $200' },
    { value: '200-300', label: '$200 - $300', labelGe: '$200 - $300' },
    { value: '300+', label: '$300+', labelGe: '$300+' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z', labelGe: 'სახელი ა-ზ' },
    { value: 'price-low', label: 'Price: Low to High', labelGe: 'ფასი: დაბლიდან მაღლამდე' },
    { value: 'price-high', label: 'Price: High to Low', labelGe: 'ფასი: მაღლიდან დაბლამდე' },
    { value: 'rating', label: 'Highest Rated', labelGe: 'ყველაზე შეფასებული' },
    { value: 'newest', label: 'Newest First', labelGe: 'ყველაზე ახალი' }
  ];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...menFragrances];

    // Apply brand filter
    if (filters.brand !== 'all') {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(p => p === '' ? Infinity : parseInt(p));
      filtered = filtered.filter(product => {
        if (max === undefined) return product.price >= min;
        return product.price >= min && product.price <= max;
      });
    }

    // Apply stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
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

  const addToCart = (productId) => {
    // Add to cart functionality
    console.log('Added to cart:', productId);
  };

  const addToWishlist = (productId) => {
    // Add to wishlist functionality
    console.log('Added to wishlist:', productId);
  };

  return (
    <div className="men-fragrance-page">
      {/* Hero Section */}
      <section className="men-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1>{getText('Men\'s Fragrances', 'მამაკაცების ფრაგრანსები')}</h1>
            <p>{getText(
              'Discover bold, sophisticated, and masculine fragrances crafted for the modern man',
              'აღმოაჩინეთ თამამი, დახვეწილი და მამაკაცური ფრაგრანსები, შექმნილი თანამედროვე მამაკაცისთვის'
            )}</p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="page-layout">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3>{getText('Brand', 'ბრენდი')}</h3>
              <div className="filter-options">
                {brands.map(brand => (
                  <label key={brand.value} className="filter-option">
                    <input
                      type="radio"
                      name="brand"
                      value={brand.value}
                      checked={filters.brand === brand.value}
                      onChange={(e) => handleFilterChange('brand', e.target.value)}
                    />
                    <span>{getText(brand.label, brand.labelGe)}</span>
                  </label>
                ))}
              </div>
            </div>

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
              <label className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                />
                <span>{getText('In Stock Only', 'მხოლოდ საწყობში არსებული')}</span>
              </label>
            </div>
          </aside>

          {/* Main Content */}
          <main className="products-content">
            {/* Controls Bar */}
            <div className="controls-bar">
              <div className="results-info">
                <span>
                  {getText(
                    `${filteredAndSortedProducts.length} products found`,
                    `${filteredAndSortedProducts.length} პროდუქტი მოიძებნა`
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

            {/* Products Grid/List */}
            <div className={`products-container ${viewMode}`}>
              {filteredAndSortedProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <div 
                      className="image-placeholder"
                      style={{
                        background: `linear-gradient(135deg, 
                          ${product.category === 'fresh' ? '#4facfe, #00f2fe' : 
                            product.category === 'woody' ? '#667eea, #764ba2' : 
                            product.category === 'oriental' ? '#ff9a9e, #fecfef' : 
                            product.category === 'fruity' ? '#ffeaa7, #fdcb6e' : 
                            '#a8edea, #fed6e3'})`
                      }}
                    >
                      <span className="product-initial">{product.name.charAt(0)}</span>
                    </div>

                    {/* Badges */}
                    <div className="badges">
                      {product.isNew && (
                        <span className="badge new">{getText('New', 'ახალი')}</span>
                      )}
                      {product.isBestseller && (
                        <span className="badge bestseller">{getText('Bestseller', 'ბესტსელერი')}</span>
                      )}
                      {product.isOnSale && (
                        <span className="badge sale">{getText('Sale', 'აქცია')}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="product-actions">
                      <button 
                        className="action-btn wishlist"
                        onClick={() => addToWishlist(product.id)}
                      >
                        ♡
                      </button>
                      <Link 
                        to={`/${language}/product/${product.id}`}
                        className="action-btn quick-view"
                      >
                        👁
                      </Link>
                    </div>

                    {/* Stock indicator */}
                    {product.stock <= 5 && product.stock > 0 && (
                      <div className="stock-warning">
                        {getText(`Only ${product.stock} left`, `დარჩა მხოლოდ ${product.stock}`)}
                      </div>
                    )}
                  </div>

                  <div className="product-info">
                    <div className="brand-name">
                      {getText(product.brand, product.brandGe)}
                    </div>

                    <h3 className="product-name">
                      <Link to={`/${language}/product/${product.id}`}>
                        {getText(product.name, product.nameGe)}
                      </Link>
                    </h3>

                    <div className="product-rating">
                      <div className="stars">
                        {renderStars(product.rating)}
                      </div>
                      <span className="rating-text">
                        {product.rating} ({product.reviews} {getText('reviews', 'შეფასება')})
                      </span>
                    </div>

                    <div className="product-notes">
                      {getText(product.notes, product.notesGe).slice(0, 3).join(', ')}
                    </div>

                    <div className="product-pricing">
                      <span className="current-price">₾{product.price}</span>
                      {product.isOnSale && product.originalPrice > product.price && (
                        <span className="original-price">₾{product.originalPrice}</span>
                      )}
                      <span className="size">{product.size}</span>
                    </div>

                    <div className="product-footer">
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => addToCart(product.id)}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 
                          ? getText('Out of Stock', 'გაყიდულია')
                          : getText('Add to Cart', 'კალათაში დამატება')
                        }
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="no-results">
                <h3>{getText('No products found', 'პროდუქტები ვერ მოიძებნა')}</h3>
                <p>{getText(
                  'Try adjusting your filters or search criteria',
                  'სცადეთ თქვენი ფილტრების ან ძებნის კრიტერიუმების შეცვლა'
                )}</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Men;
