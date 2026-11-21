import { Star } from 'lucide-react';
import { REVIEWS_ARE_DEMO, reviews } from '../data/catalog.js';
import Reveal from './Reveal.jsx';

const formatDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function ReviewSection() {
  return (
    <section className="review-section page-shell" id="reviews">
      <Reveal className="review-heading">
        <div><p className="section-index">09 <span>/</span> Notes from the everyday</p><h2>Worn. Loved.<br /><em>Made yours.</em></h2></div>
        <p>A few words from the VEYRA community.{REVIEWS_ARE_DEMO && ' These are sample reviews written for the design preview, not verified customer testimonials.'}</p>
      </Reveal>
      <div className="review-grid">
        {reviews.map((review, index) => (
          <Reveal key={review.id} delay={index * 0.09} className="review-card">
            <div className="review-card__top">
              <div className="review-stars" role="img" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} size={17} fill={starIndex < review.rating ? 'currentColor' : 'none'} strokeWidth={starIndex < review.rating ? 0 : 1.5} />)}
              </div>
              {REVIEWS_ARE_DEMO && <span className="review-demo-tag">Sample review</span>}
            </div>
            <p className="review-quote">“{review.quote}”</p>
            <p className="review-product">{review.product} · <time dateTime={review.date}>{formatDate(review.date)}</time></p>
            <div className="review-author"><span className="review-avatar">{review.name.charAt(0)}</span><span><strong>{review.name}</strong><small>{review.location}</small></span></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
