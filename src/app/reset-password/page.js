'use client';

import { Suspense } from 'react';
import ResetPasswordPage from './reset-passwordClient.js';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
