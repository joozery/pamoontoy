export const formatTimeLeft = (endTime: Date) => {
  const timeLeft = Math.max(0, endTime.getTime() - Date.now());
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days} วัน ${hours} ชั่วโมง`;
  if (hours > 0) return `${hours} ชั่วโมง ${minutes} นาที`;
  return `${minutes} นาที`;
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
  }).format(price);
};

export const getAuctionStatus = (auction: { endTime: Date; isActive: boolean }) => {
  if (!auction.isActive) return 'ended';
  const timeLeft = auction.endTime.getTime() - Date.now();
  if (timeLeft <= 0) return 'ended';
  return 'active';
};
