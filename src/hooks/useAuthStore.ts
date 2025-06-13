import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    username: string;
    role: string;
  } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      isAuthenticated: false,
      user: null,
      
      login: async (username: string, password: string) => {
        try {
          // 在实际应用中，这里应该调用API进行认证
          // 这里为了演示，我们使用模拟数据
          if (username === 'admin' && password === 'password') {
            const mockToken = 'mock-jwt-token-' + Date.now();
            const mockUser = {
              username: 'admin',
              role: 'admin',
            };
            
            set({
              token: mockToken,
              isAuthenticated: true,
              user: mockUser,
            });
            
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login failed:', error);
          return false;
        }
      },
      
      logout: () => {
        set({
          token: null,
          isAuthenticated: false,
          user: null,
        });
      },
      
      checkAuth: async () => {
        const { token, isAuthenticated } = get();
        
        if (!token) {
          return false;
        }
        
        // 在实际应用中，这里应该验证token的有效性
        // 这里为了演示，我们假设token有效
        return isAuthenticated;
      },
    }),
    {
      name: 'auth-storage',
      // 只持久化token和user信息
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
); 