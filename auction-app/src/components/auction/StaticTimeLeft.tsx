import { Clock } from 'lucide-react';

interface StaticTimeLeftProps {
  endTime: Date;
  className?: string;
}

export default function StaticTimeLeft({ endTime, className = '' }: StaticTimeLeftProps) {
  const timeDiff = Math.max(0, endTime.getTime() - new Date('2024-01-15T10:00:00Z').getTime());
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  let timeLeft = '';
  if (days > 0) {
    timeLeft = `${days} วัน ${hours} ชั่วโมง`;
  } else if (hours > 0) {
    timeLeft = `${hours} ชั่วโมง ${minutes} นาที`;
  } else {
    timeLeft = `${minutes} นาที`;
  }

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <Clock className="h-4 w-4" />
      <span className="text-sm font-medium">{timeLeft}</span>
    </div>
  );
}
