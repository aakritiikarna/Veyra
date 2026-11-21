import { ArrowUpRight } from 'lucide-react';
import { categories } from '../data/catalog.js';
import Reveal from './Reveal.jsx';

export default function CategorySection() {
  return (
    <section className="category-section page-shell" id="collections">
      <Reveal className="category-heading">
        <div><p className="section-index">01 <span>/</span> Find your form</p><h2>Move your way.</h2></div>
        <p>Different days, different directions. Find the collection that feels like you.</p>
      </Reveal>
      <div className="category-grid">
        {categories.map((category, index) => (
          <Reveal key={category.id} className={`category-tile category-tile--${category.id}`} delay={index * 0.07}>
            <a
              href={category.href}
              className="category-tile__link"
              style={{ backgroundImage: `linear-gradient(180deg, rgba(17,17,17,.03) 12%, rgba(17,17,17,.62) 100%), url("${category.image}")` }}
              aria-label={`Explore ${category.name}`}
            >
              <span className="category-tile__number">{category.number} / VEYRA</span>
              <span className="category-tile__copy"><span className="category-tile__note">{category.note}</span><span className="category-tile__title">{category.name}</span></span>
              <span className="category-tile__arrow"><ArrowUpRight size={19} strokeWidth={1.5} /></span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
