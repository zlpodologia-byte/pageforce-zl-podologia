import type { CSSProperties } from "react";

interface IllustrationTwoFiguresProps {
  className?: string;
  style?: CSSProperties;
  paused?: boolean;
}

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function IllustrationTwoFigures({
  className,
  style,
  paused = false,
}: IllustrationTwoFiguresProps) {
  return (
    <div
      aria-hidden="true"
      data-paused={paused ? "true" : "false"}
      className={joinClassNames("hero-figures-root", className)}
      style={style}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 520 640"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <g className="figure figure-1" transform="translate(110,60)">
          <g
            className="head"
            style={{ transformBox: "fill-box", transformOrigin: "50% 78%" }}
          >
            <path
              d="M92 40 C92 16, 58 16, 58 40 C58 60, 70 72, 75 72 L75 82 L85 82 L85 72 C90 72, 102 60, 102 40 Z"
              strokeWidth="1.6"
            />
            <path
              d="M58 38 C60 24, 92 22, 100 34 C98 28, 92 18, 75 18 C62 18, 55 28, 58 38 Z"
              fill="currentColor"
              stroke="none"
            />
            <path d="M67 42 C69 40, 73 40, 75 42" strokeWidth="1.2" />
            <path d="M85 42 C87 40, 91 40, 93 42" strokeWidth="1.2" />
          </g>

          <g className="torso">
            <path
              d="M60 84 C60 96, 55 102, 50 110 L50 190 L130 190 L130 110 C125 102, 120 96, 120 84"
              strokeWidth="1.6"
            />
            <path d="M78 84 L90 96 L102 84" strokeWidth="1.2" />
            <path d="M74 96 L74 190 M106 96 L106 190" strokeWidth="1.4" />
            <path
              d="M74 100 L106 100 L106 190 L74 190 Z"
              fill="currentColor"
              stroke="none"
            />
          </g>

          <g
            className="arm-left"
            style={{ transformBox: "fill-box", transformOrigin: "100% 0%" }}
          >
            <path
              d="M60 96 C50 110, 44 130, 42 160 L42 220 L52 220 L54 160 C58 138, 62 120, 68 108"
              strokeWidth="1.6"
            />
          </g>

          <g
            className="arm-right"
            style={{ transformBox: "fill-box", transformOrigin: "0% 0%" }}
          >
            <path
              d="M120 96 C132 112, 138 130, 138 160 L136 220 L126 220 L126 160 C124 138, 118 120, 112 108"
              strokeWidth="1.6"
            />
          </g>

          <g className="legs">
            <path
              d="M50 190 L50 360 L82 360 L86 220 L94 220 L98 360 L130 360 L130 190 Z"
              fill="currentColor"
              stroke="none"
            />
            <path d="M90 200 L90 350" strokeWidth="1" opacity="0.18" />
            <path
              d="M44 360 L44 378 L88 378 L88 360"
              strokeWidth="1.6"
              fill="none"
            />
            <path
              d="M92 360 L92 378 L136 378 L136 360"
              strokeWidth="1.6"
              fill="none"
            />
          </g>
        </g>

        <g className="figure figure-2" transform="translate(260,84)">
          <g
            className="head"
            style={{ transformBox: "fill-box", transformOrigin: "50% 78%" }}
          >
            <circle cx="80" cy="12" r="10" fill="currentColor" stroke="none" />
            <path
              d="M98 40 C98 16, 62 16, 62 40 C62 60, 74 72, 79 72 L79 82 L89 82 L89 72 C94 72, 104 60, 104 40 Z"
              strokeWidth="1.6"
            />
            <path d="M75 56 C78 58, 82 58, 85 56" strokeWidth="1.2" />
          </g>

          <g
            className="arm-pointing"
            style={{ transformBox: "fill-box", transformOrigin: "0% 100%" }}
          >
            <path
              d="M120 98 C138 88, 154 60, 158 28"
              strokeWidth="1.6"
            />
            <path d="M158 28 L160 14 M154 20 L160 14 L166 18" strokeWidth="1.6" />
          </g>

          <g className="arm-resting">
            <path
              d="M60 96 C52 116, 48 140, 48 170 L50 220 L60 220 L62 170 C64 144, 70 124, 76 112"
              strokeWidth="1.6"
            />
          </g>

          <g className="torso">
            <path d="M62 84 L62 130 L118 130 L118 84" strokeWidth="1.6" />
            <path d="M74 84 C80 94, 100 94, 106 84" strokeWidth="1.2" />
          </g>

          <g className="skirt">
            <path d="M62 130 L36 330 L144 330 L118 130 Z" strokeWidth="1.6" />
            <path d="M54 170 L126 170" strokeWidth="1" />
            <path d="M51 200 L129 200" strokeWidth="1" />
            <path d="M48 230 L132 230" strokeWidth="1" />
            <path d="M45 260 L135 260" strokeWidth="1" />
            <path d="M42 290 L138 290" strokeWidth="1" />
          </g>

          <g className="legs">
            <path d="M62 330 L62 376" strokeWidth="1.6" />
            <path d="M118 330 L118 376" strokeWidth="1.6" />
            <path d="M52 376 L72 376 L72 382 L52 382 Z" strokeWidth="1.6" />
            <path d="M108 376 L128 376 L128 382 L108 382 Z" strokeWidth="1.6" />
          </g>
        </g>

        <line x1="100" y1="462" x2="420" y2="462" strokeWidth="0.8" opacity="0.25" />
        <circle cx="260" cy="488" r="2.4" fill="currentColor" stroke="none" />
      </svg>

      <style jsx>{`
        .hero-figures-root {
          display: block;
          color: inherit;
        }

        .hero-figures-root svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .hero-figures-root .figure-1 .arm-right {
          animation: hero-figure-arm-right-sway 6s ease-in-out infinite;
        }

        .hero-figures-root .figure-2 .arm-pointing {
          animation: hero-figure-arm-point 5s ease-in-out infinite;
        }

        .hero-figures-root .figure-1 .head {
          animation: hero-figure-head-tilt-left 7s ease-in-out infinite;
        }

        .hero-figures-root .figure-2 .head {
          animation: hero-figure-head-tilt-right 7s ease-in-out infinite -2.1s;
        }

        .hero-figures-root[data-paused="true"] .arm-right,
        .hero-figures-root[data-paused="true"] .arm-pointing,
        .hero-figures-root[data-paused="true"] .head {
          animation-play-state: paused;
        }

        @keyframes hero-figure-arm-right-sway {
          0%,
          100% {
            transform: rotate(-3deg);
          }

          50% {
            transform: rotate(3deg);
          }
        }

        @keyframes hero-figure-arm-point {
          0%,
          100% {
            transform: rotate(-2deg);
          }

          50% {
            transform: rotate(2deg);
          }
        }

        @keyframes hero-figure-head-tilt-left {
          0%,
          100% {
            transform: rotate(-2deg);
          }

          50% {
            transform: rotate(2deg);
          }
        }

        @keyframes hero-figure-head-tilt-right {
          0%,
          100% {
            transform: rotate(2deg);
          }

          50% {
            transform: rotate(-2deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-figures-root .arm-right,
          .hero-figures-root .arm-pointing,
          .hero-figures-root .head {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
