import * as React from "react";

interface TechIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number | string;
}

export function TechIcon({ name, size = 32, className = "", ...props }: TechIconProps) {
  const normalizedName = name ? String(name).toLowerCase().trim() : "";

  switch (normalizedName) {
    case "c":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="#00599C" opacity="0.25"/>
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#659AD2" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M14.5 9.5a3.5 3.5 0 100 5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      );
    case "c++":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="#00599C" opacity="0.3"/>
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#00599C" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M10.5 9.5a3 3 0 100 5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M13 12h2.5M14.25 10.75v2.5M16.5 12h2.5M17.75 10.75v2.5" stroke="#659AD2" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      );
    case "python":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <path fill="#3776AB" d="M11.876 2c-4.335 0-4.062 1.884-4.062 1.884l.01 1.952h4.123v.586H6.182s-2.735.312-2.735 3.965c0 3.653 2.383 3.524 2.383 3.524h1.424v-2.012s-.077-2.383 2.345-2.383h4.025s2.268.038 2.268-2.23V4.288s.356-2.288-4.016-2.288zm-2.23 1.25a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z"/>
          <path fill="#FFD43B" d="M12.124 22c4.335 0 4.062-1.884 4.062-1.884l-.01-1.952h-4.123v-.586h5.765s2.735-.312 2.735-3.965c0-3.653-2.383-3.524-2.383-3.524h-1.424v2.012s.077 2.383-2.345 2.383h-4.025s-2.268-.038-2.268 2.23v3.003s-.356 2.288 4.016 2.288zm2.23-1.25a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z"/>
        </svg>
      );
    case "javascript":
    case "js":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#F7DF1E"/>
          <path fill="#000000" d="M12.77 15.68c.25.43.52.82.99 1.13.48.3 1.04.49 1.68.49 1.34 0 2.1-.64 2.1-1.62 0-1.12-.76-1.57-2.07-2.14l-.72-.31c-2.09-.89-3.47-2.01-3.47-4.36 0-2.18 1.64-3.83 4.29-3.83 1.88 0 3.1.66 4.04 2.21l-2.01 1.29c-.43-.76-.99-1.07-1.96-1.07-.84 0-1.44.47-1.44 1.15 0 .84.55 1.2 1.76 1.72l.72.31c2.47 1.05 3.84 2.16 3.84 4.54 0 2.59-1.99 4.14-4.88 4.14-2.73 0-4.34-1.2-5.18-2.78l2.3-1.27zM5.56 15.82c.38.67.82 1.16 1.54 1.48.71.32 1.5.47 2.28.47 1.43 0 2.45-.63 2.45-2.65V4.99h2.95v10.22c0 3.52-2.04 4.96-5.18 4.96-2.5 0-4.22-.97-5.18-2.8l1.14-1.55z"/>
        </svg>
      );
    case "typescript":
    case "ts":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <rect width="24" height="24" rx="4" fill="#3178C6"/>
          <path fill="#FFFFFF" d="M11.96 15.68c.25.43.52.82.99 1.13.48.3 1.04.49 1.68.49 1.34 0 2.1-.64 2.1-1.62 0-1.12-.76-1.57-2.07-2.14l-.72-.31c-2.09-.89-3.47-2.01-3.47-4.36 0-2.18 1.64-3.83 4.29-3.83 1.88 0 3.1.66 4.04 2.21l-2.01 1.29c-.43-.76-.99-1.07-1.96-1.07-.84 0-1.44.47-1.44 1.15 0 .84.55 1.2 1.76 1.72l.72.31c2.47 1.05 3.84 2.16 3.84 4.54 0 2.59-1.99 4.14-4.88 4.14-2.73 0-4.34-1.2-5.18-2.78l2.3-1.27zM2.8 7.37h7.24V9.8H6.55v9.37H3.6V9.8H2.8V7.37z"/>
        </svg>
      );
    case "sql":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#00758F" strokeWidth="2"/>
          <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" stroke="#00758F" strokeWidth="2"/>
          <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" stroke="#00758F" strokeWidth="2"/>
        </svg>
      );
    case "html5":
    case "html":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <path fill="#E34F26" d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718h10.059l.23-2.625H5.664l.69 7.968h8.046l-.34 3.735-2.086.562-2.087-.562-.132-1.468H7.135l.261 3.235 4.57 1.265 4.572-1.265.617-6.843H8.531z"/>
        </svg>
      );
    case "css3":
    case "css":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <path fill="#1572B6" d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718h10.059l.23-2.625H5.664l.69 7.968h8.046l-.34 3.735-2.086.562-2.087-.562-.132-1.468H7.135l.261 3.235 4.57 1.265 4.572-1.265.617-6.843H8.531z"/>
        </svg>
      );
    case "react":
    case "react.js":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/>
          <g stroke="#61DAFB" strokeWidth="1.5">
            <ellipse cx="12" cy="12" rx="9.5" ry="3.8"/>
            <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)"/>
            <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)"/>
          </g>
        </svg>
      );
    case "next.js":
    case "nextjs":
    case "next":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <circle cx="12" cy="12" r="11" fill="#09090b" stroke="#333" strokeWidth="1"/>
          <path fill="url(#nextjs-grad-icon)" d="M18.665 21.978C16.758 23.273 14.466 24 12 24 5.373 24 0 18.627 0 12S5.373 0 12 0c6.627 0 12 5.373 12 12 0 3.584-1.574 6.801-4.07 9.001l-10.37-13.43v9.858h1.89v-6.953l8.835 11.472zM15.42 7.429h1.89v5.67h-1.89v-5.67z"/>
          <defs>
            <linearGradient id="nextjs-grad-icon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#A1A1AA" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "tailwind css":
    case "tailwindcss":
    case "tailwind":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <path fill="#06B6D4" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      );
    case "node.js":
    case "nodejs":
    case "node":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <path fill="#5FA04E" d="M12 2L2.5 7.5v11L12 24l9.5-5.5v-11L12 2zm7.5 15.5L12 22l-7.5-4.5V8.5L12 4l7.5 4.5v9z"/>
          <path fill="#5FA04E" d="M12 7a4 4 0 00-4 4v2a4 4 0 008 0v-2a4 4 0 00-4-4zm2 6a2 2 0 01-4 0v-2a2 2 0 014 0v2z"/>
        </svg>
      );
    case "express.js":
    case "express":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="1"/>
          <text x="12" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif">ex</text>
        </svg>
      );
    case "mongodb":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <path fill="#47A248" d="M12 1.5s-6 6.75-6 13.5A6 6 0 0012 21a6 6 0 006-6c0-6.75-6-13.5-6-13.5zm0 18a4.5 4.5 0 01-4.5-4.5C7.5 9.75 12 4.5 12 4.5s4.5 5.25 4.5 10.5A4.5 4.5 0 0112 19.5z"/>
          <path fill="#47A248" d="M11.25 3v17.25h1.5V3h-1.5z"/>
        </svg>
      );
    case "postgresql":
    case "postgres":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <path fill="#336791" d="M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zm4.2 6.8c-.2 1.2-1.1 3-3.2 4.5 1.5 2.1 2.8 3.5 3 3.7l-1.4 1.1c-.3-.4-1.6-1.8-3.1-3.9-1.1.7-2.2 1.1-3.2 1.1-2.2 0-3.5-1.5-3.5-3.4 0-2.5 2.2-4.9 5.8-5.3.6-.1 1.2-.1 1.7-.1v-.3c0-.9-.6-1.5-1.8-1.5-1 0-2.1.4-2.8.9l-.9-1.4c1.1-.8 2.6-1.3 4.1-1.3 2.5 0 3.8 1.4 3.8 3.4v1.5z"/>
        </svg>
      );
    case "mysql":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <path fill="#00758F" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11.5c-1.2 1.5-3.2 2.5-5.5 2.5-3.3 0-6-2-6-5.5S8.2 5 11.5 5c2.3 0 4.3 1 5.5 2.5l-1.8 1.5c-.8-1-2.1-1.6-3.7-1.6-2.2 0-3.8 1.3-3.8 3.1s1.6 3.1 3.8 3.1c1.6 0 2.9-.6 3.7-1.6L17 13.5z"/>
          <path fill="#F29111" d="M19 9h2v6h-2z"/>
        </svg>
      );
    case "git":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <path fill="#F05032" d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.44.516.515.655 1.258.428 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.398-.316.633-.404V8.814c-.235-.088-.451-.224-.633-.404-.531-.533-.662-1.306-.402-1.96L7.546 3.676 1.455 9.767c-.604.605-.604 1.582 0 2.188l10.479 10.478c.604.604 1.582.604 2.188 0l10.424-10.424c.603-.604.603-1.582 0-2.188z"/>
        </svg>
      );
    case "github":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <path fill="#FFFFFF" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
      );
    case "docker":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <path fill="#2496ED" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.888c0 .102.083.185.185.185zm-2.954-5.43h2.118a.185.185 0 00.186-.186V3.574a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .103.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .103.083.186.185.186zm-2.954 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.145a.185.185 0 00-.185.185v1.887c0 .103.083.186.185.186zm5.884 2.714h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.888c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.186v1.888c0 .102.083.185.185.185zm-2.954 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.145a.185.185 0 00-.185.186v1.888c0 .102.083.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.888c0 .102.084.185.186.185zm-2.955 0h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H2.19a.186.186 0 00-.186.186v1.888c0 .102.083.185.186.185zm23.633-1.636a4.437 4.437 0 00-1.428-1.22c-.642-.366-1.428-.517-2.186-.427l-.23.031c-.349.046-.689.143-1.01.288l-.208.096a.2.2 0 00-.096.26l.288.618a.202.202 0 00.26.095l.192-.09c.27-.123.558-.205.852-.244l.277-.037c.563-.07 1.144.04 1.62.31.427.243.766.602.973 1.042l.092.195a.2.2 0 00.267.086l.623-.288a.202.202 0 00.086-.267l-.092-.195zm.082 3.655c-.23.197-.487.367-.76.505-.595.302-1.27.467-1.956.478l-.348.005a8.77 8.77 0 01-3.23-.6l-.372-.14a.2.2 0 00-.256.096l-.317.604a.2.2 0 00.096.257l.386.145a9.77 9.77 0 003.6.67h.39c.783-.012 1.554-.2 2.233-.545.31-.157.602-.35.864-.575l.178-.153a.2.2 0 00.026-.28l-.452-.516a.2.2 0 00-.282-.026l-.177.153z"/>
        </svg>
      );
    case "postman":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <path fill="#FF6C37" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 13.5l-2-.8-1.5 1.5-1.5-1.5-2 .8 1.2-2.5L9.5 10.5h5l-1.2 2.5 1.7 2.5z"/>
        </svg>
      );
    case "linux":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <path fill="#FCC624" d="M12.001 2c-2.484 0-4.5 2.016-4.5 4.5v3c0 2.484 2.016 4.5 4.5 4.5s4.5-2.016 4.5-4.5v-3c0-2.484-2.016-4.5-4.5-4.5zm-2.5 11c-2.209 0-4 1.791-4 4v3h13v-3c0-2.209-1.791-4-4-4h-5z"/>
          <circle cx="10" cy="6.5" r="1" fill="#000"/>
          <circle cx="14" cy="6.5" r="1" fill="#000"/>
          <path d="M11 8.5c.5.5 1.5.5 2 0" stroke="#E95420" strokeWidth="1" strokeLinecap="round"/>
        </svg>
      );
    case "ubuntu":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <circle cx="12" cy="12" r="10" fill="#E95420"/>
          <circle cx="12" cy="12" r="4.5" fill="none" stroke="#FFF" strokeWidth="2"/>
          <circle cx="12" cy="5.5" r="1.8" fill="#FFF"/>
          <circle cx="6.4" cy="15.2" r="1.8" fill="#FFF"/>
          <circle cx="17.6" cy="15.2" r="1.8" fill="#FFF"/>
        </svg>
      );
    case "vercel":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <path fill="#FFFFFF" d="M12 1L24 22H0L12 1Z"/>
        </svg>
      );
    case "render":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
          <rect width="24" height="24" rx="5" fill="#46E3B7" fillOpacity="0.12"/>
          <path d="M7 17V7h5.5a3.5 3.5 0 010 7H7" stroke="#46E3B7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.5 14L17 17" stroke="#46E3B7" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      );
    case "firebase":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <path fill="#FFCA28" d="M3.89 15.672L6.505 2.124a.65.65 0 011.214-.156l2.973 5.612 1.636-3.136a.65.65 0 011.169.043l6.577 11.185L12.72 21.82a1.3 1.3 0 01-1.44 0L3.89 15.672z"/>
          <path fill="#DD2C00" d="M13.497 4.487a.65.65 0 00-1.169-.043L3.89 15.672l7.39 4.148a1.3 1.3 0 001.44 0l7.363-4.148-6.586-11.185z" opacity="0.3"/>
          <path fill="#FF9100" d="M3.89 15.672L11.28 19.82a1.3 1.3 0 001.44 0l.777-.436L6.505 2.124a.65.65 0 00-1.214.156L3.89 15.672z"/>
        </svg>
      );
    case "mongodb atlas":
    case "atlas":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
          <circle cx="12" cy="12" r="10" fill="#00ED64" fillOpacity="0.12" stroke="#00ED64" strokeWidth="1.5"/>
          <path fill="#00ED64" d="M12 4s-4 4.5-4 9a4 4 0 008 0c0-4.5-4-9-4-9zm0 10.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} {...props}>
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 8v8M8 12h8"/>
        </svg>
      );
  }
}
