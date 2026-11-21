# VEYRA Homepage — Outcome Checklist

## 1. Premium navigation and responsive controls — Complete
- Create a premium navigation bar containing the VEYRA logo; Home, Men, Women, New Arrivals, Best Sellers, and Collections; Search, Wishlist, and Shopping Bag icons.
- Keep navigation sticky, with smooth hover animations, elegant typography, clean spacing, responsive mobile navigation, and a shopping-bag item counter.

## 2. Animated featured-shoe hero and product details — Complete
- Display one featured sneaker in a large size at the center of the homepage as the main visual focus.
- Add a smooth continuous rotating animation to the shoe presentation, subtle 3D-inspired floating, clockwise and anticlockwise rotation support, a slight hover zoom, and pause rotation when the user hovers over the shoe. Animate only the product presentation; do not apply a flat CSS rotation to the entire homepage.
- Use a clearly labelled replaceable product-image placeholder initially; use transparent-background product images where technically possible. Actual shoe photographs will be added later.
- Display product name VEYRA MOTION X, category Premium Sneakers, price NPR 5,299, BEST SELLER label, short product description, available colours, View Product button, and Add to Cart button.

## 3. Interactive and replaceable shoe-colour selection — Complete
- Provide White, Black, Beige, and Grey colour options below the featured shoe.
- When a user selects a colour, change the displayed shoe image to that selected colour's image, highlight the selected colour, smoothly transition between product images, and update selected-colour information.
- Use separate replaceable image placeholders for each colour. If alternative images have not been added yet, use clearly labelled placeholders rather than pretending the same image is a different colour.

## 4. New Arrivals product section — Complete
- Add a modern product grid with product images, product names, prices, and product badges. Product photography slots are explicitly labelled for replacement.

## 5. Best Sellers and Quick View — Complete
- Highlight popular sneakers with attractive product cards, hover image transitions, and a Quick View option.

## 6. Shop by Category — Complete
- Add categories for Men's Collection, Women's Collection, Running Shoes, and Lifestyle Sneakers, using replaceable editorial image paths.

## 7. Promotional campaign — Complete
- Add a large visual promotional banner with attractive typography and a Shop Now button, using a replaceable campaign-image path.

## 8. Customer reviews — Complete
- Add customer review cards with star ratings and customer feedback.

## 9. Footer and brand/support links — Complete
- Add About VEYRA, Customer Support, Contact, Social Media, Privacy Policy, and Terms and Conditions.

## 10. Motion, atmosphere, accessibility, and responsive layout — Complete
- Use Framer Motion for smooth page entrance animations, floating sneaker, product image transitions, smooth colour transitions, animated buttons, scroll-based reveal animations, product-card hover effects, animated promotional text, and smooth section transitions.
- Make the experience premium and polished. Avoid excessive animation, flashing colours, and distracting effects. Respect reduced-motion accessibility preferences.
- Use subtle gradient transitions, subtle background-colour changes, soft shadows, light/dark contrast, and elegant visual transitions between sections. The background must complement rather than overpower the shoe.
- Ensure the entire website works on desktop, laptop, tablet, and mobile; adapt the shoe presentation, navigation, product cards, and animations to smaller screens.

## 11. Frontend-only scope and beginner-friendly structure — Complete
- Use React.js, Vite, JavaScript, Tailwind CSS, Framer Motion, and Lucide React. Keep code clean, reusable, responsive, and beginner-friendly.
- Build the homepage with separate reusable React components, keep code organised, add comments explaining important code, and do not put the entire application in one giant component.
- Inspect the existing project structure; do not overwrite or delete existing files unnecessarily; ensure the application runs without errors and avoid unnecessary dependencies.
- Focus only on the frontend homepage and visual experience. Do not implement backend development, database integration, authentication, or payment integration.
- Keep product images easy to replace. At completion explain the components, animation files, how to replace shoe images, how to change product colours, and how to run locally.
- The finished homepage should look like a premium international sneaker brand's official website, not a basic beginner shopping website.

## 12. Rotating promotional announcement bar — Complete
- Add a beautiful announcement bar above the navigation.
- Display messages such as “MEGA SALE — UP TO 40% OFF”, “FREE SHIPPING ON ORDERS ABOVE NPR 5,000”, and “USE CODE VEYRA10 FOR 10% OFF”.
- Allow multiple messages to rotate smoothly.

## 13. Scrolling promotional marquee — Complete
- Add an elegant continuously scrolling promotional text section.
- Include sale offers, free shipping, and new arrivals.
- Make it responsive.

## 14. Product discount badges and prices — Complete
- Add NEW, BEST SELLER, SALE, and percentage-discount badges.
- Show original prices with strikethrough and discounted prices.
- Calculate discounts correctly.

## 15. First-visit welcome coupon — Complete
- Create an attractive first-visit welcome popup showing a sample 10% discount coupon.
- Include a copy-coupon button and close button.
- Do not repeatedly interrupt visitors after they dismiss it.

## 16. Persistent limited-time sale countdown — Complete
- Create a functional countdown timer for promotional campaigns.
- Do not reset it on every page refresh.

## 17. Shopping and coupon toast notifications — Complete
- Show elegant notifications when a product is added to cart or wishlist.
- Show coupon-applied and coupon-copied messages.
- Include subtle animations.

## 18. Promotional campaign section — Complete
- Add an attractive sale banner with a Shop Now button.
- Make the button navigate to the relevant product collection.

## 19. Theme, sample-offer, and integration constraints — Complete
- Maintain VEYRA branding, a dark premium theme, orange accents, existing typography, and animations.
- Use sample promotional offers only. Keep them easy to edit later. Do not claim that a real sale, discount, or free-shipping offer is active unless configured.
- Use Framer Motion for smooth animations if it is already installed; make every feature responsive on mobile, tablet, and desktop; avoid excessive popups and distracting animations; and use reusable React components.
- Do not rebuild the website from scratch, remove or damage existing functionality, or replace the existing component architecture. After implementation, explain which files were created or modified and how to change promotional text, discount percentage, and coupon code.
