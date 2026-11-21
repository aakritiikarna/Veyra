import { useEffect, useState } from 'react';
import { Clock3 } from 'lucide-react';

const pad = (value) => String(value).padStart(2, '0');

// Counts down to the REAL end of a campaign (campaign.endsAt in data/promotions.js). Nothing resets on reload.
export default function SaleCountdown({ endsAt }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const total = Math.max(0, Math.floor((new Date(endsAt).getTime() - now) / 1000));
  const units = [
    ['Days', Math.floor(total / 86400)],
    ['Hours', Math.floor((total % 86400) / 3600)],
    ['Minutes', Math.floor((total % 3600) / 60)],
    ['Seconds', total % 60],
  ];

  return (
    <div className="deal-timer" role="timer" aria-label="Time left in this sale">
      <span className="deal-timer__label"><Clock3 size={16} /> Offer ends in</span>
      <div className="deal-timer__units">
        {units.map(([label, value]) => <div key={label}><strong>{pad(value)}</strong><small>{label}</small></div>)}
      </div>
    </div>
  );
}
