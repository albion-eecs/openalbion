'use client';


type User = {
  id: string;
  email: string;
  name: string | null;
};

type Session = {
  user: User;
  expiresAt: Date;
};

async function fetchApi(endpoint: string, options?: RequestInit) {
  const response = await fetch(`/api/auth${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Authentication error occurred');
  }

  return response.json();
}

export const authClient = {
  async getSession(): Promise<Session | null> {
    try {
      const data = await fetchApi('/session');
      return data.session;
    } catch {
      return null;
    }
  },

  async signInWithEmailAndPassword({ email, password }: { email: string; password: string }) {
    const data = await fetchApi('/sign-in', {
      method: 'POST',
      body: JSON.stringify({
        provider: 'emailAndPassword',
        email,
        password,
      }),
    });
    return data;
  },

  async signUpWithEmailAndPassword({
    email,
    password,
    userData,
  }: {
    email: string;
    password: string;
    userData?: { name: string };
  }) {
    const data = await fetchApi('/sign-up', {
      method: 'POST',
      body: JSON.stringify({
        provider: 'emailAndPassword',
        email,
        password,
        userData,
      }),
    });
    return data;
  },

  async signOut() {
    await fetchApi('/sign-out', {
      method: 'POST',
    });
  },
}; 