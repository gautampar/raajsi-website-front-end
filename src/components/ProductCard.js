import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ 
  product, 
  className = "", 
  style = {},
  showShloka = false,
  showTag = true,
  cardHeight = "350px",
  onAddToCart = null,
  isMobile = false
}) => {
  const [isTranslated, setIsTranslated] = useState(false);
  
  // Sanskrit and English text
  const sanskritText = "मुग्धे! धानुष्कता केयमपूर्वा त्वयि दृश्यते यया विध्यसि चेतांसि गुणैरेव न सायकैः ॥";
  const englishText = "O Charming One! An unprecedented archery is seen in you, by which you pierce hearts with virtues alone, not with arrows.";
  
  const toggleTranslation = () => {
    setIsTranslated(!isTranslated);
  };
  
  if (!product) return null;

  // For mobile slider items, we don't include the outer col div
  if (isMobile) {
    return (
      <>
        <style jsx>{`
          .product-card-mobile {
            height: ${cardHeight};
            background-image: url(${product.image});
            background-size: cover;
            background-position: center;
            border-radius: 15px;
            position: relative;
            overflow: hidden;
            border: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          .shloka-mobile {
            position: absolute;
            top: 15px;
            left: 15px;
            color: #fff;
            font-size: 0.85rem;
            font-family: Georgia, serif;
            max-width: 70%;
            line-height: 1.5;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.5);
            font-weight: 500;
            letter-spacing: 0.5px;
            z-index: 2;
            border-radius: 8px;
            display: flex;
            align-items: flex-start;
            gap: 10px;
            cursor: pointer;
            transition: opacity 0.3s ease;
          }
          .shloka-mobile:hover {
            opacity: 0.9;
          }
          .translate-icon {
            cursor: pointer;
            transition: transform 0.3s ease;
          }
          .translate-icon:hover {
            transform: scale(1.1);
          }
          .tag-mobile {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.6);
            color: #fff;
            padding: 4px 10px;
            font-size: 0.7rem;
            border-radius: 20px;
            font-weight: 500;
            font-family: Arial, sans-serif;
            z-index: 2;
            backdrop-filter: blur(4px);
          }
          .overlay-mobile {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.4) 100%);
            z-index: 1;
          }
          .content-mobile {
            position: absolute;
            bottom: 0;
            width: 100%;
            color: #fff;
            padding: 1rem;
            font-family: Georgia, serif;
            margin-top: 40px;
            z-index: 2;
            background: linear-gradient(transparent, rgba(0,0,0,0.7));
          }
          .title-mobile {
            font-weight: bold;
            padding-left: 10px;
            margin-bottom: 8px;
            margin-top: 18px;
            text-align: left;
            font-family: 'Rose Velt Personal Use Only', serif;
          }
          .desc-mobile {
            font-size: 14px;
            padding-left: 10px;
            margin-bottom: 10px;
            text-align: left;
            font-family: Avenir, sans-serif;
          }
          @media (max-width: 768px) {
            .shloka-mobile {
              font-size: 0.65rem;
              max-width: 80%;
              gap: 6px;
            }
            .title-mobile {
              font-size: 1rem;
            }
            .desc-mobile {
              font-size: 0.8rem;
            }
          }
          
          @media (max-width: 480px) {
            .product-card-mobile {
              border-radius: 12px;
            }
            .shloka-mobile {
              font-size: 0.6rem;
              max-width: 85%;
              gap: 5px;
              top: 12px;
              left: 12px;
            }
            .translate-icon {
              width: 32px !important;
              height: 32px !important;
            }
            .tag-mobile {
              font-size: 0.65rem;
              padding: 3px 8px;
              top: 8px;
              right: 8px;
            }
            .content-mobile {
              padding: 0.75rem;
            }
            .title-mobile {
              font-size: 0.9rem;
              margin-bottom: 6px;
              margin-top: 12px;
            }
            .desc-mobile {
              font-size: 0.75rem;
              margin-bottom: 8px;
            }
          }
        `}</style>
        <div className="card w-100 product-card-mobile" style={style}>
          {/* Shloka - Optional */}
          {showShloka && (
            <div className="shloka-mobile" onClick={toggleTranslation}>
              <Image
                src="/translate.png"
                alt="Translation"
                width={40}
                height={40}
                className="translate-icon"
                style={{
                  flexShrink: 0,
                  marginTop: "2px",
                  cursor: "pointer"
                }}
              />
              <div style={{
                fontFamily: isTranslated ? 'Avenir, sans-serif' : 'Georgia, serif',
                lineHeight: isTranslated ? '1.2' : '1.5'
              }}>
                {isTranslated ? englishText : (
                  <>
                    मुग्धे! धानुष्कता केयमपूर्वा त्वयि दृश्यते{" "}
                    <br />
                    यया विध्यसि चेतांसि गुणैरेव न सायकैः ॥
                  </>
                )}
              </div>
            </div>
          )}

          {/* Tag/Label - Optional */}
          {showTag && (
            <div className="tag-mobile">
              Ingredients & Benefits
            </div>
          )}

          {/* Enhanced overlay for better text readability */}
          <div className="overlay-mobile" />

          {/* Content at bottom */}
          <div className="content-mobile">
            <h5 className="title-mobile">
              {product.title || product.name}
            </h5>
            <p className="desc-mobile">
              {product.desc || product.description}
            </p>
          </div>
        </div>
      </>
    );
  }

  // Desktop version with full column wrapper and button/price section
  return (
    <>
      <style jsx>{`
        .product-card-desktop {
          height: ${cardHeight};
          background-image: url(${product.image});
          background-size: cover;
          background-position: center;
          border-radius: 15px;
          position: relative;
          overflow: hidden;
          border: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .shloka-desktop {
          position: absolute;
          top: 15px;
          left: 15px;
          color: #fff;
          font-size: 0.85rem;
          font-family: Georgia, serif;
          max-width: 70%;
          line-height: 1.5;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.5);
          font-weight: 500;
          letter-spacing: 0.5px;
          z-index: 2;
          border-radius: 8px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }
        .shloka-desktop:hover {
          opacity: 0.9;
        }
        .translate-icon-desktop {
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .translate-icon-desktop:hover {
          transform: scale(1.1);
        }
        .tag-desktop {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgba(0, 0, 0, 0.6);
          color: #fff;
          padding: 4px 10px;
          font-size: 0.7rem;
          border-radius: 20px;
          font-weight: 500;
          font-family: Arial, sans-serif;
          z-index: 2;
          backdrop-filter: blur(4px);
        }
        .overlay-desktop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.4) 100%);
          z-index: 1;
        }
        .content-desktop {
          position: absolute;
          bottom: 0;
          width: 100%;
          color: #fff;
          padding: 1rem;
          font-family: Georgia, serif;
          margin-top: 40px;
          z-index: 2;
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
        }
        .title-desktop {
          font-weight: bold;
          padding-left: 10px;
          margin-bottom: 8px;
          margin-top: 18px;
          text-align: left;
          font-family: 'Rose Velt Personal Use Only', serif;
        }
        .desc-desktop {
          font-size: 14px;
          padding-left: 10px;
          margin-bottom: 10px;
          text-align: left;
          font-family: Avenir, sans-serif;
        }
        @media (max-width: 768px) {
          .product-card-desktop {
            height: 300px !important;
          }
          .shloka-desktop {
            font-size: 0.65rem;
            max-width: 80%;
            gap: 6px;
          }
          .title-desktop {
            font-size: 1rem;
          }
          .desc-desktop {
            font-size: 0.8rem;
          }
        }
        
        @media (max-width: 480px) {
          .product-card-desktop {
            height: 280px !important;
            border-radius: 12px;
          }
          .shloka-desktop {
            font-size: 0.6rem;
            max-width: 85%;
            gap: 5px;
            top: 12px;
            left: 12px;
          }
          .translate-icon-desktop {
            width: 32px !important;
            height: 32px !important;
          }
          .tag-desktop {
            font-size: 0.65rem;
            padding: 3px 8px;
            top: 8px;
            right: 8px;
          }
          .content-desktop {
            padding: 0.75rem;
          }
          .title-desktop {
            font-size: 0.9rem;
            margin-bottom: 6px;
            margin-top: 12px;
            padding-left: 8px;
          }
          .desc-desktop {
            font-size: 0.75rem;
            margin-bottom: 8px;
            padding-left: 8px;
          }
        }
      `}</style>
      <div className={`col-12 col-md-6 d-flex flex-column align-items-center ${className}`} style={style}>
        <div className="card w-100 product-card-desktop">
          {/* Shloka - Optional */}
          {showShloka && (
            <div className="shloka-desktop" onClick={toggleTranslation}>
              <Image
                src="/translate.png"
                alt="Translation"
                width={40}
                height={40}
                className="translate-icon-desktop"
                style={{
                  flexShrink: 0,
                  marginTop: "2px",
                  cursor: "pointer"
                }}
              />
              <div style={{
                fontFamily: isTranslated ? 'Avenir, sans-serif' : 'Georgia, serif',
                lineHeight: isTranslated ? '1.2' : '1.5'
              }}>
                {isTranslated ? englishText : (
                  <>
                    मुग्धे! धानुष्कता केयमपूर्वा त्वयि दृश्यते{" "}
                    <br />
                    यया विध्यसि चेतांसि गुणैरेव न सायकैः ॥
                  </>
                )}
              </div>
            </div>
          )}

          {/* Tag/Label - Optional */}
          {showTag && (
            <div className="tag-desktop">
              Ingredients & Benefits
            </div>
          )}

          {/* Enhanced overlay for better text readability */}
          <div className="overlay-desktop" />

          {/* Content at bottom */}
          <div className="content-desktop">
            <h5 className="title-desktop">
              {product.title || product.name}
            </h5>
            <p className="desc-desktop">
              {product.desc || product.description}
            </p>
          </div>
        </div>

        {/* Button & Price Section */}
        <div className="d-flex justify-content-between w-100 px-2 px-md-4 mt-2">
          <Link
            href={`/product/${product.id || '1'}`}
            className="btn btn-sm d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: "#BA7E38",
              color: "white",
              borderRadius: "30px",
              height: "40px",
              minHeight: "40px",
              lineHeight: "40px",
              padding: "0 24px",
              fontWeight: 500,
              fontSize: "1rem",
              textDecoration: "none"
            }}
          >
            VIEW PRODUCT
          </Link>
          
          <div className="text-end">
            <strong style={{ fontSize: "14px", color: "#000" }}>
              {product.price}
            </strong>
            {product.oldPrice && (
              <div
                style={{
                  fontSize: "0.75rem",
                  textDecoration: "line-through",
                  color: "gray",
                }}
              >
                Get 50% OFF {product.oldPrice}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;