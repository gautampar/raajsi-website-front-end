"use client";
import Image from "next/image";
export default function OurEssence() {
  return (
    <>
      <style jsx>{`
        :root {
          --essence-max-w: 1210px;
          --card-h: 360px;
          --band-h: 300px;
          --beige-1: #faf5ee;
          --beige-2: #f4e7d6;
          --text-dark: #2b2b2b;
          --brand-accent: #ffb660;
          --brand-plum: #4c0a2e;
        }

        /* Row background bands that stretch full viewport width */
        .essence-row {
          position: relative;
          padding: 34px 0; /* vertical rhythm around cards */
        }
        .essence-row::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100vw;
          height: var(--band-h);
          z-index: 0;
          pointer-events: none;
        }
        .essence-row.right::before {
          background: linear-gradient(90deg, transparent 0 50%, var(--beige-2) 50% 100%);
        }
        .essence-row.left::before {
          background: linear-gradient(90deg, var(--beige-2) 0 50%, transparent 50% 100%);
        }

        /* Essence cards */
        .essence-card {
          display: flex;
          flex-direction: column;
          border-radius: 20px;
          overflow: hidden;
          width: var(--essence-max-w);
          height: var(--card-h);
          position: relative;
          background: #fff;
          z-index: 1; /* above the band */
        }
        .essence-body {
          flex: 1;
          color: var(--text-dark);
        }
        /* Vertically center content within the card column */
        .vcenter {
          min-height: var(--card-h);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 10px; /* tidy spacing between title and paragraph */
        }
        .essence-title {
          font-family: 'Rose Velt Personal Use Only', serif;
          color: var(--brand-accent);
          font-size: 32px;
          font-weight: 200;
          letter-spacing: 0px;
          line-height: 1;
          margin: 0 0 12px 0;
          position: relative;
          display: inline-block;
          text-transform: uppercase;
        }
        .essence-title:before {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--brand-accent);
          display: inline-block;
          margin-right: 10px;
          transform: translateY(-2px);
        }
        .essence-text {
          font-family: Avenir, sans-serif;
          font-size: 15px;
          line-height: 1.6;
          font-weight: 300;
          margin: 0;
          letter-spacing: 0;
        }
        .img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: drop-shadow(0 12px 24px rgba(0,0,0,0.15));
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          /* Hide background bands on mobile for clean stack */
          .essence-row::before { display: none; }

          /* Hero section mobile styles */
          section.d-flex.flex-column.justify-content-center.align-items-center.position-relative.text-center {
            padding-top: 80px !important;
            padding-bottom: 40px !important;
            min-height: 50vh !important;
          }
          h2 {
            font-size: 1.3rem !important;
            line-height: 1.3 !important;
            padding: 0 15px !important;
            margin-bottom: 15px !important;
          }
          p.mt-2.text-dark {
            font-size: 0.9rem !important;
            max-width: 95vw !important;
            padding: 0 15px !important;
            line-height: 1.4 !important;
          }
          .mt-4 button {
            width: 35px !important;
            height: 35px !important;
            font-size: 1.2rem !important;
          }

          /* Content sections mobile styles */
          .my-5.d-flex.justify-content-center {
            margin: 20px 0 !important;
            padding: 0 15px !important;
          }
          .essence-card {
            flex-direction: column !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            border-radius: 15px !important;
            margin-bottom: 20px !important;
            background: #fff !important;
          }
          /* Image should appear first on mobile */
          .essence-card > .img-wrap {
            order: -1 !important;
            height: 250px !important;
            flex: none !important;
          }
          .essence-card .p-4, 
          .essence-card .p-md-5 {
            padding: 25px 15px !important;
            margin-left: 0 !important;
            margin-top: 0 !important;
            text-align: center !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .essence-title {
            font-size: 1.4rem !important;
            margin-bottom: 15px !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }
          .essence-text {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
            text-align: center !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            hyphens: auto !important;
          }
          .essence-card img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            border-radius: 15px 15px 0 0 !important;
            filter: none !important;
          }
          /* Remove forced equal height on mobile */
          .vcenter {
            min-height: auto !important;
            justify-content: flex-start !important;
            gap: 8px !important;
          }
        }
      `}</style>
      <section
        className="d-flex flex-column justify-content-center align-items-center position-relative text-center"
        style={{
          minHeight: "60vh",
          paddingTop: "120px",
          backgroundColor: "#fff",
          backgroundImage: "url('/im1.png')",
          backgroundSize: "400px 250px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Main Heading */}
        <h2
          style={{
            fontFamily: "'Rose Velt Personal Use Only', serif",
            color: "#4C0A2E",
            fontWeight: "bold",
            fontSize: "1.6rem",
            letterSpacing: "1px",
            margin: 0,
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: "1.8rem" }}>A</span>T <span style={{ fontSize: "1.8rem" }}>R</span>AAJSI, <span style={{ fontSize: "1.8rem" }}>L</span>UXURY <span style={{ fontSize: "1.8rem" }}>M</span>EETS <span style={{ fontSize: "1.8rem" }}>R</span>ESPONSIBILITY.
        </h2>

        {/* Subheading */}
        <p
          className="mt-2 text-dark"
          style={{
            fontSize: "14px",
            fontWeight: 500,
            maxWidth: "760px",
            zIndex: 1,
            fontFamily: "Avenir, sans-serif",
          }}
        >
          RAAJSI is a premium Ayurvedic beauty and wellness brand with a royal conscience—uniting heritage and integrity for a modern ritual. <br />
          Immerse yourself in our scents, textures, and colours inspired by tradition and crafted for today.
        </p>

        {/* Circular Down-Arrow Button */}
        <div className="mt-4 d-flex justify-content-center">
          <button
            onClick={() => {
              const nextSection = document.querySelector('section:not(:first-child)');
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            style={{
              fontSize: "2rem",
              border: "2px solid #414141",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backgroundColor: "transparent",
              color: "#414141",
              transition: "all 0.3s ease",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(180, 131, 56, 0.2)";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgba(180, 131, 56, 0.1)";
              e.target.style.transform = "scale(1)";
            }}
          >
            &#8595;
          </button>
        </div>

        {/* Placeholder for Next Section Anchor */}
        <div id="essence-next"></div>
      </section>

      {/* Section 1 - Text Left, Image Right */}
      <section className="my-5 d-flex justify-content-center essence-row right">
        <div className="essence-card d-flex flex-column flex-md-row">
          {/* Left Text Section */}
          <div className="p-4 p-md-5 essence-body vcenter" style={{ flex: 1, marginLeft: "30px" }}>
            <h5 className="fw-regular essence-title">
              <span style={{ fontSize: "32px", marginLeft: "-16px" }}>G</span>ENESIS
            </h5>
            <p className="essence-text">
              Raajsi is a premium Ayurvedic wellness and beauty brand, crafted for those who seek grace, balance, and timeless elegance in their self-care. Rooted in the sacred traditions of Indian royalty and ancient healing, Raajsi is where Ayurveda meets regal ritual, creating an experience that is as restorative as it is luxurious.
            </p>
          </div>

          {/* Right Image Section */}
          <div className="img-wrap" style={{ flex: 1, height: "calc(var(--card-h))", position: "relative" }}>
            <img
              src="/es1.png"
              alt="Genesis Artwork"
              className="essence-img"
              style={{ borderRadius: "0px", marginTop: "0px" }}
            />
          </div>
        </div>
      </section>

      {/* Section 2 - Image Left, Text Right */}
      <section className="my-5 d-flex justify-content-center essence-row left">
        <div className="essence-card d-flex flex-column flex-md-row">
          {/* Left Image */}
          <div className="img-wrap" style={{ flex: 1, height: "calc(var(--card-h))" }}>
            <img
              src="/es2.png"
              alt="Creative Artistic Description"
              className="essence-img"
              style={{ marginTop: "0px" }}
            />
          </div>

          {/* Right Content */}
          <div className="p-4 p-md-5 d-flex flex-column justify-content-center essence-body" style={{ flex: 1, paddingTop: "10px" }}>
            <h5 className="fw-regular mb-3 essence-title">
              <span style={{ fontSize: "32px", marginLeft: "-16px"}}>C</span>REATIVE / <span style={{ fontSize: "32px" }}>A</span>RTISTIC <span style={{ fontSize: "32px" }}>D</span>ESCRIPTION
            </h5>
            <p className="essence-text">
              Bathed in the golden glow of tradition, Raajsi is a sensory journey through time — where the velvet touch of uttaras, the aroma of pure rose, and the soothing whispers of sandalwood evoke the grandeur of palatial rituals. Every drop, every grain, every scent is a nod to a time when beauty was sacred and rituals were revered. Here, skincare is poetry, and self-care is an ode to your inner queen.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 - Text Left, Image Right */}
      <section className="my-5 d-flex justify-content-center essence-row right">
        <div className="essence-card d-flex flex-column flex-md-row">
          <div className="p-4 p-md-5 essence-body vcenter" style={{ flex: 1, marginLeft: "30px" }}>
            <h5 className="fw-regular essence-title">
              <span style={{ fontSize: "32px", marginLeft: "-16px" }}>P</span>HILOSOPHY
            </h5>
            <p className="essence-text">
              Raajsi is born from a belief that beauty should be real —
              rich in spirit, grounded in wisdom, and radiant in grace.
              With every concoction, we honour tradition, integrity, and
              conscious care; drawing from royal wisdom and modern wellness
              science.
            </p>
          </div>

          <div className="img-wrap" style={{ flex: 1, height: "calc(var(--card-h))" }}>
            <img
              src="/es1.png"
              alt="Genesis Artwork"
              className="essence-img"
              style={{ borderRadius: "0px", marginTop: "0px" }}
            />
          </div>
        </div>
      </section>

      {/* Section 4 - Image Left, Text Right */}
      <section className="my-5 d-flex justify-content-center essence-row left">
        <div className="essence-card d-flex flex-column flex-md-row">
          <div className="img-wrap" style={{ flex: 1, height: "calc(var(--card-h))" }}>
            <img
              src="/es2.png"
              alt="Creative Artistic Description"
              className="essence-img"
              style={{ marginTop: "0px" }}
            />
          </div>

          {/* Right Content */}
          <div className="p-4 p-md-5 d-flex flex-column justify-content-center essence-body" style={{ flex: 1, paddingTop: "10px" }}>
            <h5 className="fw-regular mb-3 essence-title">
              <span style={{ fontSize: "32px", marginLeft: "-16px" }}>A</span>SPIRATIONAL <span style={{ fontSize: "32px" }}>B</span>EAUTY
            </h5>
            <p className="essence-text">
              When a ritual doesn’t just feel elegant, it is a world of solace,
              reflection, expansion — a world of power that’s felt and not
              spoken.
              <br />
              Raajsi is the modern mystic; one who owns the voice, the honour
              within; whose grace is soft yet decisive; whose rituals become
              your home and your heritage.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
