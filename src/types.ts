export interface AffiliateLink {
  id: string;
  name: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  conversions: number;
  revenue: number;
  createdAt: string;
  campaignId?: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  commission: number;
  price: number;
  category: string;
  imageUrl: string;
}

export interface DailyStat {
  date: string;
  clicks: number;
  conversions: number;
  revenue: number;
}
