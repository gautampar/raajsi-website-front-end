"use client";
import Image from "next/image";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ProductCard from "../components/ProductCard";

export default function HomePage({ onAddToCart }) {

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showNextSection, setShowNextSection] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [strip1Visible, setStrip1Visible] = useState(false);
  const [strip2Visible, setStrip2Visible] = useState(false);
  const [strip3Visible, setStrip3Visible] = useState(false);
  const [royalPromiseSlide, setRoyalPromiseSlide] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Royal Promises content
  const ROYAL_PROMISES = [
    {
      title: "THE ROYAL PROMISE 1",
      description:
        "At Raajsi, luxury meets responsibility. Our royal promise is built on integrity, transparency, and timeless care — for you and the planet.",
      highlight:
        "Time-tested formulas derived from ancient sciences and scriptures",
      detail:
        "Rooted in Ayurveda and proven through generations of ritual wisdom.",
      image: "/rph.png",
    },
    {
      title: "THE ROYAL PROMISE 2",
      description:
        "At Raajsi, luxury meets responsibility. Our royal promise is built on integrity, transparency, and timeless care — for you and the planet.",
      highlight:
        "Time-tested formulas derived from ancient sciences and scriptures",
      detail:
        "Rooted in Ayurveda and proven through generations of ritual wisdom.",
      image: "/rph.png",
    },
    {
      title: "THE ROYAL PROMISE 3",
      description:
        "At Raajsi, luxury meets responsibility. Our royal promise is built on integrity, transparency, and timeless care — for you and the planet.",
      highlight:
        "Time-tested formulas derived from ancient sciences and scriptures",
      detail:
        "Rooted in Ayurveda and proven through generations of ritual wisdom.",
      image: "/rph.png",
    },
  ];

  const SECTIONS = [
    {
      key: "body-therapy",
      badge: "BODY THERAPY",
      badgeStyle: { backgroundColor: "#BA7E38", color: "#fff" },
    },
    {
      key: "skin-therapy",
      badge: "SKIN THERAPY",
      badgeStyle: { backgroundColor: "#BA7E38", color: "#fff" },
    },
    {
      key: "hair-therapy",
      badge: "HAIR THERAPY",
      badgeStyle: { backgroundColor: "#BA7E38", color: "#fff" },
    },
    {
      key: "ritual-kit",
      badge: "RITUAL KIT",
      badgeStyle: { backgroundColor: "#BA7E38", color: "#fff" },
    },
  ];
  const CARDS = [
    // Body Therapy - 4 cards
    {
      image: "/card11.png",
      title: "COSMIC BODY OIL",
      desc: "Unlock celestial beauty in a bottle. A careful blend of essential oils and natural ingredients that melt into your skin, leaving you nourished and calm.",
      price: "₹1800",
      oldPrice: "₹2400",
      section: "BODY THERAPY",
    },
    {
      image: "/card12.png",
      title: "LAVISH BODY SCRUB",
      desc: "A royal touch to desi household ingredients crafted for indulgence. Suitable for all skin types, and achieves smooth skin.",
      price: "₹1600",
      oldPrice: "₹2000",
      section: "BODY THERAPY",
    },
    {
      image: "/card11.png",
      title: "ROYAL BODY BUTTER",
      desc: "Luxurious body butter enriched with natural ingredients that deeply moisturize and nourish your skin for a royal glow.",
      price: "₹1900",
      oldPrice: "₹2300",
      section: "BODY THERAPY",
    },
    {
      image: "/card12.png",
      title: "DIVINE BODY LOTION",
      desc: "A lightweight yet nourishing body lotion that absorbs quickly and leaves your skin feeling silky smooth all day.",
      price: "₹1400",
      oldPrice: "₹1700",
      section: "BODY THERAPY",
    },
    // Skin Therapy - 4 cards
    {
      image: "/card21.png",
      title: "ROYAL FACE SERUM",
      desc: "A luxurious blend of natural ingredients designed to rejuvenate and brighten your skin, revealing your natural radiance.",
      price: "₹2200",
      oldPrice: "₹2800",
      section: "SKIN THERAPY",
    },
    {
      image: "/card22.png",
      title: "DIVINE FACE MASK",
      desc: "A nourishing face mask that deeply hydrates and revitalizes your skin with natural ingredients.",
      price: "₹1800",
      oldPrice: "₹2200",
      section: "SKIN THERAPY",
    },
    {
      image: "/card21.png",
      title: "RADIANT FACE CREAM",
      desc: "Premium anti-aging face cream that reduces fine lines and restores your skin's natural luminosity.",
      price: "₹2500",
      oldPrice: "₹3000",
      section: "SKIN THERAPY",
    },
    {
      image: "/card22.png",
      title: "GOLDEN FACE CLEANSER",
      desc: "Gentle yet effective cleanser that removes impurities while maintaining your skin's natural moisture balance.",
      price: "₹1500",
      oldPrice: "₹1900",
      section: "SKIN THERAPY",
    },
    // Hair Therapy - 4 cards
    {
      image: "/card11.png",
      title: "DIVINE HAIR OIL",
      desc: "Nourish your hair with this ancient formula that strengthens roots and promotes healthy, lustrous hair growth.",
      price: "₹1400",
      oldPrice: "₹1800",
      section: "HAIR THERAPY",
    },
    {
      image: "/card12.png",
      title: "ROYAL HAIR SERUM",
      desc: "A premium hair serum that repairs damage and adds shine to your tresses with royal care.",
      price: "₹1600",
      oldPrice: "₹2000",
      section: "HAIR THERAPY",
    },
    {
      image: "/card1.png",
      title: "LUSTROUS HAIR MASK",
      desc: "Deep conditioning hair mask that repairs damaged hair and restores natural shine and strength.",
      price: "₹1800",
      oldPrice: "₹2200",
      section: "HAIR THERAPY",
    },
    {
      image: "/card2.png",
      title: "SILKY HAIR CONDITIONER",
      desc: "Nourishing conditioner that detangles and softens hair while providing long-lasting moisture and protection.",
      price: "₹1200",
      oldPrice: "₹1500",
      section: "HAIR THERAPY",
    },
    // Ritual Kit - 4 cards
    {
      image: "/card21.png",
      title: "SACRED BATH SALT",
      desc: "Transform your bathing experience with these therapeutic salts that relax your mind and soothe your body.",
      price: "₹1200",
      oldPrice: "₹1500",
      section: "RITUAL KIT",
    },
    {
      image: "/card22.png",
      title: "ROYAL RITUAL SET",
      desc: "Complete ritual set including bath salts, body oil, and scrub for a complete royal experience.",
      price: "₹2800",
      oldPrice: "₹3500",
      section: "RITUAL KIT",
    },
    {
      image: "/card51.png",
      title: "TRANQUIL ESSENCE SET",
      desc: "A curated collection of aromatherapy essentials designed to create a peaceful and rejuvenating ritual experience.",
      price: "₹2400",
      oldPrice: "₹3000",
      section: "RITUAL KIT",
    },
    {
      image: "/card52.png",
      title: "BLISSFUL RITUAL DUO",
      desc: "Perfect pairing of bath oils and candles to transform your daily routine into a luxurious spa-like experience.",
      price: "₹2000",
      oldPrice: "₹2500",
      section: "RITUAL KIT",
    },
  ];
  const [sectionIdx, setSectionIdx] = useState(0);
  const [cardStartIndex, setCardStartIndex] = useState(0);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);
  const section = SECTIONS[sectionIdx];

  // Filter cards by current section
  const sectionCards = CARDS.filter(card => card.section === section.badge);



  // Automatic slider functionality for Royal Promises
  useEffect(() => {
    const royalInterval = setInterval(() => {
      setRoyalPromiseSlide((prev) => (prev + 1) % ROYAL_PROMISES.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(royalInterval);
  }, [ROYAL_PROMISES.length]);

  const handlePrev = () => {
    setSectionIdx((prev) => (prev === 0 ? SECTIONS.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setSectionIdx((prev) => (prev === SECTIONS.length - 1 ? 0 : prev + 1));
  };

  // Card carousel functions - now works with pairs of cards within current section
  const handleCardPrev = () => {
    setCardStartIndex((prev) => Math.max(0, prev - 2)); // Move by 2 cards at a time within current section
    setMobileCardIndex((prev) => Math.max(0, prev - 1)); // Move by 1 card for mobile
  };
  const handleCardNext = () => {
    setCardStartIndex((prev) => Math.min(sectionCards.length - 2, prev + 2)); // Move by 2 cards at a time within current section
    setMobileCardIndex((prev) => Math.min(sectionCards.length - 1, prev + 1)); // Move by 1 card for mobile
  };
  const handleTabClick = (idx) => {
    setSectionIdx(idx);
    // Reset card positions when switching tabs
    setCardStartIndex(0);
    setMobileCardIndex(0);
  };

  // Card navigation functions
  const handleCardClick = (cardIndex) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentCardIndex(cardIndex);

    // If this is the last card (index 2), show next section after animation
    if (cardIndex === 2) {
      setTimeout(() => {
        setShowNextSection(true);
        // Scroll to next section
        document.getElementById("featured-products-section")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 1000);
    }

    // Reset transition after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const resetToOriginal = () => {
    setCurrentCardIndex(0);
    setShowNextSection(false);
  };

  // Touch/swipe functionality
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 80; // Increased threshold to prevent accidental scrolls
    const isRightSwipe = distance < -80; // Increased threshold to prevent accidental scrolls

    if (isLeftSwipe || isRightSwipe) {
      e.preventDefault();
    }

    // Check if we're on mobile (screen width < 768px)
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Mobile: Navigate within current section (single cards)
      if (isLeftSwipe && mobileCardIndex < sectionCards.length - 1) {
        setMobileCardIndex(prev => prev + 1);
      }
      if (isRightSwipe && mobileCardIndex > 0) {
        setMobileCardIndex(prev => prev - 1);
      }
    } else {
      // Desktop: Navigate between card pairs within current section
      if (isLeftSwipe && cardStartIndex < sectionCards.length - 2) {
        handleCardNext();
      }
      if (isRightSwipe && cardStartIndex > 0) {
        handleCardPrev();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mouse drag functionality
  const [mouseStart, setMouseStart] = useState(null);
  const [mouseEnd, setMouseEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setMouseStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setMouseEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!mouseStart || !mouseEnd || !isDragging) return;

    const distance = mouseStart - mouseEnd;
    const isLeftSwipe = distance > 80; // Increased threshold
    const isRightSwipe = distance < -80; // Increased threshold

    if (isLeftSwipe && cardStartIndex < sectionCards.length - 2) {
      // Navigate within current section only
      handleCardNext();
    }
    if (isRightSwipe && cardStartIndex > 0) {
      handleCardPrev();
    }

    setMouseStart(null);
    setMouseEnd(null);
    setIsDragging(false);
  };

  // Wheel event for touchpad scrolling
  const handleWheel = (e) => {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 50;
    if (!isHorizontal) return; // allow normal vertical scroll
    e.preventDefault();
    if (isHorizontal) {
      // Added minimum threshold
      // Horizontal scroll detected with minimum threshold
      if (e.deltaX > 0 && cardStartIndex < sectionCards.length - 2) {
        // Navigate within current section only
        handleCardNext();
      } else if (e.deltaX < 0 && cardStartIndex > 0) {
        handleCardPrev();
      }
    }
  };

  // Parallax scroll handler for card animations
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);

      // Get the royal indulgence section
      const royalSection = document.getElementById("royal-indulgence-section");
      if (royalSection) {
        const sectionTop = royalSection.offsetTop;
        const sectionHeight = royalSection.offsetHeight;
        const windowHeight = window.innerHeight;

        // Parallax effect calculations
        const scrollProgress =
          (scrollPosition - sectionTop) / (sectionHeight - windowHeight);
        const normalizedProgress = Math.max(0, Math.min(1, scrollProgress));

        // Staggered card reveal with parallax
        const strip1Threshold = 0.2; // 20% scroll progress
        const strip2Threshold = 0.5; // 50% scroll progress
        const strip3Threshold = 0.8; // 80% scroll progress

        setStrip1Visible(normalizedProgress >= strip1Threshold);
        setStrip2Visible(normalizedProgress >= strip2Threshold);
        setStrip3Visible(normalizedProgress >= strip3Threshold);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Responsive hero banner height
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
    <>
      <div
        className="position-relative text-white home-hero"
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
            left: "clamp(24px, 6vw, 80px)",
            maxWidth: "900px",
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#FFFFFF",
              fontWeight: 500,
              fontSize: "clamp(22px, 3.2vw, 42px)",
              lineHeight: 1.28,
              letterSpacing: "0.3px",
              textShadow:
                "0 2px 24px rgba(0,0,0,0.55), 0 0 2px rgba(0,0,0,0.4)",
              marginTop: "70px",
              paddingTop: "4px",
            }}
          >
            मुग्धे! धानुष्कता केयमपूर्वा त्वयि दृश्यते <br />
            यया विध्यसि चेतांसि गुणैरेव न सायकैः
          </p>
        </div>

        <div className="position-absolute start-50 translate-middle-x" style={{ bottom: "128px" }}>
          <Link href="#our-essence" style={{ textDecoration: "none" }}>
            <Image src="/down-arrow.svg" alt="Royal Logo" width={42} height={42} style={{ objectFit: "contain" }} />
            {/* <span
              style={{
                width: "32px",
                height: "32px",
                border: "1px solid #FFFFFF",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backgroundColor: "transparent",
                color: "#FFFFFF",
                fontSize: "0.8rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            >
              &#8595;
            </span> */}
          </Link>
        </div>
      </div>
      <div className="our-section">
        <div className="our-row">
          <div className="our-img">
            <Image
              src="/es2.png"
              width={787}
              height={611}
              alt="Royal Logo"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 787px"
            />

          </div>
          <div className="our-content">
            <h2 className="m-0"
              style={{
                color: "#4C0A2E",
                fontWeight: 400,
                fontFamily: "'Rose Velt Personal Use Only', serif",
                fontSize: "clamp(22px, 2.8vw, 32px)",
                letterSpacing: "0.5px",
                lineHeight: "1.2",
                paddingBottom: "30px",
                textTransform: "none",
              }}
            >
              Our Essence
            </h2>

            <p
              style={{
                fontSize: "clamp(14px, 1.3vw, 24px)",
                fontWeight: 400,
                marginBottom: "2px",
                background:
                  "linear-gradient(45deg, rgb(111, 87, 42) 0%, rgb(213, 167, 81) 50%, rgb(111, 87, 42) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                display: "block",
                lineHeight: "1.4",
              }}
            >
              मुग्धे! धानुष्कता केयमपूर्वा त्वयि दृश्यते । <br />
              यया विध्यसि चेतांसि गुणैरेव न सायकैः ॥
            </p>

            <p
              style={{
                fontSize: "clamp(14px, 1.2vw, 18px)",
                fontFamily: "Avenir, sans-serif",
                fontWeight: 400,
                color: "#000",
                fontStyle: "Roman",
                lineHeight: "1.6",
                marginTop: "18px",
                marginBottom: 0,
                maxWidth: "400px",
              }}
            >
              Raajsi is a premium ayurvedic beauty and wellness brand with a royal touch.
            </p>

            <p
              style={{
                fontSize: "clamp(14px, 1.2vw, 18px)",
                fontFamily: "Avenir, sans-serif",
                fontWeight: 400,
                color: "#000",
                lineHeight: "1.6",
                marginTop: "18px",
                marginBottom: 0,
                maxWidth: "400px",
              }}
            >Combining elements of regal rituals and ayurveda, we invite you to immerse yourself in the scents, texture and colours of our heritage.</p>

            <Link
              href="/our-essence"
              className="btn mt-3"
              style={{
                backgroundColor: "#BA7E38",
                color: "#FFFFFF",
                borderRadius: 30,
                padding: "10px 24px",
                fontWeight: 400,
                letterSpacing: "0.5px",
              }}
            >
              EXPLORE ESSENCE
            </Link>
          </div>
        </div>
      </div>
      {/* <div
        className="position-relative our-section"
        id="our-essence"
      >

        <div className="container-fluid px-0 position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center g-0 text-center text-md-start">
            <div className="col-12 col-md-6 px-0">
              <div
                style={{
                  height: "450px",
                  width: "100%",
                  backgroundImage: 'url("/es2.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "left center",
                  backgroundRepeat: "no-repeat",
                }}
                aria-label="RAAJSI essence visual"
                role="img"
              />
            </div>

            <div className="col-12 col-md-6 ps-md-5 pe-md-4 py-4">
              <h2 className="m-0"
                style={{
                  color: "#4C0A2E",
                  fontWeight: 400,
                  fontFamily: "'Rose Velt Personal Use Only', serif",
                  fontSize: "clamp(22px, 2.8vw, 32px)",
                  letterSpacing: "0.5px",
                  lineHeight: "1.2",
                  paddingBottom: "30px",
                  textTransform: "none",
                }}
              >
                Our Essence
              </h2>

              <p
                style={{
                  fontSize: "clamp(14px, 1.3vw, 24px)",
                  fontWeight: 400,
                  marginBottom: "2px",
                  background:
                    "linear-gradient(45deg, rgb(111, 87, 42) 0%, rgb(213, 167, 81) 50%, rgb(111, 87, 42) 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  display: "block",
                  lineHeight: "1.4",
                }}
              >
                मुग्धे! धानुष्कता केयमपूर्वा त्वयि दृश्यते । <br />
                यया विध्यसि चेतांसि गुणैरेव न सायकैः ॥
              </p>

              <p
                style={{
                  fontSize: "clamp(14px, 1.2vw, 18px)",
                  fontFamily: "Avenir, sans-serif",
                  fontWeight: 400,
                  color: "#000",
                  fontStyle: "Roman",
                  lineHeight: "1.6",
                  marginTop: "18px",
                  marginBottom: 0,
                  maxWidth: "400px",
                }}
              >
                Raajsi is a premium ayurvedic beauty and wellness brand with a royal touch.
              </p>

              <p
                style={{
                  fontSize: "clamp(14px, 1.2vw, 18px)",
                  fontFamily: "Avenir, sans-serif",
                  fontWeight: 400,
                  color: "#000",
                  lineHeight: "1.6",
                  marginTop: "18px",
                  marginBottom: 0,
                  maxWidth: "400px",
                }}
              >Combining elements of regal rituals and ayurveda, we invite you to immerse yourself in the scents, texture and colours of our heritage.</p>

              <Link
                href="/our-essence"
                className="btn mt-3"
                style={{
                  backgroundColor: "#BA7E38",
                  color: "#FFFFFF",
                  borderRadius: 30,
                  padding: "10px 24px",
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                }}
              >
                EXPLORE ESSENCE
              </Link>
            </div>
          </div>
        </div>
      </div> */}
      {/* <section className="step-section">
        <div className="step-title">
          <Image src="/assets/wrapper1.svg" height={53} width={38} />
          <h6 className="step-section-title">Step into royal indulgence.</h6>
          <Image style={{ rotate: "180deg" }} src="/assets/wrapper1.svg" height={53} width={38} />
        </div>
        <div className="step-box">
          <div className="flex justify-between">
            <div className="max-w-[538px] pt-[15px] w-full">
              <h6 className="font-[400] text-[24px] tracking-[4%] text-[#4C0A2E]">From Palace to You: A Body Ritual</h6>
            </div>
            <div className="h-[380px] w-full max-w-[335px]">
              <Image
                src="/image3.png"
                alt="image"
                height={380} width={335}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section> */}

      <style jsx>{`
        .custom-overlay-text {
          max-width: 800px;
          color: #FFFFFF;
          font-family: "Abel, sans-serif";
          font-size: 30px;
          line-height: 140%;
        }

        @media (max-width: 768px) {
          .custom-overlay-text {
            font-size: 20px !important;
            line-height: 130% !important;
            padding: 15px !important;
            max-width: 90% !important;
          }
          
          /* Gradient text consistency for mobile */
          p[style*="background-clip"] {
            background: linear-gradient(45deg, rgb(111, 87, 42) 0%,rgb(111, 87, 42) 30%, rgb(213, 167, 81) 100%) !important;
            background-clip: text !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
          }
        }

        @media (max-width: 480px) {
          .custom-overlay-text {
            font-size: 14px !important;
            line-height: 120% !important;
            padding: 8px !important;
            max-width: 96% !important;
          }
        }
      `}</style>

      <style jsx>{`
        @media (max-width: 768px) {
          #royal-indulgence-section {
            margin-top: 40px !important;
            padding-top: 80px !important;
            padding-bottom: 40px !important;
            min-height: auto !important;
            overflow: hidden !important;
          }
          
          #royal-indulgence-section .position-absolute {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            margin-bottom: 30px !important;
          }
          
          .step-royal-row {
            flex-direction: row !important;
            gap: 5px !important;
            width: 100% !important;
            max-width: 100% !important;
            justify-content: center !important;
            align-items: center !important;
          }
          
          .step-royal-row .col-auto {
            margin-bottom: 0 !important;
            width: auto !important;
            flex-shrink: 0 !important;
          }
          
          .step-royal-row h2 {
            font-size: 1.3rem !important;
            text-align: center !important;
            padding: 0 8px !important;
            word-wrap: break-word !important;
            white-space: nowrap !important;
            margin: 0 !important;
          }
          
          .step-royal-row h2 span {
            font-size: 1.6rem !important;
          }
          
          .step-royal-row img {
            max-width: 35px !important;
            height: auto !important;
          }
          
          #royal-indulgence-section .container {
            margin-top: 0 !important;
            padding: 0 15px !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          
          #royal-indulgence-section .row {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 20px 10px !important;
            min-height: auto !important;
            flex-direction: row !important;
            justify-content: center !important;
            align-items: center !important;
          }
          
          #royal-indulgence-section .col-md-7 {
            margin-top: 20px !important;
            padding: 0 10px !important;
            width: 100% !important;
          }
          
          #royal-indulgence-section h5 {
            font-size: 1rem !important;
            text-align: center !important;
            margin-bottom: 15px !important;
          }
          
          #royal-indulgence-section h5 span {
            font-size: 1.2rem !important;
          }
          
          #royal-indulgence-section p {
            font-size: 0.85rem !important;
            line-height: 130% !important;
            text-align: center !important;
            padding: 0 10px !important;
          }
        }
        
        @media (max-width: 480px) {
          #royal-indulgence-section {
            margin-top: 15px !important;
            padding-top: 50px !important;
            padding-bottom: 25px !important;
          }
          
          .step-royal-row h2 {
            font-size: 1.1rem !important;
            padding: 0 3px !important;
            white-space: nowrap !important;
            margin: 0 !important;
          }
          
          .step-royal-row h2 span {
            font-size: 1.3rem !important;
          }
          
          .step-royal-row img {
            max-width: 24px !important;
            height: auto !important;
          }
          
          #royal-indulgence-section .container {
            padding: 0 8px !important;
          }
          
          #royal-indulgence-section .row {
            padding: 12px 3px !important;
          }
          
          #royal-indulgence-section .col-md-7 {
            padding: 0 3px !important;
          }
          
          #royal-indulgence-section h5 {
            font-size: 0.85rem !important;
          }
          
          #royal-indulgence-section h5 span {
            font-size: 1rem !important;
          }
          
          #royal-indulgence-section p {
            font-size: 0.75rem !important;
            padding: 0 3px !important;
          }
        }
      `}</style>
      <style jsx>{`
        @media (max-width: 768px) {
          #our-essence {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
            margin-top: 20px !important;
            margin-bottom: 20px !important;
          }
          #our-essence .container {
            padding-left: 15px !important;
            padding-right: 15px !important;
          }
          #our-essence .row {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
          }
          #our-essence .col-12.col-md-4 {
            max-width: 100% !important;
            flex: 0 0 100% !important;
            margin-bottom: 30px !important;
            padding: 0 15px !important;
          }
          #our-essence h2 {
            font-size: 1.8rem !important;
            margin-bottom: 20px !important;
          }
          #our-essence p {
            font-size: 1rem !important;
            margin-bottom: 15px !important;
            padding: 0 10px !important;
          }
          #our-essence p[style*="font-devanagari"] {
            font-size: 0.95rem !important;
            line-height: 1.3 !important;
            margin-bottom: 12px !important;
            padding: 0 5px !important;
          }
          #our-essence p[style*="marginTop"] {
            margin-top: 12px !important;
          }
          #our-essence .fst-italic {
            font-size: 0.9rem !important;
            margin-bottom: 20px !important;
          }
          #our-essence .btn {
            font-size: 0.9rem !important;
            padding: 0.6rem 1.2rem !important;
            width: 160px !important;
            height: 45px !important;
          }
          #our-essence div[style*="background-image"] {
            height: 45vh !important;
            min-height: 220px !important;
            max-height: 360px !important;
            width: 100% !important;
            margin: 0 !important;
            background-position: 50% !important;
            background-size: cover !important;
          }
        }
        
        @media (max-width: 480px) {
          #our-essence h2 {
            font-size: 1.4rem !important;
          }
          #our-essence p {
            font-size: 0.85rem !important;
          }
          #our-essence p[style*="font-devanagari"] {
            font-size: 0.8rem !important;
            line-height: 1.2 !important;
            margin-bottom: 8px !important;
            padding: 0 2px !important;
          }
          #our-essence p[style*="marginTop"] {
            margin-top: 8px !important;
          }
          #our-essence .fst-italic {
            font-size: 0.75rem !important;
          }
          #our-essence div[style*="background-image"] {
            height: 35vh !important;
            min-height: 180px !important;
            max-height: 300px !important;
            width: 100% !important;
            margin: 0 !important;
            background-position: 50% !important;
            background-size: cover !important;
          }
          .royal-promise-section {
            min-height: 420px !important;
            max-width: 97% !important;
            margin: 15px auto !important;
            border-radius: 10px !important;
            padding: 12px 0 !important;
          }
          .royal-promise-section .container {
            padding: 0 8px !important;
          }
          .royal-promise-section h3 {
            font-size: 1.4rem !important;
            margin-bottom: 10px !important;
          }
          .royal-promise-section h3 span {
            font-size: 1.6rem !important;
          }
          .royal-promise-section p {
            font-size: 0.75rem !important;
            padding: 0 3px !important;
            margin: 0 auto 10px auto !important;
          }
          .royal-promise-section .fst-italic {
            font-size: 0.85rem !important;
          }
          .royal-promise-section .btn {
            width: 130px !important;
            height: 36px !important;
            font-size: 0.85rem !important;
          }
          .royal-promise-section img[alt="Royal Promise"] {
            max-width: 93% !important;
            max-height: 200px !important;
          }
        }
      `}</style>

      <section
        id="royal-indulgence-section"
        className="position-relative"
        style={{
          backgroundImage: "url('/background3.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          minHeight: "788px",
          paddingTop: "190px",
          paddingBottom: "80px",
        }}
      >
        {/* Scroll trigger logic */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
      document.addEventListener("DOMContentLoaded", function () {
        const lastStrip = document.querySelectorAll('.left-text-strip')[2];
        if (lastStrip) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                // Wait for animation duration before scrolling
                setTimeout(() => {
                  const currentSection = document.getElementById('royal-indulgence-section');
                  const nextSection = currentSection.nextElementSibling;
                  if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 1000); // matches your CSS animation timing
                observer.disconnect();
              }
            });
          }, { threshold: 1 });
          observer.observe(lastStrip);
        }
      });
    `,
          }}
        />

        <div
          className="position-absolute w-100"
          style={{
            top: "30px",
            left: 0,
            textAlign: "center",
          }}
        >
          <div className="row step-royal-row justify-content-center align-items-center">
            <div className="col-auto d-flex justify-content-end">
              <img
                src="/right-design.png"
                alt="Left Icon"
                style={{
                  maxWidth: "40px",
                  transform: "rotate(180deg)",
                  opacity: 0.8,
                }}
              />
            </div>

            <div className="col-auto">
              <h2
                style={{
                  color: "#61003C",
                  fontFamily: "'Rose Velt Personal Use Only', serif",
                  fontWeight: "bold",
                  fontSize: "1.8rem",
                  letterSpacing: "1px",
                  margin: 0,
                }}
              >
                <span style={{ fontSize: "2rem" }}>S</span>TEP{" "}
                <span style={{ fontSize: "2rem" }}>I</span>NTO{" "}
                <span style={{ fontSize: "2rem" }}>R</span>OYAL{" "}
                <span style={{ fontSize: "2rem" }}>I</span>NDULGENCE
              </h2>
            </div>

            <div className="col-auto d-flex justify-content-start">
              <img
                src="/right-design.png"
                alt="Right Icon"
                style={{
                  maxWidth: "40px",
                  opacity: 0.8,
                }}
              />
            </div>
          </div>

          <div className="container" style={{ marginTop: "50px" }}>
            <div
              className="row mx-auto shadow-lg p-4"
              style={{
                borderRadius: "20px",
                backgroundColor: "white",
                maxWidth: "80%",
                position: "relative",
                overflow: "hidden",
                minHeight: "400px",
                transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                transform:
                  strip1Visible || strip2Visible || strip3Visible
                    ? "translateY(-5px)"
                    : "translateY(0)",
                boxShadow:
                  strip1Visible || strip2Visible || strip3Visible
                    ? "0 8px 25px rgba(0,0,0,0.15)"
                    : "0 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              <div
                className="col-md-7 d-flex flex-column align-items-start fade-in-left"
                style={{
                  marginTop: "40px",
                  transform:
                    strip1Visible || strip2Visible || strip3Visible
                      ? "translateY(0)"
                      : "translateY(20px)",
                  opacity:
                    strip1Visible || strip2Visible || strip3Visible ? 1 : 0.8,
                  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <h5
                  style={{
                    color: "#4C0A2E",
                    fontFamily: "'Rose Velt Personal Use Only', serif",
                    fontWeight: "normal",
                    textTransform: "uppercase",
                  }}
                >
                  {strip1Visible ? (
                    <>
                      <span style={{ fontSize: "24px" }}>R</span>ADIANCE OF THE{" "}
                      <span style={{ fontSize: "24px" }}>R</span>AJPUT{" "}
                      <span style={{ fontSize: "24px" }}>R</span>ANIS —{" "}
                      <span style={{ fontSize: "24px" }}>S</span>KIN{" "}
                      <span style={{ fontSize: "24px" }}>A</span>LCHEMY
                    </>
                  ) : strip2Visible ? (
                    <>
                      <span style={{ fontSize: "24px" }}>H</span>AIR{" "}
                      <span style={{ fontSize: "24px" }}>E</span>LIXIRS —{" "}
                      <span style={{ fontSize: "24px" }}>T</span>RESSES OF{" "}
                      <span style={{ fontSize: "24px" }}>T</span>RADITION
                    </>
                  ) : strip3Visible ? (
                    <>
                      <span style={{ fontSize: "24px" }}>R</span>ITUAL{" "}
                      <span style={{ fontSize: "24px" }}>K</span>ITS —{" "}
                      <span style={{ fontSize: "24px" }}>A</span>NOINTING{" "}
                      <span style={{ fontSize: "24px" }}>G</span>RACE
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: "24px" }}>F</span>ROM{" "}
                      <span style={{ fontSize: "24px" }}>P</span>ALACE TO{" "}
                      <span style={{ fontSize: "24px" }}>Y</span>OU:{" "}
                      <span style={{ fontSize: "24px" }}>A</span>{" "}
                      <span style={{ fontSize: "24px" }}>B</span>ODY{" "}
                      <span style={{ fontSize: "24px" }}>R</span>ITUAL
                    </>
                  )}
                </h5>

                <div className="col-md-7 px-0 d-flex flex-column align-items-start text-start">
                  <p
                    style={{
                      fontSize: "14px",
                      font: "Avenir",
                      fontStyle: "roman",
                      fontWeight: "400",
                      color: "#333",
                      lineHeight: "114%",
                      letterSpacing: "0%",
                    }}
                  >
                    Rani Padmavati of Chittor indulged in luxurious urban
                    rituals — an age-old body remedy made with sandalwood,
                    turmeric, lentils, and rose petals. Applied before her
                    ceremonial baths, this exfoliating paste, followed by herbal
                    oil massages, wasn’t just for beauty — it was a sacred act
                    of self-rejuvenation. At Raajsi, we revive this royal
                    tradition through our body oils, scrubs, and soaps, bringing
                    timeless radiance to your modern-day rituals.
                  </p>
                </div>

                <p className="fst-italic" style={{ fontSize: "0.95rem" }}>
                  {strip1Visible
                    ? "Discover your royal radiance."
                    : strip2Visible
                      ? "Nourish your royal tresses."
                      : strip3Visible
                        ? "Experience royal rituals."
                        : "Step into royal indulgence."}
                </p>

                <button
                  className="btn mt-3 px-4 py-2"
                  style={{
                    backgroundColor: "#4C0A2E !important",
                    color: "white !important",
                    borderRadius: "20px",
                    width: "fit-content",
                    border: "none !important",
                    outline: "none !important",
                    boxShadow: "none !important",
                  }}
                >
                  <Link
                    href="/featured-products"
                    style={{
                      color: "white !important",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    VIEW PRODUCTS
                  </Link>
                </button>
              </div>

              <div className="col-md-5 text-center mt-4 mt-md-0">
                <img
                  src={
                    strip1Visible
                      ? "/image3.png"
                      : strip2Visible
                        ? "/image4.png"
                        : strip3Visible
                          ? "/image5.png"
                          : "/image3.png"
                  }
                  alt={
                    strip1Visible
                      ? "Skin Alchemy"
                      : strip2Visible
                        ? "Hair Elixirs"
                        : strip3Visible
                          ? "Ritual Kits"
                          : "Royal Ritual"
                  }
                  className="img-fluid"
                  style={{
                    borderTopLeftRadius: "100px",
                    borderTopRightRadius: "100px",
                    maxHeight: "380px",
                    objectFit: "cover",
                    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform:
                      strip1Visible || strip2Visible || strip3Visible
                        ? "translateY(0)"
                        : "translateY(15px)",
                    opacity:
                      strip1Visible || strip2Visible || strip3Visible ? 1 : 0.9,
                  }}
                />
              </div>
            </div>

            <section>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12">
                    <div
                      className="left-text-strip px-4 py-4"
                      style={{
                        backgroundColor: "#BA7E38",
                        color: "#FFD700",
                        fontFamily: "'Rose Velt Personal Use Only', serif",
                        fontSize: "1.1rem",
                        fontWeight: "normal",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        borderBottomLeftRadius: "0",
                        borderBottomRightRadius: "0",
                        textAlign: "center",
                        maxWidth: "82%",
                        margin: "0 auto",
                        marginTop: "-30px",
                        cursor: "pointer",
                        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        zIndex: 10,
                        opacity: strip1Visible ? 0 : 1,
                        transform: strip1Visible
                          ? "translateY(20px)"
                          : "translateY(0)",
                        pointerEvents: strip1Visible ? "none" : "auto",
                      }}
                    >
                      <span style={{ fontSize: "1.3rem" }}>R</span>ADIANCE OF
                      THE <span style={{ fontSize: "1.3rem" }}>R</span>AJPUT{" "}
                      <span style={{ fontSize: "1.3rem" }}>R</span>ANIS —{" "}
                      <span style={{ fontSize: "1.3rem" }}>S</span>KIN{" "}
                      <span style={{ fontSize: "1.3rem" }}>A</span>LCHEMY
                    </div>

                    <div
                      className="left-text-strip px-4 py-4"
                      style={{
                        backgroundColor: "#BA7E38",
                        color: "#fff",
                        fontFamily: "'Rose Velt Personal Use Only', serif",
                        fontSize: "1.1rem",
                        fontWeight: "normal",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        borderBottomLeftRadius: "0",
                        borderBottomRightRadius: "0",
                        textAlign: "center",
                        maxWidth: "82%",
                        margin: "0 auto",
                        marginTop: "-20px",
                        cursor: "pointer",
                        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        zIndex: 10,
                        opacity: strip2Visible ? 0 : 1,
                        transform: strip2Visible
                          ? "translateY(20px)"
                          : "translateY(0)",
                        pointerEvents: strip2Visible ? "none" : "auto",
                      }}
                    >
                      <span style={{ fontSize: "1.3rem" }}>H</span>AIR{" "}
                      <span style={{ fontSize: "1.3rem" }}>E</span>LIXIRS{" "}
                      <span style={{ fontSize: "1.3rem" }}>T</span>RESSES OF{" "}
                      <span style={{ fontSize: "1.3rem" }}>T</span>RADITION
                    </div>

                    <div
                      className="left-text-strip px-4 py-4"
                      style={{
                        backgroundColor: "#BA7E38",
                        color: "#4e3b00",
                        fontFamily: "'Rose Velt Personal Use Only', serif",
                        fontSize: "1.1rem",
                        fontWeight: "normal",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        borderBottomLeftRadius: "0",
                        borderBottomRightRadius: "0",
                        textAlign: "center",
                        maxWidth: "82%",
                        margin: "0 auto",
                        marginTop: "-20px",
                        cursor: "pointer",
                        transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        zIndex: 10,
                        opacity: strip3Visible ? 0 : 1,
                        transform: strip3Visible
                          ? "translateY(20px)"
                          : "translateY(0)",
                        pointerEvents: strip3Visible ? "none" : "auto",
                      }}
                    >
                      <span style={{ fontSize: "1.3rem" }}>R</span>ITUAL{" "}
                      <span style={{ fontSize: "1.3rem" }}>K</span>ITS{" "}
                      <span style={{ fontSize: "1.3rem" }}>A</span>NOINTING{" "}
                      <span style={{ fontSize: "1.3rem" }}>G</span>RACE
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 600px) {
          section.position-relative {
            margin-top: 40px !important;
            min-height: unset !important;
            padding-top: 40px !important;
            padding-bottom: 30px !important;
          }
          .position-absolute.w-100 {
            position: static !important;
            top: unset !important;
            left: unset !important;
            text-align: center !important;
          }
          .row.justify-content-center.align-items-center {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .row.mx-auto.shadow-lg.p-4 {
            flex-direction: column !important;
            max-width: 100% !important;
            padding: 12px !important;
            border-radius: 12px !important;
          }
          .col-md-7.d-flex.flex-column.align-items-start.fade-in-left {
            align-items: center !important;
            margin-top: 0 !important;
            width: 100% !important;
            text-align: center !important;
          }
          .col-md-7.px-0.d-flex.flex-column.align-items-start.text-start {
            align-items: center !important;
            text-align: center !important;
            width: 100% !important;
            padding: 0 !important;
          }
          .col-md-5.text-center.mt-4.mt-md-0 {
            margin-top: 18px !important;
            width: 100% !important;
          }
          .col-md-5.text-center.mt-4.mt-md-0 img {
            max-height: 280px !important;
            border-top-left-radius: 50px !important;
            border-top-right-radius: 50px !important;
          }
          .left-text-strip {
            margin-top: -30px !important;
          }
          .left-text-strip:nth-child(2) {
            margin-top: -20px !important;
          }
          .left-text-strip:nth-child(3) {
            margin-top: -20px !important;
          }
          .left-text-strip {
            max-width: 100% !important;
          }
          .royal-promise-section {
            height: auto !important;
            min-height: 500px !important;
            max-width: 95% !important;
            margin: 30px auto !important;
            border-radius: 15px !important;
            padding: 20px 0 !important;
          }
          .royal-promise-section .container {
            padding: 0 15px !important;
          }
          .royal-promise-section .row {
            flex-direction: column !important;
            height: auto !important;
            align-items: center !important;
          }
          .royal-promise-section .col-md-6 {
            width: 100% !important;
            height: auto !important;
            margin-bottom: 20px !important;
            padding: 0 10px !important;
          }
          .royal-promise-section .col-md-6:first-child {
            order: 2 !important;
            text-align: center !important;
          }
          .royal-promise-section .col-md-6:last-child {
            order: 1 !important;
            margin-bottom: 30px !important;
          }
          .royal-promise-section h3 {
            font-size: 1.8rem !important;
            text-align: center !important;
            left: 0 !important;
            margin-bottom: 15px !important;
          }
          .royal-promise-section h3 span {
            font-size: 2rem !important;
          }
          .royal-promise-section p {
            font-size: 0.9rem !important;
            text-align: center !important;
            left: 0 !important;
            max-width: 100% !important;
            margin: 0 auto 15px auto !important;
            padding: 0 10px !important;
          }
          .royal-promise-section .fst-italic {
            font-size: 1rem !important;
          }
          .royal-promise-section .d-flex.gap-2 {
            justify-content: center !important;
            margin: 20px 0 !important;
          }
          .royal-promise-section .btn {
            left: 0 !important;
            margin: 0 auto !important;
            width: 160px !important;
            height: 45px !important;
            font-size: 1rem !important;
          }
          .royal-promise-section img[src="/design.png"] {
            display: none !important;
          }
          .royal-promise-section img[alt="Royal Promise"] {
            max-width: 90% !important;
            height: auto !important;
            max-height: 250px !important;
            object-fit: contain !important;
            margin: 0 auto !important;
            border-radius: 15px !important;
          }
        }
      `}</style>

      <style jsx>{`
        @media (max-width: 600px) {
          .step-royal-row {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 4px !important;
            flex-wrap: nowrap !important;
            white-space: nowrap !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
            padding: 0 4vw !important;
            margin: 0 auto !important;
            min-height: 38px !important;
          }
          .step-royal-row h2 {
            font-size: 0.92rem !important;
            margin: 0 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            letter-spacing: 0.2px !important;
            font-weight: 700 !important;
            display: inline-block !important;
            vertical-align: middle !important;
            max-width: 60vw !important;
          }
          .step-royal-row .col-auto {
            flex: 0 0 auto !important;
            max-width: none !important;
            display: flex !important;
            align-items: center !important;
          }
          .step-royal-row img {
            max-width: 18px !important;
            height: 18px !important;
            min-width: 16px !important;
            min-height: 16px !important;
            display: inline-block !important;
            vertical-align: middle !important;
          }
        }
        
        @media (max-width: 480px) {
          .mobile-featured-card {
            width: 90vw !important;
            max-width: 90vw !important;
            height: 380px !important;
            border-radius: 12px !important;
          }
          
          .mobile-card-container .btn {
            max-width: 160px !important;
            height: 34px !important;
            font-size: 0.85rem !important;
            padding: 0 16px !important;
          }
          
          .mobile-card-container .position-relative {
            height: 45px !important;
          }
          
          .mobile-card-container .position-absolute.btn {
            width: 34px !important;
            height: 34px !important;
            font-size: 16px !important;
          }
          
          .mobile-featured-card div[style*="fontSize: \"0.8rem\""] {
            font-size: 0.7rem !important;
            max-width: 80% !important;
            line-height: 1.3 !important;
          }
          
          .mobile-featured-card h5 {
            font-size: 0.95rem !important;
            margin-bottom: 6px !important;
          }
          
          .mobile-featured-card p {
            font-size: 0.8rem !important;
            margin-bottom: 8px !important;
          }
        }
        @media (max-width: 768px) {
          img[src="/left-design.png"],
          img[src="/right-design.png"] {
            display: none !important;
          }
        }
      `}</style>

      {/* Replace the featured products section with the carousel */}
      <section
        id="featured-products-section"
        className="featured-products-section py-5"
      >
        <div className="container">
          <div className="row justify-content-center align-items-center mb-4 featured-title-row">
            <div className="col-auto d-flex justify-content-end featured-decor-left">
              <img
                src="/left-design.png"
                alt="Left Decor"
                style={{ maxWidth: "30px", opacity: 0.8 }}
              />
            </div>
            <div className="col-auto text-center">
              <h2
                className="featured-title"
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
                <span style={{ fontSize: "1.8rem" }}>F</span>EATURED{" "}
                <span style={{ fontSize: "1.8rem" }}>P</span>RODUCTS
              </h2>
            </div>
            <div className="col-auto d-flex justify-content-start featured-decor-right">
              <img
                src="/right-design.png"
                alt="Right Decor"
                style={{ maxWidth: "30px", opacity: 0.8 }}
              />
            </div>
          </div>
        </div>

        {/* Tabs for section switching */}
        <div className="row justify-content-center my-4">
          <div
            className="tab-slider-wrapper"
            style={{
              maxWidth: "600px",
              width: "100%",
              position: "relative",
            }}
          >
            {/* Scroll indicators for mobile */}
            <div className="tab-scroll-indicators d-md-none">
              <div className="scroll-indicator left"></div>
              <div className="scroll-indicator right"></div>
            </div>
            <div
              className="d-flex justify-content-center align-items-center tab-container"
              style={{
                borderRadius: "30px",
                padding: "6px 10px",
                maxWidth: "600px",
                overflowX: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                e.currentTarget.startX = touch.clientX;
                e.currentTarget.scrollLeft = e.currentTarget.scrollLeft;
              }}
              onTouchMove={(e) => {
                if (!e.currentTarget.startX) return;
                const touch = e.touches[0];
                const diff = e.currentTarget.startX - touch.clientX;
                e.currentTarget.scrollLeft = e.currentTarget.scrollLeft + diff;
                e.currentTarget.startX = touch.clientX;
              }}
            >
              {SECTIONS.map((s, idx) => (
                <button
                  key={s.key}
                  className="me-2 tab-button"
                  style={{
                    backgroundColor:
                      idx === sectionIdx ? "#BA7E38" : "transparent",
                    color: idx === sectionIdx ? "#fff" : "#4C0A2E",
                    border: "none",
                    borderRadius: "25px",
                    padding: "10px 18px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    transition: "background 0.2s, color 0.2s",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                  onClick={() => handleTabClick(idx)}
                >
                  {s.badge}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container-fluid text-center">
          <div className="container-fluid mt-4">
            <div
              className="d-flex justify-content-center align-items-center gap-3 featured-carousel-row"
              style={{ position: "relative", width: "100%" }}
            >
              <button
                className="btn btn-outline-dark rounded-circle nav-arrow-btn d-none d-md-block"
                style={{
                  width: 48,
                  height: 48,
                  alignSelf: "center",
                  opacity: cardStartIndex === 0 ? 0.5 : 1,
                  cursor: cardStartIndex === 0 ? "not-allowed" : "pointer",
                  border: "2px solid #333",
                  backgroundColor: cardStartIndex === 0 ? "#f5f5f5" : "white",
                  transition: "all 0.3s ease",
                  position: "absolute",
                  left: "20px",
                  zIndex: 10,
                }}
                onClick={handleCardPrev}
                disabled={cardStartIndex === 0}
                aria-label="Previous"
              >
                &#x276E;
              </button>

              {/* Mobile: Show only one card */}
              <div className="d-block d-md-none">
                <div
                  className="col-12 d-flex flex-column align-items-center mb-4 mobile-card-container"
                  style={{ minWidth: 0, position: "relative" }}
                >
                  <div
                    className="card mobile-featured-card"
                    style={{
                      width: "92vw",
                      maxWidth: "92vw",
                      height: "400px",
                      borderRadius: "12px",
                      backgroundImage: `url(${sectionCards[mobileCardIndex]?.image || sectionCards[0]?.image
                        })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                      overflow: "hidden",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      cursor: "grab",
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    {/* Enhanced overlay for better text readability */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.4) 100%)",
                        zIndex: 1,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        color: "#fff",
                        fontSize: "0.8rem",
                        fontFamily: "Georgia, serif",
                        maxWidth: "75%",
                        lineHeight: "1.4",
                        textShadow: "0 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.5)",
                        fontWeight: "500",
                        letterSpacing: "0.5px",
                        zIndex: 2,
                        borderRadius: "8px",
                      }}
                    >
                      मुग्धे! धानुष्कता केयमपूर्वा त्वयि दृश्यते <br />
                      यया विध्यसि चेतांसि गुणैरेव न सायकैः ॥
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "#fff",
                        padding: "4px 10px",
                        fontSize: "0.7rem",
                        borderRadius: "20px",
                        fontWeight: 500,
                        fontFamily: "Arial, sans-serif",
                        zIndex: 2,
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      Ingredients & Benefits
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0",
                        width: "100%",
                        color: "#fff",
                        padding: "1rem",
                        fontFamily: "Georgia, serif",
                        marginTop: "40px",
                        zIndex: 2,
                        background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                      }}
                    >
                      <h5
                        style={{
                          fontWeight: "bold",
                          paddingLeft: "10px",
                          marginBottom: "8px",
                          marginTop: "18px",
                          textAlign: "left",
                          fontFamily: "'Rose Velt Personal Use Only', serif",
                        }}
                      >
                        {sectionCards[mobileCardIndex]?.title || sectionCards[0]?.title}
                      </h5>
                      <p
                        style={{
                          fontSize: "14px",
                          paddingLeft: "10px",
                          marginBottom: "10px",
                          textAlign: "left",
                          fontFamily: "Avenir, sans-serif",
                        }}
                      >
                        {sectionCards[mobileCardIndex]?.desc || sectionCards[0]?.desc}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between w-100 px-4 mt-2">
                    <Link
                      href="/product/1"
                      className="btn btn-sm d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: "#BA7E38",
                        color: "white",
                        borderRadius: "30px",
                        maxWidth: "170px",
                        maxHeight: "44px",
                        height: "36px",
                        minHeight: "36px",
                        lineHeight: "36px",
                        padding: "0 20px",
                        fontWeight: 500,
                        fontSize: "0.9rem",
                      }}
                    >
                      VIEW PRODUCT
                    </Link>
                    <div className="text-end">
                      <strong>{sectionCards[mobileCardIndex]?.price || sectionCards[0]?.price}</strong>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          textDecoration: "line-through",
                          color: "gray",
                        }}
                      >
                        Get 50% OFF {sectionCards[mobileCardIndex]?.oldPrice || sectionCards[0]?.oldPrice}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation arrows and indicators */}
                  <div className="position-relative mt-3" style={{ width: "100%", height: "50px" }}>
                    {/* Left Arrow */}
                    <button
                      onClick={() => {
                        if (mobileCardIndex > 0) {
                          setMobileCardIndex(prev => prev - 1);
                        }
                      }}
                      className="btn position-absolute"
                      style={{
                        backgroundColor: mobileCardIndex === 0 ? "#ccc" : "#BA7E38",
                        color: "white",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        fontWeight: "bold",
                        left: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        opacity: mobileCardIndex === 0 ? 0.5 : 1,
                        cursor: mobileCardIndex === 0 ? "not-allowed" : "pointer",
                      }}
                      aria-label="Previous product"
                    >
                      ‹
                    </button>

                    {/* Centered Slide indicators */}
                    <div
                      className="position-absolute d-flex gap-2"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {sectionCards.map((_, index) => (
                        <div
                          key={index}
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: mobileCardIndex === index ? "#BA7E38" : "#ccc",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setMobileCardIndex(index);
                          }}
                        />
                      ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                      onClick={() => {
                        if (mobileCardIndex < sectionCards.length - 1) {
                          setMobileCardIndex(prev => prev + 1);
                        }
                      }}
                      className="btn position-absolute"
                      style={{
                        backgroundColor: mobileCardIndex === sectionCards.length - 1 ? "#ccc" : "#BA7E38",
                        color: "white",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                        fontWeight: "bold",
                        right: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        opacity: mobileCardIndex === sectionCards.length - 1 ? 0.5 : 1,
                        cursor: mobileCardIndex === sectionCards.length - 1 ? "not-allowed" : "pointer",
                      }}
                      aria-label="Next product"
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop: Show carousel cards - 2 at a time */}
              <div
                className="d-none d-md-flex"
                style={{
                  gap: "70px",
                  overflow: "hidden",
                  width: "100%",
                  position: "relative",
                  padding: "0 80px",
                  cursor: isDragging ? "grabbing" : "grab",
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
              >
                {/* Carousel indicator */}
                <div
                  style={{
                    position: "absolute",
                    top: "-25px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "12px",
                    color: "#666",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {sectionCards[0]?.section || "Products"} • Cards{" "}
                  {cardStartIndex + 1}-
                  {Math.min(cardStartIndex + 2, sectionCards.length)} of {sectionCards.length}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "70px",
                    transform: `translateX(-${(cardStartIndex / 2) * 100}%)`,
                    transition: "transform 0.5s ease-in-out",
                    width: "100%",
                  }}
                >
                  {/* Show 2 cards at a time */}
                  {Array.from(
                    { length: Math.ceil(sectionCards.length / 2) },
                    (_, pairIndex) => (
                      <div
                        key={pairIndex}
                        style={{
                          display: "flex",
                          gap: "70px",
                          minWidth: "100%",
                        }}
                      >
                        {sectionCards.slice(pairIndex * 2, pairIndex * 2 + 2).map(
                          (card, cardIndex) => (
                            <ProductCard
                              key={cardIndex}
                              product={{ ...card, id: cardIndex + 1 }}
                              showShloka={true}
                              showTag={true}
                              cardHeight="450px"
                              className="mb-4"
                              style={{
                                minWidth: "calc(50vw - 160px)",
                                maxWidth: "600px",
                                flex: "1",
                              }}
                            />
                          )
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              <button
                className="btn btn-outline-dark rounded-circle nav-arrow-btn d-none d-md-block"
                style={{
                  width: 48,
                  height: 48,
                  alignSelf: "center",
                  opacity: cardStartIndex >= sectionCards.length - 2 ? 0.5 : 1,
                  cursor:
                    cardStartIndex >= sectionCards.length - 2
                      ? "not-allowed"
                      : "pointer",
                  border: "2px solid #333",
                  backgroundColor:
                    cardStartIndex >= sectionCards.length - 2 ? "#f5f5f5" : "white",
                  transition: "all 0.3s ease",
                  position: "absolute",
                  right: "20px",
                  zIndex: 10,
                }}
                onClick={handleCardNext}
                disabled={cardStartIndex >= sectionCards.length - 2}
                aria-label="Next"
              >
                &#x276F;
              </button>


            </div>
          </div>
        </div>
      </section>

      <section
        className="royal-promise-section my-5"
        style={{
          backgroundImage: "url('/background4.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "20px",
          overflow: "hidden",
          margin: "60px auto",
          maxWidth: "78%",
          height: "530px",
        }}
      >
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            {/* Left Text + Decorative Image */}
            <div className="col-md-6 text-white px-2 px-md-4 d-flex flex-column justify-content-center h-100 position-relative">
              {/* Decorative image in background - hidden on mobile */}
              <img
                src="/design.png"
                alt="Floral Design"
                className="d-none d-md-block"
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "350px",
                  width: "242px",
                  height: "192px",
                  opacity: 1,
                  zIndex: 2,
                }}
              />

              {/* Text Content */}
              <h3
                className="text-center text-md-start ms-md-4"
                style={{
                  fontFamily: "'Rose Velt Personal Use Only', serif",
                  color: "#FFD700",
                  position: "relative",
                  fontWeight: "400",
                  fontSize: "clamp(24px, 4vw, 32px)",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                  paddingLeft: "0",
                }}
              >
                <span style={{ fontSize: "36px" }}>T</span>HE{" "}
                <span style={{ fontSize: "36px" }}>R</span>OYAL{" "}
                <span style={{ fontSize: "36px" }}>P</span>ROMISE
              </h3>

              <p
                className="text-center text-md-start px-3 px-md-0 ms-md-4"
                style={{
                  fontFamily: "Avenir, sans-serif",
                  color: "white",
                  position: "relative",
                  zIndex: 1,
                  fontSize: "14px",
                  lineHeight: "1.4",
                  maxWidth: "400px",
                  fontWeight: "normal",
                  margin: "0 auto",
                }}
              >
                At Raajsi, luxury meets responsibility. Our Royal Promise is built on integrity, transparency, and timeless care — for you and the planet.
              </p>

              <p
                className="fst-italic text-center text-md-start px-3 px-md-0 ms-md-4"
                style={{
                  color: "#fff",
                  fontWeight: "500",
                  position: "relative",
                  zIndex: 1,
                  fontSize: "clamp(16px, 3vw, 18px)",
                  lineHeight: "1.3",
                  maxWidth: "400px",
                  margin: "0 auto",
                }}
              >
                <strong>
                  <em>
                    Time-tested formulas derived from ancient sciences and scriptures.
                  </em>
                </strong>
              </p>

              <p
                className="text-center text-md-start px-3 px-md-0 ms-md-4"
                style={{
                  fontFamily: "Avenir",
                  fontStyle: "Roman",
                  color: "white",
                  position: "relative",
                  zIndex: 1,
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "1.3",
                  maxWidth: "400px",
                  margin: "0 auto",
                }}
              >
                Rooted in Ayurveda and proven through generations of ritual wisdom.
              </p>

              {/* Decorative dots - Now functional slider */}
              <div className="d-flex gap-2 my-3 justify-content-center justify-content-md-start ms-md-4">
                <span
                  onClick={() => setRoyalPromiseSlide(0)}
                  style={{
                    height: "5px",
                    width: royalPromiseSlide === 0 ? "30px" : "18px",
                    borderRadius: "20%",
                    backgroundColor: "#fff",
                    opacity: royalPromiseSlide === 0 ? 1 : 0.5,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                ></span>
                <span
                  onClick={() => setRoyalPromiseSlide(1)}
                  style={{
                    height: "5px",
                    width: royalPromiseSlide === 1 ? "30px" : "18px",
                    borderRadius: "20%",
                    backgroundColor: "#fff",
                    opacity: royalPromiseSlide === 1 ? 1 : 0.5,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                ></span>
                <span
                  onClick={() => setRoyalPromiseSlide(2)}
                  style={{
                    height: "5px",
                    width: royalPromiseSlide === 2 ? "30px" : "18px",
                    borderRadius: "20%",
                    backgroundColor: "#fff",
                    opacity: royalPromiseSlide === 2 ? 1 : 0.5,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                ></span>
              </div>

              {/* Explore Button */}
              <div className="d-flex justify-content-center justify-content-md-start ms-md-4">
                <Link
                  href="/royal-promises"
                  className="btn mt-3 d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#BA7E38",
                    color: "#FFFFFF",
                    borderRadius: "30px",
                    padding: "8px 24px",
                    fontWeight: "300",
                    position: "relative",
                    height: "52px",
                    width: "192px",
                    zIndex: 1,
                    left: "0",
                    fontSize: "1.1rem",
                  }}
                >
                  EXPLORE
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-md-6 h-100 d-flex justify-content-end align-items-center">
              <img
                src={ROYAL_PROMISES[royalPromiseSlide].image}
                alt="Royal Promise"
                style={{
                  height: "100%",
                  width: "auto",
                  borderRadius: "20px",
                  objectFit: "contain",
                  transition: "all 0.5s ease",
                  marginLeft: "90px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="blog-section py-5"
        style={{
          backgroundImage: "url('/background3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="container" style={{
            marginBottom: "50px",
          }}>
            <div className="row justify-content-center align-items-center mb-4">
              <div className="col-auto d-flex justify-content-end">
                <img
                  src="/left-design.png"
                  alt="Left Decor"
                  style={{ maxWidth: "30px", opacity: 0.8 }}
                />
              </div>
              <div className="col-auto text-center">
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
                  <span style={{ fontSize: "1.8rem" }}>B</span>logs
                </h2>
              </div>
              <div className="col-auto d-flex justify-content-start">
                <img
                  src="/right-design.png"
                  alt="Right Decor"
                  style={{ maxWidth: "30px", opacity: 0.8 }}
                />
              </div>
            </div>
          </div>

          <div className="row justify-content-center g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <img
                  src="/blog1.png"
                  alt="Blog 1"
                  className="card-img-top rounded-top-4"
                />
                <div className="card-body">
                  <h6 className="card-title">
                    Natural Ingredients connect it to actual people
                  </h6>
                  <div className="d-flex justify-content-between text-muted small mb-2">
                    <span>June 28, 2018</span>
                    <span>
                      <i className="bi bi-share-fill me-1"></i> 1K shares
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-decoration-underline text-dark fw-semibold"
                  >
                    Read Blog
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 rounded-4 position-relative">
                <img
                  src="/blog2.png"
                  alt="Blog 2"
                  className="card-img-top rounded-top-4"
                />
                <div className="card-body">
                  <h6 className="card-title">
                    Royalties - rituals, fact boxes Rani Padmavati
                  </h6>
                  <div className="d-flex justify-content-between text-muted small mb-2">
                    <span>June 28, 2018</span>
                    <span>
                      <i className="bi bi-share-fill me-1"></i> 1K shares
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-decoration-underline text-dark fw-semibold"
                  >
                    Read Blog
                  </a>
                </div>
                <span
                  style={{
                    position: "absolute",
                    bottom: "60px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    // backgroundColor: "red",
                  }}
                />
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <img
                  src="/blog3.png"
                  alt="Blog 3"
                  className="card-img-top rounded-top-4"
                />
                <div className="card-body">
                  <h6 className="card-title">
                    Royalties - rituals, fact boxes Rani Padmavati
                  </h6>
                  <div className="d-flex justify-content-between text-muted small mb-2">
                    <span>June 28, 2018</span>
                    <span>
                      <i className="bi bi-share-fill me-1"></i> 1K shares
                    </span>
                  </div>
                  <a
                    href="#"
                    className="text-decoration-underline text-dark fw-semibold"
                  >
                    Read Blog
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <button
              className="btn px-5 py-2"
              style={{
                backgroundColor: "#BA7E38",
                color: "#fff",
                borderRadius: "25px",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
            >
              VIEW ALL
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .faq-section {
            padding-top: 60px !important;
            padding-bottom: 60px !important;
            margin-top: 30px !important;
            margin-bottom: 30px !important;
          }
          .faq-section h2 {
            font-size: 1.3rem !important;
          }
          .faq-section .accordion {
            max-width: 95% !important;
          }
          .faq-section .btn {
            font-size: 16px !important;
          }
        }
        @media (max-width: 480px) {
          .faq-section {
            padding-top: 35px !important;
            padding-bottom: 35px !important;
            margin-top: 15px !important;
            margin-bottom: 15px !important;
          }
          .faq-section h2 {
            font-size: 1rem !important;
          }
          .faq-section p {
            font-size: 0.8rem !important;
          }
          .faq-section .btn {
            font-size: 0.8rem !important;
          }
          .faq-section img {
            max-width: 18px !important;
          }
          .faq-section .accordion {
            max-width: 98% !important;
          }
        }
      `}</style>
      <section className="faq-section py-5 my-5" style={{
        backgroundImage: "url('/faqbg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        paddingTop: "150px",
        paddingBottom: "150px"
      }}>
        <div className="container text-center">
          <div className="container" style={{
            marginBottom: "50px",
          }}>
            <div className="row justify-content-center align-items-center mb-4">
              <div className="col-auto d-flex justify-content-end">
                <img
                  src="/left-design.png"
                  alt="Left Decor"
                  style={{ maxWidth: "30px", opacity: 0.8 }}
                />
              </div>
              <div className="col-auto text-center">
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
                  <span style={{ fontSize: "1.8rem" }}>F</span>requently asked questions
                </h2>
                <p>Got questions? Find answers to the most common questions about us.</p>
              </div>
              <div className="col-auto d-flex justify-content-start">
                <img
                  src="/right-design.png"
                  alt="Right Decor"
                  style={{ maxWidth: "30px", opacity: 0.8 }}
                />
              </div>
            </div>
          </div>

          <div
            className="accordion mt-5 mx-auto"
            id="faqAccordion"
            style={{ maxWidth: "700px" }}
          >
            {[
              {
                question: "When is the best time to apply ubtan ?",
                answer: "Ubtan can be applied 15-30 mins before bath 2-3 times a week to get the maximum benefits. It is part of bath ritual and can also be applied after oil massage. Application of ubtan post massage provides great results for dry skin. Applying the Cosmic body oil followed by the Lavish body scrub not only gently exfoliates the skin but also acts as a natural polish inducing a smooth, radiant look."
              },
              {
                question: "Can I use the body cleanser and scrub together ?",
                answer: "Yes! For best results, cleanse first to remove surface impurities, then follow with the scrub to deeply exfoliate and rejuvenate your skin."
              },
              {
                question: "Will RAAJSI body scrub help with ingrown hairs or keratosis pilaris ?",
                answer: "Our exfoliating scrubs help unclog pores and remove dead skin buildup, which can minimize ingrown hairs and smooth rough, bumpy skin. Regular use may improve these conditions over time."
              },
              {
                question: "Can I use RAAJSI products alongside my current skincare products ?",
                answer: "RAAJSI products are mild and easy on skin. They do not cause skin reactions due to being natural. If you have sensitive skin or a dermatological condition, please introduce one product at a time and perform a patch test."
              },
              {
                question: "Do RAAJSI products contain preservatives ?",
                answer: "We use natural, Ayurveda-approved preservatives to ensure product longevity and safety without compromising purity."
              },
              {
                question: "Does RAAJSI offer international shipping ?",
                answer: "Yes, we ship internationally. Shipping rates and delivery times will be calculated at checkout based on your location."
              },
              {
                question: "Does RAAJSI offer combo packs?",
                answer: "Yes! We offer curated body care ritual kits for regular deliveries. Check our \"Rituals Kit\" section for current deals."
              }
            ].map((faq, index) => (
              <div
                className="border-0 border-bottom"
                style={{ borderBottom: "2px solid #2e2e2e" }}
                key={index}
              >
                <div className="px-0 py-3 d-flex justify-content-between align-items-center">
                  <button
                    className="btn p-0 text-start"
                    type="button"
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    style={{
                      fontWeight: "500",
                      fontSize: "18px",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      border: "none",
                      flex: 1,
                      textAlign: "left",
                      fontFamily: "Avenir, sans-serif",
                    }}
                  >
                    <span>{faq.question}</span>
                  </button>
                  <span
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "#E0E0E0",
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#333",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                  >
                    {expandedFaq === index ? <FaChevronDown /> : "+"}
                  </span>
                </div>
                {expandedFaq === index && (
                  <div
                    className="text-start px-0 py-2 text-muted"
                    style={{ fontSize: "15px", fontFamily: "Avenir, sans-serif" }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .tab-slider-wrapper {
            max-width: 95vw !important;
            padding: 0 10px;
          }
          .tab-scroll-indicators {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
          }
          .scroll-indicator {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            background: linear-gradient(90deg, rgba(245,240,235,0.8) 0%, rgba(245,240,235,0) 100%);
            pointer-events: none;
          }
          .scroll-indicator.left {
            left: 0;
            background: linear-gradient(90deg, rgba(245,240,235,0.9) 0%, rgba(245,240,235,0) 100%);
          }
          .scroll-indicator.right {
            right: 0;
            background: linear-gradient(270deg, rgba(245,240,235,0.9) 0%, rgba(245,240,235,0) 100%);
          }
          .tab-container {
            padding: 4px 6px !important;
            max-width: none !important;
            border-radius: 20px !important;
            justify-content: flex-start !important;
            overflow-x: auto !important;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }
          .tab-container::-webkit-scrollbar {
            display: none;
          }
          .tab-button {
            padding: 4px 12px !important;
            font-size: 0.75rem !important;
            margin-right: 4px !important;
            border-radius: 18px !important;
            white-space: nowrap !important;
            flex-shrink: 0 !important;
          }
          .nav-arrow-btn {
            width: 36px !important;
            height: 36px !important;
            font-size: 14px !important;
            border-width: 1px !important;
          }
          .nav-arrow-btn[style*="left: 20px"] {
            left: 10px !important;
          }
          .nav-arrow-btn[style*="right: 20px"] {
            right: 10px !important;
          }
          .featured-title {
            font-size: 1.3rem !important;
          }
          .featured-title span {
            font-size: 1.5rem !important;
          }
          .featured-decor-left img,
          .featured-decor-right img {
            max-width: 20px !important;
          }
          .mobile-featured-card {
            width: 90vw !important;
            max-width: 90vw !important;
            height: 420px !important;
          }
          .mobile-card-container {
            padding: 0 10px !important;
          }
        }
        @media (max-width: 480px) {
          .tab-slider-wrapper {
            max-width: 98vw !important;
            padding: 0 5px;
          }
          .tab-container {
            padding: 3px 4px !important;
            flex-wrap: nowrap !important;
            gap: 0 !important;
            justify-content: flex-start !important;
            overflow-x: auto !important;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }
          .tab-container::-webkit-scrollbar {
            display: none;
          }
          .tab-button {
            padding: 3px 8px !important;
            font-size: 0.7rem !important;
            margin-right: 2px !important;
            margin-bottom: 0 !important;
            border-radius: 15px !important;
            min-width: auto !important;
            white-space: nowrap !important;
            flex-shrink: 0 !important;
          }
          .nav-arrow-btn {
            width: 30px !important;
            height: 30px !important;
            font-size: 12px !important;
            border-width: 1px !important;
          }
          .nav-arrow-btn[style*="left: 20px"] {
            left: 5px !important;
          }
          .nav-arrow-btn[style*="right: 20px"] {
            right: 5px !important;
          }
          .featured-title {
            font-size: 1.1rem !important;
          }
          .featured-title span {
            font-size: 1.3rem !important;
          }
          .featured-decor-left,
          .featured-decor-right {
            display: none !important;
          }
          .mobile-featured-card {
            width: 95vw !important;
            max-width: 95vw !important;
            height: 380px !important;
          }
          .mobile-card-container {
            padding: 0 5px !important;
          }
        }
      `}</style>
    </>
  );
}
