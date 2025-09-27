// src/app/featured-products/page.js
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./featured.module.css"; // optional custom styling
import ProductCard from "../../components/ProductCard";
import { getFeaturedProducts } from "@/lib/api/auth";
import { toast } from "react-toastify";

export default function FeaturedProducts() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mobile product slider state
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [currentHairSlide1, setCurrentHairSlide1] = useState(0);
  const [currentHairSlide2, setCurrentHairSlide2] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Featured Products Data
  const featuredProducts = [
    {
      id: 1,
      image: "/card11.png",
      title: "COSMIC BODY OIL",
      desc: "Unlock celestial beauty in a bottle. A careful blend of essential oils and natural ingredients that melt into your skin, leaving you nourished and calm.",
      price: "₹1800",
      oldPrice: "₹2400",
      section: "BODY THERAPY",
    },
    {
      id: 2,
      image: "/card12.png",
      title: "LAVISH BODY SCRUB",
      desc: "A royal touch to desi household ingredients crafted for indulgence. Suitable for all skin types, and achieves smooth skin.",
      price: "₹1600",
      oldPrice: "₹2000",
      section: "BODY THERAPY",
    },
    {
      id: 3,
      image: "/card21.png",
      title: "ROYAL FACE SERUM",
      desc: "A luxurious blend of natural ingredients designed to rejuvenate and brighten your skin, revealing your natural radiance.",
      price: "₹2200",
      oldPrice: "₹2800",
      section: "SKIN THERAPY",
    },
    {
      id: 4,
      image: "/card22.png",
      title: "DIVINE FACE MASK",
      desc: "A nourishing face mask that deeply hydrates and revitalizes your skin with natural ingredients.",
      price: "₹1800",
      oldPrice: "₹2200",
      section: "SKIN THERAPY",
    },
  ];

  // Hair Therapy Products Data
  const hairTherapyProducts1 = [
    {
      id: 5,
      image: "/card11.png",
      title: "COSMIC HAIR OIL",
      desc: "Transform your hair with celestial nourishment. Natural oils blend to strengthen and add lustrous shine.",
      price: "₹1600",
      oldPrice: "₹2200",
      section: "HAIR THERAPY",
    },
    {
      id: 6,
      image: "/card12.png",
      title: "NOURISH HAIR MASK",
      desc: "Deep conditioning treatment with traditional herbs. Repairs damage and restores natural hair health.",
      price: "₹1600",
      oldPrice: "₹2200",
      section: "HAIR THERAPY",
    },
    {
      id: 7,
      image: "/card21.png",
      title: "DIVINE HAIR SERUM",
      desc: "Premium hair serum enriched with natural ingredients for silky, manageable hair with lasting shine.",
      price: "₹1600",
      oldPrice: "₹2200",
      section: "HAIR THERAPY",
    },
    {
      id: 8,
      image: "/card22.png",
      title: "ROYAL HAIR TONIC",
      desc: "Ancient Ayurvedic formula for scalp health. Promotes growth and prevents hair fall naturally.",
      price: "₹1600",
      oldPrice: "₹2200",
      section: "HAIR THERAPY",
    },
  ];

  const hairTherapyProducts2 = [
    {
      id: 9,
      image: "/card11.png",
      title: "ROYAL HAIR SERUM",
      desc: "Premium hair serum with ancient Ayurvedic ingredients. Promotes growth and adds natural shine.",
      price: "₹1900",
      oldPrice: "₹2500",
      section: "HAIR THERAPY",
    },
    {
      id: 10,
      image: "/card12.png",
      title: "HERBAL HAIR TONIC",
      desc: "Traditional herbal blend for scalp health. Strengthens roots and prevents hair fall naturally.",
      price: "₹1900",
      oldPrice: "₹2500",
      section: "HAIR THERAPY",
    },
    {
      id: 11,
      image: "/card21.png",
      title: "COSMIC HAIR ELIXIR",
      desc: "Celestial blend of natural oils and herbs. Transforms dull hair into lustrous, healthy locks.",
      price: "₹1900",
      oldPrice: "₹2500",
      section: "HAIR THERAPY",
    },
    {
      id: 12,
      image: "/card22.png",
      title: "DIVINE HAIR TREATMENT",
      desc: "Luxurious hair treatment with traditional formulations. Repairs and revitalizes from root to tip.",
      price: "₹1900",
      oldPrice: "₹2500",
      section: "HAIR THERAPY",
    },
  ];

  const testimonials = [
    {
      text: "I love this Vitamin C serum, I can see my skin becomes brighter after one to two days only which is remarkable.",
      author: "Luisa",
      rating: 4,
    },
    {
      text: "Amazing products! The quality is outstanding and the results are visible within days. Highly recommended for anyone looking for premium skincare.",
      author: "Priya",
      rating: 5,
    },
    {
      text: "The royal collection has transformed my skincare routine completely. Natural ingredients with luxurious feel and incredible results.",
      author: "Sarah",
      rating: 5,
    },
    {
      text: "Exceptional quality and packaging. The products feel premium and deliver on their promises. Worth every penny!",
      author: "Maya",
      rating: 4,
    },
    {
      text: "I've been using these products for months now and the difference is remarkable. My skin has never looked better!",
      author: "Anita",
      rating: 5,
    },
    {
      text: "The traditional formulations combined with modern science create magic. These products are truly special.",
      author: "Kavya",
      rating: 5,
    },
  ];

  const totalSlides = Math.ceil(testimonials.length / 3);
  const [featured, setFeatured] = useState([]);

   useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getFeaturedProducts();
        setFeatured(data?.data?.products || []);
        toast.success("Featured products loaded ✅");
      } catch (err) {
        console.error(err);
        toast.error(err?.message || "Failed to load featured ❌");
      } 
    };

    fetchFeatured();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const getVisibleTestimonials = () => {
    const startIndex = currentSlide * 3;
    return testimonials.slice(startIndex, startIndex + 3);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  // Mobile detection useEffect
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile product slider functions
  const nextProductSlide = () => {
    setCurrentProductSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevProductSlide = () => {
    setCurrentProductSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const nextHairSlide1 = () => {
    setCurrentHairSlide1((prev) => (prev + 1) % hairTherapyProducts1.length);
  };

  const prevHairSlide1 = () => {
    setCurrentHairSlide1((prev) => (prev - 1 + hairTherapyProducts1.length) % hairTherapyProducts1.length);
  };

  const nextHairSlide2 = () => {
    setCurrentHairSlide2((prev) => (prev + 1) % hairTherapyProducts2.length);
  };

  const prevHairSlide2 = () => {
    setCurrentHairSlide2((prev) => (prev - 1 + hairTherapyProducts2.length) % hairTherapyProducts2.length);
  };

  // Mobile testimonial slider functions
  const nextTestimonialSlide = () => {
    setCurrentTestimonialSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonialSlide = () => {
    setCurrentTestimonialSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);
  // Responsive hero banner height - same as royal-promises
  const [heroHeight, setHeroHeight] = useState("100svh");
  const [heroMinHeight, setHeroMinHeight] = useState("100vh");

  useEffect(() => {
    const computeHeroHeights = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      if (w <= 480) {
        setHeroHeight("85svh");
        setHeroMinHeight("85vh");
      } else if (w <= 768) {
        setHeroHeight("90svh");
        setHeroMinHeight("90vh");
      } else {
        setHeroHeight("100svh");
        setHeroMinHeight("100vh");
      }
    };
    computeHeroHeights();
    window.addEventListener("resize", computeHeroHeights);
    return () => window.removeEventListener("resize", computeHeroHeights);
  }, []);

  return (
    <div className="position-relative">
      {/* Hero Banner - exact clone of royal-promises */}
      <div
        className="position-relative text-white"
        style={{
          height: heroHeight,
          minHeight: heroMinHeight,
          backgroundImage: "url('/heromain.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="position-absolute"
          style={{
            top: "clamp(80px, 12vh, 120px)",
            left: "clamp(16px, 4vw, 80px)",
            right: "clamp(16px, 4vw, 80px)",
            maxWidth: "min(900px, calc(100vw - 32px))",
            pointerEvents: "none",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#FFFFFF",
              fontFamily: "Avenir, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(20px, 5.5vw, 32px)",
              lineHeight: 1.1,
              letterSpacing: 0.5,
              textTransform: "none",
              textShadow:
                "0 2px 24px rgba(0,0,0,0.55), 0 0 2px rgba(0,0,0,0.4)",
              marginTop: "60px",
            }}
          >
            Explore our wide range of luxurious skincare and wellness products
            to celebrate beauty that is timeless.
          </h1>
          <p
            style={{
              marginTop: 12,
              color: "#FFFFFF",
              fontFamily: "Avenir, sans-serif",
              fontSize: "clamp(25px, 2vw, 30px)",
              lineHeight: 1.6,
              maxWidth: "min(700px, calc(100% - 16px))",
              textShadow: "0 1px 12px rgba(0,0,0,0.45)",
              paddingRight: "8px",
            }}
          >
            शरीरमाद्यं खलु धर्मसाधनम्।
          </p>
        </div>
      </div>

      <section className="py-5 bg-light">
        <div className="container text-center">
          {/* Heading + Ornaments */}
          <div className="d-flex justify-content-center align-items-center gap-3 mb-3 flex-column">
            <div
              style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
            >
              <img
                src="/right-design.png"
                alt="Left Icon"
                style={{
                  maxWidth: "40px",
                  transform: "rotate(180deg)",
                  opacity: 0.8,
                }}
              />
              <h3
                style={{
                  fontFamily: "'Rose Velt Personal Use Only', serif",
                  fontSize: "clamp(18px, 2.2vw, 28px)",
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                  color: "#4C0A2E",
                  margin: 0,
                }}
              >
                BODY THERAPY
              </h3>
              <img
                src="/right-design.png"
                alt="Right Icon"
                style={{
                  maxWidth: "40px",
                  opacity: 0.8,
                }}
              />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontWeight: "500",
                  fontSize: "1.6rem",
                  letterSpacing: "0.5px",
                  lineHeight: "1.5",
                  margin: "0",
                  textTransform: "uppercase",
                  background:
                    "linear-gradient(45deg, rgb(111, 87, 42) 0%, rgb(213, 167, 81) 50%, rgb(111, 87, 42) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                दिव्य चांदनं त्वं मम त्वचायै च शुभम् <br />
                सौन्दर्यसाधनं मम मनःसुखदायकम्
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section
        className="d-flex justify-content-center align-items-center py-5"
        style={{
          position: "relative",
          marginTop: "-80px",
        }}
      >
        {/* Background Container - Now Responsive */}
        <div className={`w-100 ${styles.responsiveContainer}`}>
          {/* Background Image (absolute, full cover) */}
          <Image
            src="/background3.png"
            alt="Featured Background"
            fill
            style={{
              objectFit: "cover",
              zIndex: 1,
              borderRadius: "30px",
            }}
          />

          {/* Foreground content on top of image */}
          <div className={styles.responsiveContent}>
            {/* Grid of Cards */}
            <div className="container">
              {/* Desktop Grid Layout */}
              {!isMobile && (
                <div className="row gy-4">
                  {featured.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      showShloka={true}
                      showTag={true}
                      cardHeight="350px"
                    />
                  ))}
                </div>
              )}

              {/* Mobile Slider Layout */}
              {isMobile && (
                <div
                  className={`${styles.mobileSliderContainer} position-relative`}
                >
                  {/* Mobile Product Slider */}
                  <div
                    className={styles.mobileSliderTrack}
                    style={{
                      transform: `translateX(-${currentProductSlide * 100}%)`,
                    }}
                  >
                    {featuredProducts.map((product, index) => (
                      <div key={index} className={styles.mobileSlideItem}>
                        <ProductCard
                          product={product}
                          showShloka={false}
                          showTag={true}
                          cardHeight="350px"
                          isMobile={true}
                        />
                        
                        <div className="d-flex justify-content-between w-100 px-2 px-md-4 mt-2">
                          <button
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "#BA7E38",
                              color: "white",
                              borderRadius: "30px",
                              padding: "8px 20px",
                            }}
                          >
                            VIEW PRODUCT
                          </button>
                          <div className="text-end">
                            <strong style={{ fontSize: "14px", color: "#000" }}>
                              {product.price}
                            </strong>
                            <div
                              style={{
                                fontSize: "0.6rem",
                                textDecoration: "line-through",
                                color: "gray",
                              }}
                            >
                              Get 50% OFF {product.oldPrice}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Navigation Arrows */}
                  {/* Navigation arrows */}
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <button
                      onClick={prevProductSlide}
                      className="btn"
                      style={{
                        backgroundColor: "#BA7E38",
                        color: "white",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        border: "none",
                      }}
                    >
                      ‹
                    </button>

                    {/* Slide indicators */}
                    <div className="d-flex gap-2">
                      {featuredProducts.map((_, slide) => (
                        <div
                          key={slide}
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor:
                              currentProductSlide === slide
                                ? "#8B5E3C"
                                : "#ccc",
                          }}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextProductSlide}
                      className="btn"
                      style={{
                        backgroundColor: "#BA7E38",
                        color: "white",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        border: "none",
                      }}
                    >
                      ›
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container text-center">
          {/* Heading + Ornaments */}
          <div className="d-flex justify-content-center align-items-center gap-3 mb-3 flex-column">
            <div
              style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
            >
              <img
                src="/right-design.png"
                alt="Left Icon"
                style={{
                  maxWidth: "40px",
                  transform: "rotate(180deg)",
                  opacity: 0.8,
                }}
              />
              <h3
                style={{
                  fontFamily: "'Rose Velt Personal Use Only', serif",
                  fontSize: "clamp(18px, 2.2vw, 28px)",
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                  color: "#000000",
                  margin: 0,
                }}
              >
                HAIR THERAPY
              </h3>
              <img
                src="/right-design.png"
                alt="Right Icon"
                style={{
                  maxWidth: "40px",
                  opacity: 0.8,
                }}
              />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontWeight: "500",
                  fontSize: "1.6rem",
                  letterSpacing: "0.5px",
                  lineHeight: "1.5",
                  margin: "0",
                  textTransform: "uppercase",
                  background:
                    "linear-gradient(45deg, rgb(111, 87, 42) 0%, rgb(213, 167, 81) 50%, rgb(111, 87, 42) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                दिव्य चांदनं त्वं मम त्वचायै च शुभम् <br />
                सौन्दर्यसाधनं मम मनःसुखदायकम्
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section
        className="d-flex justify-content-center align-items-center py-5"
        style={{
          position: "relative",
          marginTop: "-80px",
        }}
      >
        {/* Background Container - Now Responsive */}
        <div className={`w-100 ${styles.responsiveContainer}`}>
          {/* Background Image (absolute, full cover) */}
          <Image
            src="/background3.png"
            alt="Featured Background"
            fill
            style={{
              objectFit: "cover",
              zIndex: 1,
              borderRadius: "30px",
            }}
          />

          {/* Foreground content on top of image */}
          <div className={styles.responsiveContent}>
            {/* Desktop Grid of Cards */}
            {!isMobile && (
              <div className="container">
                <div className="row gy-4">
                  {hairTherapyProducts1.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showShloka={true}
                      showTag={true}
                      cardHeight="350px"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Slider for Hair Therapy 1 */}
            {isMobile && (
              <div className="container">
                <div className={styles.mobileSliderContainer}>
                  <div
                    className={styles.mobileSliderTrack}
                    style={{
                      transform: `translateX(-${currentHairSlide1 * 100}%)`,
                    }}
                  >
                    {hairTherapyProducts1.map((product, index) => (
                      <div key={index} className={styles.mobileSlideItem}>
                        <ProductCard
                          product={product}
                          showShloka={false}
                          showTag={true}
                          cardHeight="350px"
                          isMobile={true}
                        />
                        
                        <div className="d-flex justify-content-between w-100 px-2 px-md-4 mt-2">
                          <button
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "#BA7E38",
                              color: "white",
                              borderRadius: "30px",
                              padding: "8px 20px",
                            }}
                          >
                            VIEW PRODUCT
                          </button>
                          <div className="text-end">
                            <strong style={{ fontSize: "14px", color: "#000" }}>
                              {product.price}
                            </strong>
                            <div
                              style={{
                                fontSize: "0.6rem",
                                textDecoration: "line-through",
                                color: "gray",
                              }}
                            >
                              Get 40% OFF {product.oldPrice}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation arrows */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button
                    onClick={prevHairSlide1}
                    className="btn"
                    style={{
                      backgroundColor: "#BA7E38",
                      color: "white",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      border: "none",
                    }}
                  >
                    ‹
                  </button>

                  {/* Slide indicators */}
                  <div className="d-flex gap-2">
                    {hairTherapyProducts1.map((_, slide) => (
                      <div
                        key={slide}
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor:
                            currentHairSlide1 === slide ? "#8B5E3C" : "#ccc",
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextHairSlide1}
                    className="btn"
                    style={{
                      backgroundColor: "#BA7E38",
                      color: "white",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      border: "none",
                    }}
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container text-center">
          {/* Heading + Ornaments */}
          <div className="d-flex justify-content-center align-items-center gap-3 mb-3 flex-column">
            <div
              style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
            >
              <img
                src="/right-design.png"
                alt="Left Icon"
                style={{
                  maxWidth: "40px",
                  transform: "rotate(180deg)",
                  opacity: 0.8,
                }}
              />
              <h3
                style={{
                  fontFamily: "'Rose Velt Personal Use Only', serif",
                  fontSize: "clamp(18px, 2.2vw, 28px)",
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                  color: "#000000",
                  margin: 0,
                }}
              >
                HAIR THERAPY
              </h3>
              <img
                src="/right-design.png"
                alt="Right Icon"
                style={{
                  maxWidth: "40px",
                  opacity: 0.8,
                }}
              />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontWeight: "500",
                  fontSize: "1.6rem",
                  letterSpacing: "0.5px",
                  lineHeight: "1.5",
                  margin: "0",
                  textTransform: "uppercase",
                  background:
                    "linear-gradient(45deg, rgb(111, 87, 42) 0%, rgb(213, 167, 81) 50%, rgb(111, 87, 42) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                दिव्य चांदनं त्वं मम त्वचायै च शुभम् <br />
                सौन्दर्यसाधनं मम मनःसुखदायकम्
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section
        className="d-flex justify-content-center align-items-center py-5"
        style={{
          position: "relative",
          marginTop: "-80px",
        }}
      >
        {/* Background Container - Now Responsive */}
        <div className={`w-100 ${styles.responsiveContainer}`}>
          {/* Background Image (absolute, full cover) */}
          <Image
            src="/background3.png"
            alt="Featured Background"
            fill
            style={{
              objectFit: "cover",
              zIndex: 1,
              borderRadius: "30px",
            }}
          />

          {/* Foreground content on top of image */}
          <div className={styles.responsiveContent}>
            {/* Desktop Grid of Cards */}
            {!isMobile && (
              <div className="container">
                <div className="row gy-4">
                  {hairTherapyProducts2.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showShloka={true}
                      showTag={true}
                      cardHeight="350px"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Slider for Hair Therapy 2 */}
            {isMobile && (
              <div className="container">
                <div className={styles.mobileSliderContainer}>
                  <div
                    className={styles.mobileSliderTrack}
                    style={{
                      transform: `translateX(-${currentHairSlide2 * 100}%)`,
                    }}
                  >
                    {hairTherapyProducts2.map((product, index) => (
                      <div key={index} className={styles.mobileSlideItem}>
                        <ProductCard
                          product={product}
                          showShloka={false}
                          showTag={true}
                          cardHeight="350px"
                          isMobile={true}
                        />
                        
                        <div className="d-flex justify-content-between w-100 px-2 px-md-4 mt-2">
                          <button
                            className="btn btn-sm"
                            style={{
                              backgroundColor: "#BA7E38",
                              color: "white",
                              borderRadius: "30px",
                              padding: "8px 20px",
                            }}
                          >
                            VIEW PRODUCT
                          </button>
                          <div className="text-end">
                            <strong style={{ fontSize: "14px", color: "#000" }}>
                              {product.price}
                            </strong>
                            <div
                              style={{
                                fontSize: "0.6rem",
                                textDecoration: "line-through",
                                color: "gray",
                              }}
                            >
                              Get 45% OFF {product.oldPrice}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation arrows */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button
                    onClick={prevHairSlide2}
                    className="btn"
                    style={{
                      backgroundColor: "#BA7E38",
                      color: "white",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      border: "none",
                    }}
                  >
                    ‹
                  </button>

                  {/* Slide indicators */}
                  <div className="d-flex gap-2">
                    {hairTherapyProducts2.map((_, slide) => (
                      <div
                        key={slide}
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor:
                            currentHairSlide2 === slide ? "#8B5E3C" : "#ccc",
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextHairSlide2}
                    className="btn"
                    style={{
                      backgroundColor: "#BA7E38",
                      color: "white",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      border: "none",
                    }}
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-5 bg-white text-center">
        {/* Heading with left and right decorative images */}
        <div className="d-flex justify-content-center align-items-center gap-3 mb-2">
          <Image
            src="/left-design.png"
            alt="left decorative"
            width={32}
            height={32}
          />
          <h2
            style={{
              fontFamily: "'Rose Velt Personal Use Only', serif",
              color: "#4C0A2E",
              fontWeight: "bold",
              fontSize: "1.6rem",
              letterSpacing: "1px",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            <span style={{ fontSize: "1.8rem" }}>T</span>ESTIMONIALS
          </h2>
          <Image
            src="/right-design.png"
            alt="right decorative"
            width={32}
            height={32}
          />
        </div>
        {/* Subtitle */}
        <p
          className="text-muted mb-5"
          style={{ fontSize: "0.9rem", fontFamily: "Arial, sans-serif" }}
        >
          Some quotes from our happy customers
        </p>

        {/* Desktop Layout */}
        {!isMobile && (
          <div
            className="d-flex justify-content-center align-items-center gap-3"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Left arrow - Always visible */}
            <button
              onClick={prevSlide}
              className="btn testimonial-arrow-left"
              style={{
                color: "#5c0b28",
                fontSize: "1.5rem",
                userSelect: "none",
                marginLeft: "50px",
                border: "2px solid #5c0b28",
                borderRadius: "4px",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#5c0b28";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#5c0b28";
              }}
              aria-label="Previous"
            >
              &#x276E;
            </button>

            {/* Cards container */}
            <div className="container p-0" style={{ maxWidth: "1000px" }}>
              <div className="row justify-content-center gy-4">
                {getVisibleTestimonials().map((testimonial, idx) => (
                  <div key={currentSlide * 3 + idx} className="col-12 col-md-4">
                    <div
                      className="card shadow-sm"
                      style={{
                        minHeight: "250px",
                        borderRadius: "8px",
                        padding: "20px",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-5px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.95rem",
                          lineHeight: "1.5",
                          fontFamily: "Georgia, serif",
                          marginBottom: "20px",
                        }}
                      >
                        <span style={{ fontWeight: "bold", color: "#5c0b28" }}>
                          &ldquo;
                        </span>
                        {testimonial.text}
                        <span style={{ fontWeight: "bold", color: "#5c0b28" }}>
                          &rdquo;
                        </span>
                      </p>
                      <div className="d-flex align-items-center mt-auto">
                        <div
                          className="rounded-circle"
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#BA7E38",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                          }}
                        >
                          {testimonial.author.charAt(0)}
                        </div>
                        <span
                          className="ms-3 text-dark"
                          style={{
                            fontFamily: "Georgia, serif",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                          }}
                        >
                          — {testimonial.author}
                        </span>
                      </div>
                      <div
                        className="mt-3"
                        style={{ fontSize: "1.1rem", color: "#BA7E38" }}
                      >
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i}>
                            {i < testimonial.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right arrow - Always visible */}
            <button
              onClick={nextSlide}
              className="btn testimonial-arrow-right"
              style={{
                color: "#5c0b28",
                fontSize: "1.5rem",
                userSelect: "none",
                marginRight: "50px",
                border: "2px solid #5c0b28",
                borderRadius: "4px",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#5c0b28";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#5c0b28";
              }}
              aria-label="Next"
            >
              &#x276F;
            </button>
          </div>
        )}

        {/* Mobile Layout */}
        {isMobile && (
          <div className="container">
            <div className={styles.mobileSliderContainer}>
              <div
                className={styles.mobileSliderTrack}
                style={{
                  transform: `translateX(-${currentTestimonialSlide * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className={styles.mobileSlideItem}>
                    <div
                      className="card shadow-sm"
                      style={{
                        minHeight: "280px",
                        borderRadius: "12px",
                        padding: "25px",
                        margin: "0 10px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.9rem",
                          lineHeight: "1.6",
                          fontFamily: "Georgia, serif",
                          marginBottom: "20px",
                          textAlign: "center",
                        }}
                      >
                        <span style={{ fontWeight: "bold", color: "#5c0b28" }}>
                          &ldquo;
                        </span>
                        {testimonial.text}
                        <span style={{ fontWeight: "bold", color: "#5c0b28" }}>
                          &rdquo;
                        </span>
                      </p>
                      <div className="d-flex flex-column align-items-center mt-auto">
                        <div
                          className="rounded-circle mb-2"
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#BA7E38",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "1.4rem",
                          }}
                        >
                          {testimonial.author.charAt(0)}
                        </div>
                        <span
                          className="text-dark text-center"
                          style={{
                            fontFamily: "Georgia, serif",
                            fontWeight: "600",
                            fontSize: "1rem",
                          }}
                        >
                          — {testimonial.author}
                        </span>
                        <div
                          className="mt-2"
                          style={{ fontSize: "1.2rem", color: "#BA7E38" }}
                        >
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i}>
                              {i < testimonial.rating ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
              <button
                onClick={prevTestimonialSlide}
                style={{
                  backgroundColor: "#BA7E38",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "45px",
                  height: "45px",
                  fontSize: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                &#x276E;
              </button>

              {/* Mobile Slide Indicators */}
              <div className="d-flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialSlide(index)}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      border: "none",
                      backgroundColor:
                        currentTestimonialSlide === index ? "#8B5E3C" : "#ddd",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonialSlide}
                style={{
                  backgroundColor: "#BA7E38",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "45px",
                  height: "45px",
                  fontSize: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                &#x276F;
              </button>
            </div>
          </div>
        )}

        <style jsx>{`
          @media (max-width: 768px) {
            .testimonial-arrow-left {
              font-size: 1.5rem !important;
              margin-left: 20px !important;
            }
            .testimonial-arrow-right {
              font-size: 1.5rem !important;
              margin-right: 20px !important;
            }
          }
          @media (max-width: 480px) {
            .testimonial-arrow-left {
              font-size: 1.2rem !important;
              margin-left: 10px !important;
            }
            .testimonial-arrow-right {
              font-size: 1.2rem !important;
              margin-right: 10px !important;
            }
          }
        `}</style>
        
        <style jsx>{`
          @media (max-width: 480px) {
            :global(.position-absolute) {
              left: clamp(12px, 3vw, 16px) !important;
              right: 12px !important;
              max-width: calc(100vw - 24px) !important;
              padding-right: 6px !important;
            }
            
            :global(.position-absolute h1) {
              font-size: clamp(18px, 4.5vw, 24px) !important;
              line-height: 1.15 !important;
              margin-top: 40px !important;
              padding-right: 6px !important;
            }
            
            :global(.position-absolute p) {
              font-size: clamp(20px, 1.8vw, 24px) !important;
              line-height: 1.4 !important;
              margin-top: 8px !important;
              max-width: calc(100% - 6px) !important;
              padding-right: 6px !important;
            }
          }
          
          @media (max-width: 468px) {
            :global(.position-absolute) {
              left: 10px !important;
              right: 10px !important;
              max-width: calc(100vw - 20px) !important;
              padding-right: 4px !important;
            }
            
            :global(.position-absolute h1) {
              font-size: 16px !important;
              line-height: 1.1 !important;
              margin-top: 35px !important;
              padding-right: 4px !important;
            }
            
            :global(.position-absolute p) {
              font-size: 18px !important;
              line-height: 1.3 !important;
              margin-top: 6px !important;
              max-width: calc(100% - 4px) !important;
              padding-right: 4px !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
}
