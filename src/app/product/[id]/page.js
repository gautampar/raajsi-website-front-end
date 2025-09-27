"use client";
import Image from "next/image";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaMinus, FaPlus } from "react-icons/fa";
import Navbar from "../../../components/Navbar";
import ProductCard from "../../../components/ProductCard";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/api/auth";
import { toast } from "react-toastify";

export default function ProductPage({ onAddToCart }) {
  const params = useParams()
  const { id } = params; // id will be "68bc1c5ca22977ad7f7dea23"

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  // Sample product data - in real app this would come from props or API
  // const product = {
  //   id: 1,
  //   name: "COSMIC BODY OIL",
  //   price: 600.72,
  //   originalPrice: 800.0,
  //   rating: 4.5,
  //   reviewCount: 124,
  //   availability: "Only 3 in stock",
  //   stock: 3,
  //   highlights: [
  //     "Unlock celestial beauty in a bottle. A careful blend of botanicals for luminous, soft skin.",
  //     "Handcrafted with responsibly sourced, skin-friendly ingredients.",
  //     "Suitable for all skin types with heavenly nourishment.",
  //   ],
  //   variants: [
  //     { label: '200 ml' },
  //     { label: '350 ml' },
  //   ],
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //   ingredients:
  //     "Aqua, Glycerin, Sodium Chloride, Prunus Armeniaca Seed Powder, Cocos Nucifera Oil, Butyrospermum Parkii Butter, Tocopherol, Parfum",
  //   howToUse:
  //     "Apply to damp skin in circular motions. Rinse thoroughly with warm water. Use 2-3 times per week for best results.",
  //   images: ["/card11.png", "/card12.png"],
  // };

  // Related products (static sample)
  const relatedProducts = [
    {
      id: 2,
      title: "COSMIC BODY OIL",
      price: "₹1800",
      oldPrice: "₹2000",
      image: "/card1.png",
      desc: "Unlock celestial beauty in a bottle. A careful blend of botanicals for luminous, soft skin.",
      rating: 4.5
    },
    {
      id: 3,
      title: "LAVISH BODY SCRUB",
      price: "₹1800",
      oldPrice: "₹2000",
      image: "/card2.png",
      desc: "Exfoliate and rejuvenate with our luxurious body scrub for silky smooth skin.",
      rating: 4.8
    },
    {
      id: 4,
      title: "COSMIC BODY OIL",
      price: "₹1800",
      oldPrice: "₹2000",
      image: "/card11.png",
      desc: "Nourish your skin with our premium cosmic body oil blend.",
      rating: 4.3
    },
    {
      id: 5,
      title: "LAVISH BODY SCRUB",
      price: "₹1800",
      oldPrice: "₹2000",
      image: "/card12.png",
      desc: "Pamper yourself with our gentle yet effective body scrub formula.",
      rating: 4.7
    },
  ];

  // Gallery helpers
  const goPrev = () => setSelectedImage((i) => Math.max(0, i - 1));
  const goNext = () => setSelectedImage((i) => Math.min(product.images.length - 1, i + 1));

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;
    for (let i = 0; i < full; i++) stars.push(<FaStar key={i} className="text-warning" />);
    if (half) stars.push(<FaStarHalfAlt key="half" className="text-warning" />);
    for (let i = 0; i < 5 - Math.ceil(rating); i++) stars.push(<FaRegStar key={`e-${i}`} className="text-warning" />);
    return stars;
  };

  const handleQuantityChange = (change) => setQuantity((prev) => Math.max(1, prev + change));

  const [product, setProduct] = useState(null);
  const [productImg, setProductImg] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data?.data.product || []);
        setProductImg(data?.data.images || []);
        toast.success("Product loaded ✅");
      } catch (err) {
        console.error(err);
        toast.error(err?.message || "Failed to load product ❌");
      }
    };

    if (id) fetchProduct();
  }, [id]);
  if (!product) return <p>Loading...</p>;

  console.log("Product data:", productImg)

  return (
    <Navbar>
      <div className="min-vh-100" style={{ backgroundColor: '#faf9f6', paddingTop: '100px' }}>
        {/* Breadcrumb */}
        <div className="container py-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="/" className="text-decoration-none" style={{ color: '#8B4513' }}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/featured-products" className="text-decoration-none" style={{ color: '#8B4513' }}>
                  Featured Products
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page" style={{ color: '#4C0A2E' }}>
                {product?.name}
              </li>
            </ol>
          </nav>
        </div>

        {/* Product Details */}
        <div className="container pb-4 pt-2">
          <div className="row g-4">
            {/* Images */}
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-2 d-none d-sm-block">
                  <div className="d-flex flex-column gap-2 align-items-stretch" role="tablist" aria-label="Product image thumbnails">
                    {productImg.map((image, index) => (
                      <button
                        aria-label={`Select image ${index + 1}`}
                        role="tab"
                        aria-selected={selectedImage === index}
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`border-0 p-0 bg-transparent rounded-3 thumb-btn ${selectedImage === index ? 'active' : ''}`}
                        style={{ cursor: 'pointer' }}
                      >
                        {image?.imageUrls ? (
                          <Image
                            src={image.imageUrls}
                            alt={`Product image ${index + 1}`}
                            width={80}
                            height={80}
                            className="rounded-3 w-100 h-auto"
                            style={{ objectFit: "cover" }}
                          />
                        ) : null}

                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-12 col-sm-10">
                  <div
                    className="position-relative rounded-4 overflow-hidden"
                    role="region"
                    aria-label="Product image gallery"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
                      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
                    }}
                  >
                    <Image key={selectedImage} src={productImg[selectedImage]} alt={product?.name} width={800} height={600} className="w-100 h-auto fade-in" style={{ objectFit: 'cover' }} />

                    {/* Hindi text overlay on top left */}

                    <button type="button" aria-label="Previous image" className="gallery-nav-btn start-0" onClick={goPrev} disabled={selectedImage === 0}>
                      ‹
                    </button>
                    <button type="button" aria-label="Next image" className="gallery-nav-btn end-0" onClick={goNext} disabled={selectedImage === productImg.length - 1}>
                      ›
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="col-lg-6">
              <div className="ps-lg-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <small className="text-muted">Availability: {product?.availability}</small>
                    <h1 className="fw-bold mt-1 mb-2 pdp-title" style={{ color: '#4C0A2E', fontFamily: "'Rose Velt Personal Use Only', serif", textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: 'clamp(1.5rem, 2.4vw, 2rem)' }}>{product?.name}</h1>
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex me-2">{renderStars(product?.rating)}</div>
                      <span className="text-muted small">({product?.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                {/* <p className="pdp-subtle text-muted mb-1" style={{ maxWidth: 520 }}>{product?.highlights[0]}</p>
                <p className="pdp-subtle text-muted" style={{ maxWidth: 520 }}>{product?.highlights[1]}</p> */}
                <hr className="pdp-divider my-4" />
                <div className="text-end">
                  <div className="small text-muted mb-1">USD(incl. of all taxes)</div>
                  {/* <div className="display-6 fw-bold mb-3 pdp-price" style={{ color: '#4C0A2E' }}>${product?.price.toFixed(2)}</div> */}
                </div>

                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
                  <div className="d-flex gap-2">

                  </div>

                  <div className="text-end">
                    <div className="small fw-semibold text-muted mb-1">Quantity</div>
                    <div className="qty-wrap d-inline-flex align-items-center" role="group" aria-label="Quantity selector">
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}><FaMinus size={12} /></button>
                      <input
                        id="quantityInput"
                        type="number"
                        className="form-control form-control-sm text-center qty-input mx-2"
                        value={quantity}
                        min={1}
                        max={product?.stock}
                        onChange={(e) => {
                          const val = parseInt(e.target.value || '1', 10);
                          if (Number.isNaN(val)) return;
                          setQuantity(Math.min(Math.max(1, val), product?.stock));
                        }}
                        aria-describedby="stockHelp"
                        aria-live="polite"
                      />
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => handleQuantityChange(1)} disabled={quantity >= product?.stock}><FaPlus size={12} /></button>
                    </div>
                    <div id="stockHelp" className="small text-muted mt-2" aria-live="polite">Only {product?.stock} in stock</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="container pt-3 pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <ul className="nav border-0 justify-content-center mb-3" style={{ gap: 24 }}>
                {['description', 'ingredients', 'reviews'].map((key) => (
                  <li key={key} className="nav-item">
                    <button
                      className="nav-link border-0 px-2 py-2 fw-semibold"
                      onClick={() => setActiveTab(key)}
                      style={{
                        color: activeTab === key ? '#000' : '#666',
                        backgroundColor: 'transparent',
                        borderBottom: activeTab === key ? '3px solid #000' : '1px solid transparent',
                      }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="tab-content">
                {activeTab === 'description' && (
                  <div className="text-center px-4">
                    <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                      <Image src="/left-design.png" width={22} height={8} alt="decor-left" />
                      <h4 className="mb-0" style={{ color: '#4C0A2E', fontFamily: "'Rose Velt Personal Use Only', serif" }}>Glow from the cosmos with our luxurious body oil</h4>
                      <Image src="/right-design.png" width={22} height={8} alt="decor-right" />
                    </div>
                    <p className="text-muted" style={{ lineHeight: 1.8, maxWidth: 800, margin: '0 auto' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <p className="text-muted mt-3" style={{ lineHeight: 1.8, maxWidth: 800, margin: '0 auto' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="text-center px-4">
                    <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                      <Image src="/left-design.png" width={22} height={8} alt="decor-left" />
                      <h4 className="mb-0" style={{ color: '#4C0A2E', fontFamily: "'Rose Velt Personal Use Only', serif" }}>Natural Ingredients</h4>
                      <Image src="/right-design.png" width={22} height={8} alt="decor-right" />
                    </div>
                    <p className="text-muted" style={{ lineHeight: 1.8, maxWidth: 800, margin: '0 auto' }}>{product?.ingredients}</p>
                    <div className="mt-4">
                      <h5 className="mb-3" style={{ color: '#4C0A2E' }}>How to Use:</h5>
                      <p className="text-muted" style={{ lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>{product?.howToUse}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="text-center px-4">
                    <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                      <Image src="/left-design.png" width={22} height={8} alt="decor-left" />
                      <h4 className="mb-0" style={{ color: '#4C0A2E', fontFamily: "'Rose Velt Personal Use Only', serif" }}>Customer Reviews</h4>
                      <Image src="/right-design.png" width={22} height={8} alt="decor-right" />
                    </div>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                      <div className="d-flex me-3">{renderStars(product?.rating)}</div>
                      <span className="h5 mb-0 me-2">{product?.rating}</span>
                      <span className="text-muted">({product?.reviewCount} reviews)</span>
                    </div>
                    <p className="text-muted">Reviews will be displayed here...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="py-5" style={{ backgroundColor: '#fff' }}>
          <div className="container">
            <div className="text-center mb-4">
              <div className="d-flex align-items-center justify-content-center gap-2">
                <Image src="/left-design.png" width={20} height={8} alt="decor-left" />
                <h2 className="fw-bold mb-0 related-title" style={{ color: '#4C0A2E', letterSpacing: 1 }}>RELATED PRODUCTS</h2>
                <Image src="/right-design.png" width={20} height={8} alt="decor-right" />
              </div>
            </div>

            <div className="row">
              {relatedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  showShloka={true}
                  showTag={true}
                  cardHeight="380px"
                  className="mb-4"
                />
              ))}
            </div>
          </div>
        </div>
        <style jsx>{`
        .thumb-btn { border: 2px solid transparent; border-radius: 12px; overflow: hidden; }
        .thumb-btn.active { border-color: #4C0A2E; }
        .related-title { font-family: 'Rose Velt Personal Use Only', serif; letter-spacing: 1px; text-transform: uppercase; }
        .fade-in { animation: fadeIn .35s ease-in-out both; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .gallery-nav-btn { position: absolute; top: 50%; transform: translateY(-50%); z-index: 2; background: rgba(0,0,0,0.45); color: #fff; border: 0; width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; font-size: 22px; line-height: 1; }
        .gallery-nav-btn:disabled { opacity: .4; cursor: not-allowed; }
        .gallery-nav-btn.start-0 { left: 10px; }
        .gallery-nav-btn.end-0 { right: 10px; }
        .qty-input { width: 64px; }
        @media (max-width: 768px) {
          :global(img[src="/left-design.png"]), :global(img[src="/right-design.png"]) { display: none !important; }
          .related-title { font-size: 1.5rem !important; }
        }
        
        @media (max-width: 480px) {
          .container {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          
          .pdp-title {
            font-size: clamp(1.3rem, 2.2vw, 1.8rem) !important;
          }
          
          .pdp-subtle {
            font-size: 0.85rem !important;
            margin-bottom: 8px !important;
          }
          
          .pdp-price {
            font-size: 1.8rem !important;
          }
          
          .gallery-nav-btn {
            width: 30px !important;
            height: 30px !important;
            font-size: 18px !important;
          }
          
          .gallery-nav-btn.start-0 { left: 8px; }
          .gallery-nav-btn.end-0 { right: 8px; }
          
          .qty-input {
            width: 56px !important;
            font-size: 0.9rem !important;
          }
          
          .nav {
            gap: 16px !important;
          }
          
          .nav-link {
            font-size: 0.9rem !important;
            padding: 8px 12px !important;
          }
          
          .tab-content h4 {
            font-size: 1.1rem !important;
          }
          
          .tab-content p {
            font-size: 0.85rem !important;
            line-height: 1.6 !important;
            padding: 0 8px !important;
          }
          
          .related-title {
            font-size: 1.3rem !important;
          }
          
          .breadcrumb {
            font-size: 0.85rem !important;
          }
        }
      `}</style>
      </div>
    </Navbar>
  );
}