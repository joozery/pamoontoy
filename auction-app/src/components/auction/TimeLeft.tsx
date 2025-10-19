'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import NoSSR from '../NoSSR';

interface TimeLeftProps {
  endTime: Date;
  className?: string;
}

export default function TimeLeft({ endTime, className = '' }: TimeLeftProps) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = Date.now();
      const timeDiff = Math.max(0, endTime.getTime() - now);
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days} วัน ${hours} ชั่วโมง`);
      } else if (hours > 0) {
        setTimeLeft(`${hours} ชั่วโมง ${minutes} นาที`);
      } else {
        setTimeLeft(`${minutes} นาที`);
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <NoSSR fallback={
      <div className={`flex items-center space-x-1 ${className}`}>
        <Clock className="h-4 w-4" />
        <span className="text-sm font-medium">กำลังโหลด...</span>
      </div>
    }>
      <div className={`flex items-center space-x-1 ${className}`}>
        <Clock className="h-4 w-4" />
        <span className="text-sm font-medium">{timeLeft}</span>
      </div>
    </NoSSR>
  );
}
