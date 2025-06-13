export interface Site {
  id: string;
  title: string;
  url: string;
  description: string;
  icon: string;
  screenshot?: string;
  groupId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  tags: string[];
  clickCount: number;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

export interface User {
  id: string;
  username: string;
  passwordHash?: string;
  email: string;
  createdAt: string;
  lastLogin: string;
  role: 'admin' | 'editor';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 