import React from "react";
import { theme } from "../../../core/theme.js";
// import { FaPlay, FaPause } from "react-icons/fa";
import { imageUrl } from "../../../core/config.ts";

type PodcastCardProps = {
  image: string | null;
  title: string | null;
  description: string | null;
  createdAt: string | null;
  audioSrc: string | null;
};

const PodcastCard: React.FC<PodcastCardProps> = ({
  image,
  title,
  description,
  createdAt,
}) => {
  return (
    <div
      style={{
        background: theme.colors.surface,
        borderRadius: theme.radius.large,
        width: "350px",
        fontFamily: theme.typography.fontFamily,
        overflow: "hidden",
        border: `1px solid ${theme.colors.accent}`,
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={imageUrl + image!}
          alt={title!}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            // borderRadius: theme.radius.medium,
          }}
        />
      </div>

      <div style={{ padding: theme.spacing.medium }}>
        <div style={{ marginTop: theme.spacing.medium }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: theme.spacing.small,
            }}
          >
            <h3
              style={{
                color: theme.colors.secondary,
                fontSize: theme.typography.fontSizes.medium,

                fontWeight: theme.typography.headings.fontWeight,
                margin: 0,
                flex: 1,
              }}
            >
              {title}
            </h3>
            <span
              style={{
                color: theme.colors.primary,
                fontSize: theme.typography.fontSizes.xsmalle,
                fontWeight: 600,
                backgroundColor: theme.colors.accent,
                padding: "4px 10px",
                borderRadius: theme.radius.small,
                marginLeft: theme.spacing.small,
              }}
            >
              {createdAt}
            </span>
          </div>

          <p
            style={{
              color: theme.colors.textcolor,
              fontSize: theme.typography.fontSizes.small,
              lineHeight: "1.6",
              marginBottom: theme.spacing.medium,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
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
              gap: theme.spacing.small,
              marginTop: theme.spacing.medium,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: theme.typography.fontSizes.small,
                color: theme.colors.primary,
                background: theme.colors.accent,
                padding: "2px 8px",
                borderRadius: theme.radius.small,
              }}
            >
              Technology
            </span>
            <span
              style={{
                fontSize: theme.typography.fontSizes.small,

                color: theme.colors.primary,
                background: theme.colors.accent,
                padding: "2px 8px",
                borderRadius: theme.radius.small,
              }}
            >
              Education
            </span>
            <span
              style={{
                fontSize: theme.typography.fontSizes.small,

                color: theme.colors.primary,
                background: theme.colors.accent,
                padding: "2px 8px",
                borderRadius: theme.radius.small,
              }}
            >
              Trending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
