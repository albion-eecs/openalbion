'use client';

import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
});

export const useSession = authClient.useSession;

export async function signInWithGoogle() {
  return authClient.signIn.social({ provider: 'google' });
}

export async function signOut() {
  return authClient.signOut();
}

export default authClient; 