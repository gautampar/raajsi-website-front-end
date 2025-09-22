"use client";

import React, { useState, useEffect } from "react";

export default function RoyalPromisesPage() {
  // Responsive hero banner height - same as home page
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
  const items = [
    {
      title:
        "TIME-TESTED FORMULAS DERIVED FROM ANCIENT SCIENCES AND SCRIPTURES",
      desc:
        "Rooted in Ayurveda and proven through generations of ritual wisdom.",
      img: "/blog1.png",
    },
    {
      title: "HIGH-QUALITY, ORGANIC INGREDIENTS FOR OPTIMAL EFFICACY",
      desc:
        "Sourced from certified farms to ensure purity and potency in every drop.",
      img: "/blog2.png",
    },
    {
      title: "ECO-FRIENDLY MANUFACTURING PROCESSES",
      desc: "Produced in small batches using low-impact, conscious methods.",
      img: "/blog3.png",
    },
    {
      title: "CRUELTY-FREE AND SUSTAINABLE PRACTICES",
      desc:
        "Approved by ethical standards—never tested on animals, always kind to nature.",
      img: "/blog1.png",
    },
    {
      title: "ECO-FRIENDLY MANUFACTURING PROCESSES",
      desc: "Produced in small batches using low-impact, conscious methods.",
      img: "/blog2.png",
    },
    {
      title: "CRUELTY-FREE AND SUSTAINABLE PRACTICES",
      desc:
        "Approved by ethical standards—never tested on animals, always kind to nature.",
      img: "/blog3.png",
    },
  ];

  const headingColor = "#C28A58"; // regal gold/bronze
  const bodyColor = "#5E4D3F";
  const lineColor = "#E9D9C9";
  const cream = "#FBF4EC";

  return (
    <main>
      {/* Banner Section - similar style to homepage hero */}
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
              fontFamily: "'Rose Velt Personal Use Only', serif",
              fontWeight: 400,
              fontSize: "clamp(32px, 5.5vw, 32px)",
              lineHeight: 1.1,
              letterSpacing: 0.5,
              textTransform: "none",
              textShadow: "0 2px 24px rgba(0,0,0,0.55), 0 0 2px rgba(0,0,0,0.4)",
              marginTop: "60px",
            }}
          >
            At Raajsi, luxury meets responsibility.
          </h1>
          <p
            style={{
              marginTop: 12,
              color: "#FFFFFF",
              fontFamily: "Avenir, sans-serif",
              fontSize: "clamp(14px, 1.4vw, 18px)",
              lineHeight: 1.6,
              maxWidth: "min(700px, calc(100% - 16px))",
              textShadow: "0 1px 12px rgba(0,0,0,0.45)",
              paddingRight: "8px",
            }}
          >
            Our royal promise is built on integrity, transparency, and timeless care - for you and the planet.
          </p>
        </div>
      </div>

      {/* Section Title */}
      <section style={{ padding: "48px 16px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
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
              THE ROYAL PROMISE
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
        </div>
      </section>

      {/* Timeline Card */}
      <section style={{ padding: "28px 16px 72px" }}>
        <div
          className="rp-card"
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            background: cream,
            border: `1px solid ${lineColor}`,
            borderRadius: 16,
            padding: "40px 36px",
            position: "relative",
            boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
          }}
        >
          {/* Center Vertical Line */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 18,
              bottom: 18,
              left: "50%",
              width: 1,
              transform: "translateX(-50%)",
              background: lineColor,
            }}
          />

          <div>
            {items.map((it, i) => {
              const isLeftImage = i % 2 === 0; // alternate
              return (
                <div
                  key={i}
                  className="rp-row"
                  data-order={isLeftImage ? "image-first" : "text-first"}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 48,
                    alignItems: "center",
                    position: "relative",
                    padding: "22px 0",
                  }}
                >
                  {/* decorative leaf near the center */}
                  <img
                    src="/dot.png"
                    alt="decor"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 18,
                      height: 18,
                      zIndex: 2,
                      filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.15))",
                    }}
                  />

                  {/* Left cell */}
                  {isLeftImage ? (
                    <div className="rp-media" style={{ width: "92%", justifySelf: "start" }}>
                      <img
                        src={it.img}
                        alt="visual"
                        className="rp-img"
                        style={{
                          width: "100%",
                          height: 240,
                          objectFit: "cover",
                          borderRadius: 14,
                          boxShadow: "0 8px 22px rgba(0,0,0,0.10)",
                          transition: "transform .35s ease, box-shadow .35s ease",
                        }}
                      />
                    </div>
                  ) : (
                    <div className="rp-text" style={{ textAlign: "right" }}>
                      <img src="/dot.png" alt="" className="rp-mobile-icon" />
                       <h4
                         style={{
                           fontFamily: "'Rose Velt Personal Use Only', serif",
                           color: headingColor,
                           fontSize: 22,
                           textTransform: "uppercase",
                           letterSpacing: 0.6,
                           lineHeight: 1.4,
                           margin: 0,
                         }}
                       >
                         {it.title}
                       </h4>
                      <p
                        style={{
                          margin: "10px 0 0",
                          fontSize: 13,
                          color: "#6A5B51",
                          letterSpacing: 0.15,
                          lineHeight: 1.65,
                          fontFamily: "Avenir, sans-serif",
                        }}
                      >
                        {it.desc}
                      </p>
                    </div>
                  )}

                  {/* Right cell */}
                  {!isLeftImage ? (
                    <div className="rp-media" style={{ width: "92%", justifySelf: "end" }}>
                      <img
                        src={it.img}
                        alt="visual"
                        className="rp-img"
                        style={{
                          width: "100%",
                          height: 240,
                          objectFit: "cover",
                          borderRadius: 14,
                          boxShadow: "0 8px 22px rgba(0,0,0,0.10)",
                          transition: "transform .35s ease, box-shadow .35s ease",
                        }}
                      />
                    </div>
                  ) : (
                    <div className="rp-text" style={{ textAlign: "left" }}>
                      <img src="/dot.png" alt="" className="rp-mobile-icon" />
                       <h4
                         style={{
                           fontFamily: "'Rose Velt Personal Use Only', serif",
                           color: headingColor,
                           fontSize: 22,
                           textTransform: "uppercase",
                           letterSpacing: 0.6,
                           lineHeight: 1.4,
                           margin: 0,
                         }}
                       >
                         {it.title}
                       </h4>
                      <p
                        style={{
                          margin: "10px 0 0",
                          fontSize: 13,
                          color: "#6A5B51",
                          letterSpacing: 0.15,
                          lineHeight: 1.65,
                          fontFamily: "Avenir, sans-serif",
                        }}
                      >
                        {it.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        .rp-media:hover .rp-img {
          transform: translateY(-2px) scale(1.025);
          box-shadow: 0 12px 30px rgba(0,0,0,0.14);
        }
        .rp-text:hover {
          transform: translateY(-1px);
          transition: transform .25s ease;
        }
        .rp-mobile-icon { display: none; }
         @media (max-width: 992px) {
          .rp-row {
            grid-template-columns: 1fr !important;
          }
          .rp-row > img[alt='decor'] {
            display: none !important;
          }
          div[aria-hidden] { /* center line */
            display: none !important;
          }
          .rp-text { text-align: left !important; }
        }
        @media (max-width: 768px) {
          .rp-row { display: flex !important; flex-direction: column !important; }
          /* Mobile: enforce a consistent order for all rows: image -> text */
          .rp-row .rp-media { order: 1; }
          .rp-row .rp-text { order: 2; }
          .rp-text h4 { display: inline-flex; align-items: center; gap: 8px; }
          .rp-mobile-icon { display: inline-block; width: 14px; height: 14px; filter: drop-shadow(0 1px 1px rgba(0,0,0,0.12)); }
          .rp-img { height: 200px !important; }
          .rp-row { gap: 16px !important; padding: 18px 0 !important; }
          .rp-media { width: 100% !important; justify-self: stretch !important; }
          .rp-text { padding: 6px 2px !important; }
          .rp-text p { line-height: 1.7 !important; }
          .rp-card { padding: 24px 16px !important; border-radius: 12px !important; }
          .rp-hero .hero-title { font-size: 26px !important; line-height: 1.2 !important; letter-spacing: 0.2px !important; }
          .rp-hero .hero-desc { font-size: 14px !important; line-height: 1.6 !important; }
          .rp-text h4 { font-size: 18px !important; }
          /* Ornament icons */
          img[alt="Left Icon"], img[alt="Right Icon"] {
            max-width: 28px !important;
          }
        }
        @media (max-width: 480px) {
          .rp-img { height: 180px !important; }
          .rp-row { gap: 14px !important; padding: 16px 0 !important; }
          .rp-card { padding: 20px 12px !important; border-radius: 10px !important; }
          .rp-hero .hero-title { font-size: 22px !important; line-height: 1.25 !important; }
          .rp-hero .hero-desc { font-size: 13px !important; line-height: 1.65 !important; }
          .rp-text h4 { font-size: 16px !important; }
          .rp-text p { font-size: 12px !important; line-height: 1.75 !important; }
          /* Ornament icons */
          img[alt="Left Icon"], img[alt="Right Icon"] {
            max-width: 24px !important;
          }
          /* Hero banner text improvements for 468px devices */
          .position-absolute {
            left: clamp(16px, 4vw, 24px) !important;
            right: 16px !important;
            max-width: calc(100vw - 32px) !important;
            padding-right: 8px !important;
          }
          .position-absolute h1 {
            font-size: clamp(24px, 5vw, 28px) !important;
            line-height: 1.2 !important;
            margin-top: 40px !important;
            padding-right: 8px !important;
          }
          .position-absolute p {
            font-size: clamp(13px, 1.3vw, 15px) !important;
            line-height: 1.5 !important;
            margin-top: 10px !important;
            max-width: calc(100% - 8px) !important;
            padding-right: 8px !important;
          }
        }
        @media (max-width: 468px) {
          /* Specific fixes for 468px devices */
          .position-absolute {
            left: 12px !important;
            right: 12px !important;
            max-width: calc(100vw - 24px) !important;
            padding-right: 6px !important;
          }
          .position-absolute h1 {
            font-size: 22px !important;
            line-height: 1.15 !important;
            margin-top: 35px !important;
            padding-right: 6px !important;
          }
          .position-absolute p {
            font-size: 13px !important;
            line-height: 1.45 !important;
            margin-top: 8px !important;
            max-width: calc(100% - 6px) !important;
            padding-right: 6px !important;
          }
        }
      `}</style>
    </main>
  );
}
