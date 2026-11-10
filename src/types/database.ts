/**
 * Supabase database types.
 * Generated from the schema in schema.sql.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      qr_codes: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          content: string;
          config: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name?: string;
          content: string;
          config: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          content?: string;
          config?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type QrCode = Database['public']['Tables']['qr_codes']['Row'];
export type QrCodeInsert = Database['public']['Tables']['qr_codes']['Insert'];
export type QrCodeUpdate = Database['public']['Tables']['qr_codes']['Update'];

export interface QrCodeConfig {
  foreground?: string;
  background?: string;
  dotStyle?: string;
  logoUrl?: string | null;
  caption?: string | null;
  [key: string]: Json | undefined;
}
