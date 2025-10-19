export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  createdAt: Date;
}

export interface Bid {
  id: string;
  amount: number;
  bidder: User;
  timestamp: Date;
  auctionItemId: string;
}

export interface AuctionItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  startingPrice: number;
  currentPrice: number;
  endTime: Date;
  seller: User;
  category: string;
  bids: Bid[];
  isActive: boolean;
  createdAt: Date;
}
