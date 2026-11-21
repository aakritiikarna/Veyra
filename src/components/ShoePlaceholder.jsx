export function ShoeOutline({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 720 420" fill="none" aria-hidden="true">
      <ellipse cx="364" cy="346" rx="256" ry="24" fill="#111111" fillOpacity=".10" />
      <path d="M128 265c41-8 83-26 121-49l70-75c12-13 33-11 42 4l30 49c14 22 34 37 58 45l124 42c26 9 42 31 42 58v15H128c-22 0-39-17-39-39 0-25 15-45 39-50Z" fill="#DAD6CF" stroke="#242321" strokeWidth="5" strokeLinejoin="round" />
      <path d="m310 146 36 8 43 74m-141-12 72 8m-28-38 62 10m-100 60c67 12 126 15 187 10m-257 33h357" stroke="#77736D" strokeWidth="5" strokeLinecap="round" />
      <path d="M185 308c78 8 215 8 312 0m-344 29h421" stroke="#242321" strokeWidth="5" strokeLinecap="round" />
      <path d="M125 264c23 0 44-5 64-12" stroke="#B9A58B" strokeWidth="9" strokeLinecap="round" />
      <circle cx="580" cy="259" r="10" fill="#B9A58B" />
    </svg>
  );
}

export default function ShoePlaceholder({ label = 'PRODUCT IMAGE PLACEHOLDER', tone = 'stone', className = '' }) {
  return (
    <div className={`shoe-placeholder shoe-placeholder--${tone} ${className}`} aria-label={`${label}. Replace this illustration with a product photograph.`}>
      <span className="photo-slot-label rounded-full bg-veyra-paper/85 px-2 py-1">{label}</span>
      <ShoeOutline className="shoe-placeholder__art" />
      <span className="photo-slot-note">Illustrative guide · replace with your cutout photo</span>
    </div>
  );
}
