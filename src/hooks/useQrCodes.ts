import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import type { QrCode, QrCodeInsert, QrCodeConfig } from '../types/database';
import { toast } from 'sonner';

export function useQrCodes() {
  const [qrCodes, setQrCodes] = useState<QrCode[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchQrCodes = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQrCodes(data || []);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load QR codes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('qr_codes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (mounted) setQrCodes(data || []);
      } catch (error: any) {
        if (mounted) toast.error(error.message || 'Failed to load QR codes.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    // Subscribe to real-time changes for the current user's QR codes
    const channel = supabase
      .channel('qr-codes-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'qr_codes' },
        () => {
          load();
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const saveQrCode = useCallback(
    async (values: {
      name: string;
      content: string;
      config: QrCodeConfig;
    }) => {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast.error('You must be signed in to save QR codes.');
          return null;
        }

        const insert: QrCodeInsert = {
          user_id: user.id,
          name: values.name,
          content: values.content,
          config: values.config,
        };

        const { data, error } = await supabase
          .from('qr_codes')
          .insert(insert)
          .select()
          .single();

        if (error) throw error;

        setQrCodes((prev) => [data, ...prev]);
        toast.success('QR code saved.');
        return data;
      } catch (error: any) {
        toast.error(error.message || 'Failed to save QR code.');
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateQrCode = useCallback(
    async (id: string, values: Partial<QrCodeInsert>) => {
      setLoading(true);
      try {
        const { error } = await supabase
          .from('qr_codes')
          .update(values)
          .eq('id', id);

        if (error) throw error;

        setQrCodes((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...values } : item))
        );
        toast.success('QR code updated.');
      } catch (error: any) {
        toast.error(error.message || 'Failed to update QR code.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteQrCode = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const { error } = await supabase.from('qr_codes').delete().eq('id', id);

        if (error) throw error;

        setQrCodes((prev) => prev.filter((item) => item.id !== id));
        toast.success('QR code deleted.');
      } catch (error: any) {
        toast.error(error.message || 'Failed to delete QR code.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const uploadLogo = useCallback(
    async (file: File, userId: string) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('logos')
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    },
    []
  );

  return {
    qrCodes,
    loading,
    fetchQrCodes,
    saveQrCode,
    updateQrCode,
    deleteQrCode,
    uploadLogo,
  };
}
