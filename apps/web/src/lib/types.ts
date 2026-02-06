export type UserLog = {
	userId: string;
	action: string;
	resourceType?: string;
	resourceId?: string;
	details?: string;
};

export type ApiKey = {
	id: number;
	userId: string;
	apiKey: string;
	name: string;
	createdAt: number;
	expiresAt: number | null;
	lastUsedAt: number | null;
	isActive: boolean;
};
