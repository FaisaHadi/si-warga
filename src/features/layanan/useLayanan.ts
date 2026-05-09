'use client';

import { useState, useEffect } from 'react';
import { Layanan, LayananStatus } from '@/types';
import { layananService } from './layananService';

export const useLayanan = (userId?: string, status?: LayananStatus, enabled = true) => {
  const [layanan, setLayanan] = useState<Layanan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLayanan = async () => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      let data: Layanan[];

      if (userId) {
        data = await layananService.getByUserId(userId);
      } else {
        data = await layananService.getAll(status);
      }

      setLayanan(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch layanan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const run = async () => {
      try {
        if (!enabled) {
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);
        const data = userId
          ? await layananService.getByUserId(userId)
          : await layananService.getAll(status);

        if (active) setLayanan(data);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Failed to fetch layanan');
      } finally {
        if (active) setLoading(false);
      }
    };

    run();

    return () => {
      active = false;
    };
  }, [userId, status, enabled]);

  return { layanan, loading, error, refetch: fetchLayanan };
};
