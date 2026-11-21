import { useState } from 'react';
import ShoePlaceholder from './ShoePlaceholder.jsx';

// Shows a product photo and falls back to the labelled placeholder if the file is missing or fails
// to load, so a bad path never leaves a broken-image icon or collapses the layout.
export default function ProductImage({ product, className = '', placeholderClassName = '', alt }) {
  const [failed, setFailed] = useState(false);

  if (!product.image || failed) {
    return <ShoePlaceholder label={`${product.name} · PHOTO PLACEHOLDER`} tone={product.tone || 'stone'} className={placeholderClassName} />;
  }
  return (
    <img
      className={className}
      src={product.image}
      alt={alt ?? `${product.name} sneaker`}
      loading="lazy"
      decoding="async"
      style={{ objectPosition: product.position || '50% 50%' }}
      onError={() => setFailed(true)}
    />
  );
}
