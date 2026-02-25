import React, { useState } from "react";
import { theme } from "../../../core/theme.js";
// import { FaPlay, FaPause } from "react-icons/fa";
import { imageUrl } from "../../../core/config.ts";

type PodcastCardProps = {
  image: string | null;
  title: string | null;
  description: string | null;
  createdAt: string | null;
  audioSrc: string | null;
  category?: string | null;
};

const PodcastCard: React.FC<PodcastCardProps> = ({
  image,
  title,
  description,
  createdAt,
  category,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: theme.colors.surface,
        borderRadius: "16px",
        fontFamily: theme.typography.fontFamily,
        overflow: "hidden",
        border: `1px solid ${theme.colors.accent}`,
        boxShadow: isHovered
          ? "0 12px 24px rgba(0, 0, 0, 0.12)"
          : "0 4px 12px rgba(0, 0, 0, 0.05)",
        transform: isHovered ? "translateY(-4px)" : "none",
        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={imageUrl + image!}
          alt={title!}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        {/* Overlay gradient for better text readability if we add text on image later */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "12px",
              gap: "12px",
            }}
          >
            <h3
              style={{
                color: theme.colors.secondary,
                fontSize: "18px",
                fontWeight: 600,
                margin: 0,
                flex: 1,
                lineHeight: 1.3,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                transition: "color 0.2s ease",
              }}
            >
              {title}
            </h3>
            <span
              style={{
                color: theme.colors.textcolor,
                fontSize: "12px",
                fontWeight: 500,
                whiteSpace: "nowrap",
                marginTop: "4px",
              }}
            >
              {createdAt}
            </span>
          </div>

          <p
            style={{
              color: theme.colors.textcolor,
              fontSize: "14px",
              lineHeight: 1.6,
              marginBottom: "20px",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flex: 1,
            }}
          >
            {description}
          </p>
          {/* 
          <div
            style={{
              background: theme.colors.background,
              borderRadius: theme.radius.medium,
              padding: theme.spacing.medium,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: theme.spacing.small,
                marginBottom: theme.spacing.small,
              }}
            >
              <button
                onClick={handlePlay}
                style={{
                  background: theme.colors.primary,
                  color: "#fff",
                  border: "none",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  // e.currentTarget.style.transform = "scale(1.05)";
                  // e.currentTarget.style.background = "#e55a00";
                }}
                onMouseLeave={(e) => {
                  // e.currentTarget.style.transform = "scale(1)";
                  // e.currentTarget.style.background = theme.colors.primary;
                }}
              >
                {isPlaying ? (
                  <FaPause size={16} color='#fff' />
                ) : (
                  <FaPlay size={16} color='#fff' />
                )}
              </button>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{ fontSize: "12px", color: theme.colors.textcolor }}
                  >
                    {formatTime(currentTime)}
                  </span>
                  <span
                    style={{ fontSize: "12px", color: theme.colors.textcolor }}
                  >
                    {duration ? formatTime(duration) : "0:00"}
                  </span>
                </div>

                <div
                  onClick={handleProgressClick}
                  style={{
                    height: "4px",
                    background: theme.colors.accent,
                    borderRadius: "2px",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      background: theme.colors.primary,
                      borderRadius: "2px",
                      transition: "width 0.1s linear",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: `${progress}%`,
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "12px",
                      height: "12px",
                      background: theme.colors.primary,
                      borderRadius: "50%",
                      opacity: progress > 0 ? 1 : 0,
                      transition: "opacity 0.2s ease",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: theme.spacing.small,
                fontSize: "12px",
                color: theme.colors.textcolor,
              }}
            >
              <span>🎵 Audio</span>
            </div>
          </div> */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "auto",
              paddingTop: "16px",
              borderTop: `1px solid ${theme.colors.background}`,
            }}
          >
            {category && (
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: theme.colors.primary,
                  background: theme.colors.accent,
                  padding: "4px 12px",
                  borderRadius: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {category}
              </span>
            )}
            
            <div 
              style={{ 
                marginLeft: "auto", 
                display: "flex", 
                alignItems: "center",
                color: isHovered ? theme.colors.primary : theme.colors.textcolor,
                fontSize: "13px",
                fontWeight: 500,
                transition: "color 0.2s ease",
              }}
            >
              <span>Listen Now</span>
              <svg 
                style={{ 
                  marginLeft: "4px",
                  transform: isHovered ? "translateX(4px)" : "none",
                  transition: "transform 0.2s ease"
                }} 
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
