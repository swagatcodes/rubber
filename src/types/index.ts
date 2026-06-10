export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: "ADMIN" | "MODERATOR" | "USER";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  image: string | null;
  category: string | null;
  userId: string;
  featured: boolean;
  published: boolean;
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  total: number;
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Profile {
  id: string;
  userId: string;
  bio: string | null;
  phone: string | null;
  companyName: string | null;
  location: string | null;
  website: string | null;
  dateOfBirth: Date | null;
  profileImage: string | null;
  coverImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}
