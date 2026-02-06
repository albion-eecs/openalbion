"use client";

import { createContext, useContext, type ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

type User = {
	id: string;
	email: string;
	name: string | null;
	image?: string | null;
};

type AuthContextType = {
	user: User | null;
	loading: boolean;
	signUp: (email: string, password: string, name: string) => Promise<void>;
	signIn: (email: string, password: string) => Promise<void>;
	logout: (redirectPath?: string) => Promise<void>;
	validateAlbionEmail: (email: string) => boolean;
};

interface AuthError {
	status?: number;
	message?: string;
	statusText?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ERROR_MESSAGES = {
	INVALID_CREDENTIALS: "Invalid email or password",
	DOMAIN_VALIDATION:
		"Only @albion.edu email addresses are allowed to register",
	USER_EXISTS: "An account with this email already exists",
	PASSWORD_TOO_WEAK: "Password must be at least 8 characters long",
	NETWORK_ERROR: "Network error. Please check your connection and try again",
	DEFAULT: "An unexpected error occurred. Please try again",
};

export function AuthProvider({ children }: { children: ReactNode }) {
	const { data: session, isPending } = authClient.useSession();

	const user = session?.user as User | null;
	const loading = isPending;

	const validateAlbionEmail = (email: string) => {
		const emailRegex = /@albion\.edu$/i;
		return emailRegex.test(email);
	};

	const parseAuthError = (error: AuthError | unknown): string => {
		if (!error) return ERROR_MESSAGES.DEFAULT;

		const authError = error as AuthError;

		if (
			authError.status === 400 &&
			authError.message?.includes("@albion.edu")
		) {
			return ERROR_MESSAGES.DOMAIN_VALIDATION;
		}
		if (authError.status === 401) {
			return ERROR_MESSAGES.INVALID_CREDENTIALS;
		}
		if (authError.status === 409) {
			return ERROR_MESSAGES.USER_EXISTS;
		}
		if (authError.message?.includes("password")) {
			return ERROR_MESSAGES.PASSWORD_TOO_WEAK;
		}
		if (
			authError.message?.includes("network") ||
			authError.message?.includes("connect")
		) {
			return ERROR_MESSAGES.NETWORK_ERROR;
		}

		return authError.message || ERROR_MESSAGES.DEFAULT;
	};

	const signUp = async (email: string, password: string, name: string) => {
		try {
			if (!validateAlbionEmail(email)) {
				throw new Error(ERROR_MESSAGES.DOMAIN_VALIDATION);
			}

			const { error } = await authClient.signUp.email({
				email,
				password,
				name,
				callbackURL: "/dashboard",
			});

			if (error) {
				throw error;
			}
		} catch (error) {
			throw new Error(parseAuthError(error));
		}
	};

	const signIn = async (email: string, password: string) => {
		try {
			const { error } = await authClient.signIn.email({
				email,
				password,
				callbackURL: "/dashboard",
				rememberMe: true,
			});

			if (error) {
				throw error;
			}
		} catch (error) {
			throw new Error(parseAuthError(error));
		}
	};

	const logout = async (redirectPath = "/") => {
		try {
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						window.location.href = redirectPath;
					},
				},
			});
		} catch (error) {
			throw new Error(parseAuthError(error));
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, loading, signUp, signIn, logout, validateAlbionEmail }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
