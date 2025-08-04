import { users } from "../data/users";
import style from "../style";
import useDisplayCategory from "../hooks/useDisplayCategory";
import { motion } from "framer-motion";

export default function UserLogosHero() {
  const displayCategory = useDisplayCategory();
  const isMobile = displayCategory === "mobile";
  const isTablet = displayCategory === "tablet";

  // Create multiple rows of logos for a collage effect
  const logoRows = [
    users.slice(0, 4),
    users.slice(4, 8),
    users.slice(8, 10).concat(users.slice(0, 2)), // Repeat some logos to fill the row
  ];

  const containerStyle = {
    width: "100%",
    height: isMobile ? "300px" : "400px",
    position: "relative",
    overflow: "hidden",
    backgroundColor: style.colors.LIGHT_GRAY_98,
    borderRadius: "8px",
    marginBottom: "40px",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, 
      rgba(46, 54, 80, 0.05) 0%, 
      rgba(57, 198, 192, 0.08) 50%, 
      rgba(46, 54, 80, 0.05) 100%)`,
    pointerEvents: "none",
    zIndex: 2,
  };

  const titleOverlayStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 3,
    textAlign: "center",
    width: "90%",
    maxWidth: "800px",
  };

  const titleBackgroundStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: isMobile ? "20px 15px" : "30px 40px",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
  };

  const titleStyle = {
    fontSize: isMobile ? "24px" : isTablet ? "32px" : "36px",
    fontWeight: "bold",
    color: style.colors.BLUE,
    margin: "0 0 10px 0",
    fontFamily: style.fonts.BODY_FONT,
  };

  const subtitleStyle = {
    fontSize: isMobile ? "14px" : "16px",
    color: style.colors.DARK_GRAY,
    margin: 0,
    fontFamily: style.fonts.BODY_FONT,
  };

  const rowStyle = (index) => ({
    display: "flex",
    position: "absolute",
    left: 0,
    right: 0,
    top: `${index * 33.33}%`,
    height: "33.33%",
    alignItems: "center",
    justifyContent: "center",
    gap: isMobile ? "20px" : "40px",
    opacity: 0.7,
    filter: "grayscale(20%)",
    transform: index % 2 === 0 ? "translateX(0)" : "translateX(-50px)",
  });

  const logoStyle = {
    height: isMobile ? "50px" : "70px",
    width: "auto",
    maxWidth: isMobile ? "100px" : "140px",
    objectFit: "contain",
    filter: "brightness(1.1)",
  };

  return (
    <div style={containerStyle}>
      {/* Logo rows */}
      {logoRows.map((row, rowIndex) => (
        <motion.div
          key={rowIndex}
          style={rowStyle(rowIndex)}
          animate={{
            x: rowIndex % 2 === 0 ? [0, 50, 0] : [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Duplicate the row for seamless scrolling */}
          {[...row, ...row].map((user, index) => (
            <img
              key={`${user.id}-${index}`}
              src={user.logo}
              alt=""
              style={logoStyle}
              aria-hidden="true"
            />
          ))}
        </motion.div>
      ))}

      {/* Gradient overlay */}
      <div style={overlayStyle} />

      {/* Title overlay */}
      <div style={titleOverlayStyle}>
        <div style={titleBackgroundStyle}>
          <h2 style={titleStyle}>Trusted by Leading Organizations</h2>
          <p style={subtitleStyle}>
            From government agencies to academic institutions and advocacy
            groups
          </p>
        </div>
      </div>
    </div>
  );
}
