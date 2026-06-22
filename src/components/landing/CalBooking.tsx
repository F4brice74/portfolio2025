'use client';

import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

export default function CalBooking({ calLink }: { calLink: string }) {
  useEffect(() => {
    getCalApi().then((cal) => {
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    });
  }, []);

  return (
    <Cal
      calLink={calLink}
      style={{ width: '100%', minHeight: 600, overflow: 'auto' }}
      config={{ layout: 'month_view' }}
    />
  );
}
