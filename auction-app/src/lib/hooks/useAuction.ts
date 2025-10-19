'use client';

import { useState, useEffect } from 'react';
import { AuctionItem, Bid } from '@/lib/types';

export const useAuction = () => {
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for development - using current time for real-time countdown
    const now = new Date();
    const mockAuctions: AuctionItem[] = [
      {
        id: '1',
        title: 'iPhone 15 Pro Max',
        description: 'Brand new iPhone 15 Pro Max 256GB in Space Black',
        startingPrice: 50000,
        currentPrice: 55000,
        imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
        category: 'Electronics',
        seller: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          createdAt: new Date('2024-01-01')
        },
        endTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000 + 32 * 60 * 1000 + 19 * 1000), // 2 days 11 hours 32 minutes 19 seconds
        bids: [
          {
            id: '1',
            amount: 55000,
            bidder: {
              id: '2',
              name: 'Jane Smith',
              email: 'jane@example.com',
              createdAt: new Date('2024-01-01')
            },
            timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
            auctionItemId: '1'
          }
        ],
        isActive: true,
        createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Vintage Rolex Watch',
        description: 'Classic Rolex Submariner from 1980s, excellent condition',
        startingPrice: 200000,
        currentPrice: 250000,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        category: 'Jewelry',
        seller: {
          id: '2',
          name: 'Mike Johnson',
          email: 'mike@example.com',
          createdAt: new Date('2024-01-01'),
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
        },
        endTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000 + 15 * 60 * 1000 + 30 * 1000), // 5 days 8 hours 15 minutes 30 seconds
        bids: [
          {
            id: '2',
            amount: 250000,
            bidder: {
              id: '3',
              name: 'Sarah Wilson',
              email: 'sarah@example.com',
              createdAt: new Date('2024-01-01')
            },
            timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000),
            auctionItemId: '2'
          }
        ],
        isActive: true,
        createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000)
      },
      {
        id: '3',
        title: 'หนังสือ Comic X-Men 9 เล่ม',
        description: 'หนังสือ Comic X men 9 เล่ม สวยๆคมๆ สภาพมือ1',
        startingPrice: 1000,
        currentPrice: 1000,
        imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500',
        category: 'Books',
        seller: {
          id: '3',
          name: 'Comic Collector',
          email: 'comic@example.com',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
          createdAt: new Date('2024-01-01')
        },
        endTime: new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 28 * 60 * 1000 + 6 * 1000), // 12 days 14 hours 28 minutes 6 seconds
        bids: [],
        isActive: true,
        createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000)
      },
      {
        id: '4',
        title: 'Lightsaber Kylo Ren',
        description: '(สินค้าฝากประมูล) lightsaber kylo ren มีเสียงตอ',
        startingPrice: 50,
        currentPrice: 50,
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
        category: 'Toys',
        seller: {
          id: '4',
          name: 'Star Wars Fan',
          email: 'starwars@example.com',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
          createdAt: new Date('2024-01-01')
        },
        endTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000 + 33 * 60 * 1000 + 50 * 1000), // 2 days 11 hours 33 minutes 50 seconds
        bids: [],
        isActive: true,
        createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000)
      }
    ];

    setTimeout(() => {
      setAuctions(mockAuctions);
      setLoading(false);
    }, 1000);
  }, []);

  const placeBid = (auctionId: string, amount: number, bidder: { id: string; name: string; email: string; createdAt: Date }) => {
    setAuctions(prev => prev.map(auction => {
      if (auction.id === auctionId) {
        const newBid: Bid = {
          id: `bid-${Math.random().toString(36).substr(2, 9)}`,
          amount,
          bidder,
          timestamp: new Date(),
          auctionItemId: auctionId
        };
        return {
          ...auction,
          currentPrice: amount,
          bids: [...auction.bids, newBid]
        };
      }
      return auction;
    }));
  };

  const createAuction = (auctionData: Omit<AuctionItem, 'id' | 'bids' | 'createdAt'>) => {
    const newAuction: AuctionItem = {
      ...auctionData,
      id: `auction-${Math.random().toString(36).substr(2, 9)}`,
      bids: [],
      createdAt: new Date()
    };
    setAuctions(prev => [newAuction, ...prev]);
  };

  return {
    auctions,
    loading,
    placeBid,
    createAuction
  };
};
