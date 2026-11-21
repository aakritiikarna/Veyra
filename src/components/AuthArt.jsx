import { motion, useReducedMotion } from 'framer-motion';

// Pen-sketch footwear collage for the account pages. The drawings are line-art versions of the photos in
// public/images/auth (generated from the supplied footwear photos). Swap the files to change the artwork.
const SKETCHES = [
  { id: 'boot', src: '/images/auth/sk-boot.png', className: 'sk sk--boot', alt: 'Pen sketch of an ankle boot' },
  { id: 'heels', src: '/images/auth/sk-heels.png', className: 'sk sk--heels', alt: 'Pen sketch of ankle-strap heels' },
  { id: 'sneaker', src: '/images/auth/sk-sneaker.png', className: 'sk sk--sneaker', alt: 'Pen sketch of a pair of low-top sneakers' },
  { id: 'sandal', src: '/images/auth/sk-sandal.png', className: 'sk sk--sandal', alt: 'Pen sketch of buckled sandals' },
  { id: 'ballet', src: '/images/auth/sk-ballet.png', className: 'sk sk--ballet', alt: 'Pen sketch of ballet flats' },
];

export default function AuthArt() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="auth-art__stage" aria-hidden={false}>
      {/* Hand-drawn orange pen scribbles */}
      <svg className="auth-art__scribble" viewBox="0 0 400 400" fill="none" stroke="#f06c2a" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
        <path d="M205 30c92-4 168 62 170 150 2 92-74 176-176 180C108 364 26 296 26 196 26 104 100 40 196 34" />
        <path d="M232 46c78 14 130 74 128 144-2 78-62 148-148 160" opacity=".5" />
        <path d="M18 372c40-10 74 6 112-4" opacity=".7" />
        <path d="M312 22l12 22M326 18l-10 26M334 36l-24-6" strokeWidth="2" />
      </svg>
      {SKETCHES.map((sketch, index) => (
        // The wrapper carries position + tilt (CSS); the image inside carries the entrance animation.
        <div key={sketch.id} className={sketch.className}>
          <motion.img
            src={sketch.src}
            alt={sketch.alt}
            draggable="false"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      ))}
    </div>
  );
}
