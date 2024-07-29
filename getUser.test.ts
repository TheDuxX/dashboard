import { db } from "./app/_lib/prisma";
import { getUser } from "./supabase/auth/server";
import { createClient } from "./supabase/server";

// Crie uma interface para os campos mínimos do SupabaseUser
interface MockSupabaseUser {
    id: string;
    email: string;
    app_metadata?: any;
    user_metadata?: any;
    aud?: string;
    created_at?: string;
  }
  
  // Ajuste os testes para usar a nova interface
  
  describe('getUser', () => {
    it('should return user with profile when profile is found', async () => {
      const mockUser: MockSupabaseUser = {
        id: 'user-id',
        email: 'user@example.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };
  
      const mockProfile = {
        username: 'testuser',
        avatar: 'avatar-url',
      };
  
      (createClient().auth.getUser as jest.Mock).mockResolvedValue({ data: { user: mockUser } });
      (db.profiles.findUnique as jest.Mock).mockResolvedValue(mockProfile);
  
      const user = await getUser();
      
      expect(user).toEqual({
        ...mockUser,
        ...mockProfile,
      });
    });
  
    it('should return null when user is not authenticated', async () => {
      (createClient().auth.getUser as jest.Mock).mockResolvedValue({ data: { user: null } });
  
      const user = await getUser();
      
      expect(user).toBeNull();
    });
  
    it('should return null when profile is not found', async () => {
      const mockUser: MockSupabaseUser = {
        id: 'user-id',
        email: 'user@example.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };
  
      (createClient().auth.getUser as jest.Mock).mockResolvedValue({ data: { user: mockUser } });
      (db.profiles.findUnique as jest.Mock).mockResolvedValue(null);
  
      const user = await getUser();
      
      expect(user).toBeNull();
    });
  
    it('should return null when profile fields are null', async () => {
      const mockUser: MockSupabaseUser = {
        id: 'user-id',
        email: 'user@example.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };
  
      const mockProfile = {
        username: null,
        avatar: null,
      };
  
      (createClient().auth.getUser as jest.Mock).mockResolvedValue({ data: { user: mockUser } });
      (db.profiles.findUnique as jest.Mock).mockResolvedValue(mockProfile);
  
      const user = await getUser();
      
      expect(user).toBeNull();
    });
  });
  