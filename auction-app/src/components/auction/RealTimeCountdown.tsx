'use client';

import { useState, useEffect } from 'react';

interface RealTimeCountdownProps {
  endTime: Date;
  className?: string;
}

export default function RealTimeCountdown({ endTime, className = '' }: RealTimeCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = endTime.getTime();
      const difference = end - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Days */}
      <div className="flex items-center space-x-1">
        <span className="text-lg font-bold text-gray-900">
          {timeLeft.days.toString().padStart(2, '0')}
        </span>
        <span className="text-sm text-gray-500">วัน</span>
      </div>
      
      {/* Separator */}
      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
      
      {/* Hours */}
      <div className="flex items-center space-x-1">
        <span className="text-lg font-bold text-gray-900">
          {timeLeft.hours.toString().padStart(2, '0')}
        </span>
        <span className="text-sm text-gray-500">ชั่วโมง</span>
      </div>
      
      {/* Separator */}
      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
      
      {/* Minutes */}
      <div className="flex items-center space-x-1">
        <span className="text-lg font-bold text-gray-900">
          {timeLeft.minutes.toString().padStart(2, '0')}
        </span>
        <span className="text-sm text-gray-500">นาที</span>
      </div>
      
      {/* Separator */}
      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
      
      {/* Seconds */}
      <div className="flex items-center space-x-1">
        <span className="text-lg font-bold text-gray-900">
          {timeLeft.seconds.toString().padStart(2, '0')}
        </span>
        <span className="text-sm text-gray-500">วินาที</span>
      </div>
    </div>
  );
}
