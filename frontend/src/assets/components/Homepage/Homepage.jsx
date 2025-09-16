import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Homepage.scss";

const Homepage = () => {
  const { language } = useParams();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const content = {
    ge: {
      hero: {
        title: "აღმოაჩინეთ თქვენი უნიკალური სუნამო",
        subtitle: "ლუქს სუნამოების ყველაზე ფართო არჩევანი საქართველოში",
        cta: "შოპინგი დაიწყეთ",
      },
      sections: {
        featured: "გამორჩეული პროდუქტები",
        newArrivals: "ახალი კოლექცია",
        bestSellers: "ბესტსელერები",
        luxury: "ლუქს ბრენდები",
        shopNow: "იყიდეთ ახლავე",
        viewAll: "ყველას ნახვა",
      },
      categories: {
        women: "ქალბატონებისთვის",
        men: "მამაკაცებისთვის", 
        unisex: "უნისექს",
        niche: "ნიშური სუნამოები",
      },
      testimonials: {
        title: "რას ამბობენ ჩვენი მომხმარებლები",
        reviews: [
          {
            name: "ნინო მ.",
            review: "ღია სუნამოების შესანიშნავი არჩევანი და პროფესიონალური მომსახურება!",
            rating: 5,
          },
          {
            name: "გიორგი კ.",
            review: "ჩემი საყვარელი მაღაზია სუნამოებისთვის. ყოველთვის ვპოულობ რაც მინდა.",
            rating: 5,
          }
        ]
      }
    },
    en: {
      hero: {
        title: "Discover Your Signature Scent",
        subtitle: "Georgia's finest collection of luxury fragrances",
        cta: "Start Shopping",
      },
      sections: {
        featured: "Featured Products",
        newArrivals: "New Arrivals",
        bestSellers: "Best Sellers",
        luxury: "Luxury Brands",
        shopNow: "Shop Now",
        viewAll: "View All",
      },
      categories: {
        women: "For Women",
        men: "For Men",
        unisex: "Unisex",
        niche: "Niche Fragrances",
      },
      testimonials: {
        title: "What Our Customers Say",
        reviews: [
          {
            name: "Nina M.",
            review: "Amazing selection of fragrances and professional service!",
            rating: 5,
          },
          {
            name: "George K.",
            review: "My favorite fragrance store. I always find what I'm looking for.",
            rating: 5,
          }
        ]
      }
    }
  };

  const heroImages = [
    {
      image: "/images/hero-luxury-1.jpg",
      alt: "Luxury Fragrance Collection"
    },
    {
      image: "/images/hero-luxury-2.jpg", 
      alt: "Premium Perfume Bottles"
    },
    {
      image: "/images/hero-luxury-3.jpg",
      alt: "Elegant Fragrance Display"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Chanel No. 5",
      brand: "Chanel",
      price: 250,
      image: "/images/chanel-no5.jpg",
      category: "women",
      isNew: false,
      isBestSeller: true,
    },
    {
      id: 2,
      name: "Sauvage",
      brand: "Dior",
      price: 180,
      image: "/images/dior-sauvage.jpg",
      category: "men",
      isNew: true,
      isBestSeller: true,
    },
    {
      id: 3,
      name: "Tom Ford Oud Wood",
      brand: "Tom Ford",
      price: 380,
      image: "/images/tomford-oudwood.jpg",
      category: "unisex",
      isNew: false,
      isBestSeller: false,
    },
    {
      id: 4,
      name: "Creed Aventus",
      brand: "Creed",
      price: 420,
      image: "/images/creed-aventus.jpg",
      category: "men",
      isNew: true,
      isBestSeller: true,
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
    ));
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-slider">
          {heroImages.map((hero, index) => (
            <div 
              key={index}
              className={`hero-slide ${index === currentHeroIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${hero.image})` }}
            >
              <div className="hero-overlay"></div>
            </div>
          ))}
        </div>
        <div className="hero-content">
          <h1 className="hero-title">{content[language]?.hero.title}</h1>
          <p className="hero-subtitle">{content[language]?.hero.subtitle}</p>
          <Link to={`/${language}/fragrance`} className="hero-cta">
            {content[language]?.hero.cta}
          </Link>
        </div>
        <div className="hero-indicators">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentHeroIndex ? 'active' : ''}`}
              onClick={() => setCurrentHeroIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-grid">
            <Link to={`/${language}/fragrance/women`} className="category-card women">
              <div className="category-image"></div>
              <h3>{content[language]?.categories.women}</h3>
            </Link>
            <Link to={`/${language}/fragrance/men`} className="category-card men">
              <div className="category-image"></div>
              <h3>{content[language]?.categories.men}</h3>
            </Link>
            <Link to={`/${language}/fragrance/unisex`} className="category-card unisex">
              <div className="category-image"></div>
              <h3>{content[language]?.categories.unisex}</h3>
            </Link>
            <Link to={`/${language}/niche`} className="category-card niche">
              <div className="category-image"></div>
              <h3>{content[language]?.categories.niche}</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <h2>{content[language]?.sections.featured}</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.isNew && <span className="badge new">New</span>}
                  {product.isBestSeller && <span className="badge bestseller">Best Seller</span>}
                </div>
                <div className="product-info">
                  <span className="brand">{product.brand}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="price">₾{product.price}</div>
                  <Link to={`/${language}/product/${product.id}`} className="product-cta">
                    {content[language]?.sections.shopNow}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="section-footer">
            <Link to={`/${language}/fragrance`} className="view-all-btn">
              {content[language]?.sections.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2>{content[language]?.testimonials.title}</h2>
          <div className="testimonials-grid">
            {content[language]?.testimonials.reviews.map((review, index) => (
              <div key={index} className="testimonial-card">
                <div className="stars">{renderStars(review.rating)}</div>
                <p className="review-text">"{review.review}"</p>
                <span className="reviewer-name">- {review.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <h2>{language === 'ge' ? 'გამოიწერეთ ჩვენი ბიულეტენი' : 'Subscribe to Our Newsletter'}</h2>
          <p>{language === 'ge' ? 'მიიღეთ ინფორმაცია ახალი პროდუქტებისა და შეთავაზებების შესახებ' : 'Get updates on new fragrances and exclusive offers'}</p>
          <div className="newsletter-form">
            <input type="email" placeholder={language === 'ge' ? 'თქვენი ელ-ფოსტა' : 'Your email address'} />
            <button type="submit">{language === 'ge' ? 'გამოწერა' : 'Subscribe'}</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
