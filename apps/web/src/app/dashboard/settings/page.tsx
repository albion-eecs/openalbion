"use client";

import {
	ArrowLeft,
	Check,
	Copy,
	Key,
	Loader2,
	Trash,
	User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";
import type { ApiKey } from "@/lib/types";

export default function SettingsPage() {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();
	const user = session?.user ?? null;

	const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
	const [apiKeysLoading, setApiKeysLoading] = useState(true);
	const [newKeyName, setNewKeyName] = useState("");
	const [expiresInDays, setExpiresInDays] = useState("30");
	const [neverExpires, setNeverExpires] = useState(false);
	const [apiKeyCreated, setApiKeyCreated] = useState<{
		name: string;
		key: string;
	} | null>(null);
	const [formError, setFormError] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	const [notificationPrefs, setNotificationPrefs] = useState({
		apiUsageAlerts: true,
		securityAlerts: true,
		dataUpdateAlerts: false,
	});
	const [prefsLoading, setPrefsLoading] = useState(true);

	useEffect(() => {
		if (!isPending && !user) {
			router.push("/login");
		}
	}, [user, isPending, router]);

	useEffect(() => {
		if (user) {
			fetchApiKeys();
			fetchNotificationPreferences();
		}
	}, [user]);

	const fetchApiKeys = async () => {
		try {
			setApiKeysLoading(true);
			const response = await fetch("/api/user/keys", {
				cache: "no-store",
			});

			if (response.ok) {
				const data = await response.json();
				setApiKeys(data.data);
			}
		} catch (error) {
			console.error("Error fetching API keys:", error);
		} finally {
			setApiKeysLoading(false);
		}
	};

	const fetchNotificationPreferences = async () => {
		try {
			setPrefsLoading(true);
			const response = await fetch("/api/user/preferences", {
				cache: "no-store",
			});

			if (response.ok) {
				const data = await response.json();
				setNotificationPrefs({
					apiUsageAlerts: data.apiUsageAlerts,
					securityAlerts: data.securityAlerts,
					dataUpdateAlerts: data.dataUpdateAlerts,
				});
			}
		} catch (error) {
			console.error("Error fetching notification preferences:", error);
		} finally {
			setPrefsLoading(false);
		}
	};

	const handleCreateApiKey = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormError(null);

		if (!newKeyName.trim()) {
			setFormError("API key name is required");
			return;
		}

		setApiKeysLoading(true);

		try {
			const response = await fetch("/api/user/keys", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: newKeyName,
					expiresInDays: neverExpires
						? null
						: Number.parseInt(expiresInDays, 10),
				}),
				cache: "no-store",
			});

			const data = await response.json();

			if (data.success) {
				setApiKeyCreated({ name: newKeyName, key: data.data.apiKey });
				setApiKeys([data.data, ...apiKeys]);
				setNewKeyName("");
				setExpiresInDays("30");
				setNeverExpires(false);
			} else {
				setFormError(data.error || "Failed to create API key");
			}
		} catch (err) {
			console.error("An error occurred while creating API key", err);
			setFormError("An error occurred while creating API key");
		} finally {
			setApiKeysLoading(false);
		}
	};

	const handleRevokeApiKey = async (id: number) => {
		try {
			setApiKeysLoading(true);
			const response = await fetch(`/api/user/keys?id=${id}&action=revoke`, {
				method: "DELETE",
				cache: "no-store",
			});

			const data = await response.json();

			if (data.success) {
				setApiKeys(
					apiKeys.map((key) =>
						key.id === id ? { ...key, isActive: false } : key,
					),
				);
			}
		} catch (error) {
			console.error("Error revoking API key:", error);
		} finally {
			setApiKeysLoading(false);
		}
	};

	const handleUnrevokeApiKey = async (id: number) => {
		try {
			setApiKeysLoading(true);
			const response = await fetch(`/api/user/keys?id=${id}&action=unrevoke`, {
				method: "PUT",
				cache: "no-store",
			});

			const data = await response.json();

			if (data.success) {
				setApiKeys(
					apiKeys.map((key) =>
						key.id === id ? { ...key, isActive: true } : key,
					),
				);
			}
		} catch (error) {
			console.error("Error unrevoking API key:", error);
		} finally {
			setApiKeysLoading(false);
		}
	};

	const handleDeleteApiKey = async (id: number) => {
		try {
			setApiKeysLoading(true);
			const response = await fetch(`/api/user/keys?id=${id}&action=delete`, {
				method: "DELETE",
				cache: "no-store",
			});

			const data = await response.json();

			if (data.success) {
				setApiKeys(apiKeys.filter((key) => key.id !== id));
			}
		} catch (error) {
			console.error("Error deleting API key:", error);
		} finally {
			setApiKeysLoading(false);
		}
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(
			() => {
				setCopied(true);
				setTimeout(() => {
					setCopied(false);
					setApiKeyCreated(null);
				}, 2000);
			},
			(err) => {
				console.error("Failed to copy API key to clipboard", err);
			},
		);
	};

	const formatDate = (timestamp: number | null) => {
		if (!timestamp) return "Never";
		return new Date(timestamp * 1000).toLocaleString();
	};

	const handlePreferenceChange = async (preference: string, value: boolean) => {
		try {
			setNotificationPrefs((prev) => ({
				...prev,
				[preference]: value,
			}));

			const response = await fetch("/api/user/preferences", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ [preference]: value }),
				cache: "no-store",
			});

			if (!response.ok) {
				setNotificationPrefs((prev) => ({
					...prev,
					[preference]: !value,
				}));
			}
		} catch (error) {
			setNotificationPrefs((prev) => ({
				...prev,
				[preference]: !value,
			}));
			console.error("Error updating notification preferences:", error);
		}
	};

	if (isPending || !user) {
		return null;
	}

	return (
		<div className="container mx-auto py-8">
			<div className="mb-6 flex items-center">
				<Button
					variant="ghost"
					className="mr-2 h-auto p-0"
					onClick={() => router.push("/dashboard")}
				>
					<ArrowLeft className="h-5 w-5" />
				</Button>
				<h1 className="font-bold text-3xl">Settings</h1>
			</div>

			<Tabs defaultValue="account" className="space-y-6">
				<TabsList className="grid w-full max-w-md grid-cols-2">
					<TabsTrigger value="account" className="flex items-center gap-2">
						<User className="h-4 w-4" />
						Account
					</TabsTrigger>
					<TabsTrigger value="apikeys" className="flex items-center gap-2">
						<Key className="h-4 w-4" />
						API Keys
					</TabsTrigger>
				</TabsList>

				<TabsContent value="account" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Account Settings</CardTitle>
							<CardDescription>Manage your account settings</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div>
								<h3 className="mb-4 font-medium text-lg">
									Profile Information
								</h3>
								<div className="flex items-center space-x-4">
									<div className="relative">
										<div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-primary font-bold text-lg text-white">
											{user.name
												? user.name.charAt(0).toUpperCase()
												: user.email.charAt(0).toUpperCase()}
										</div>
										<span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
									</div>
									<div>
										<p className="font-medium">{user.name || "User"}</p>
										<p className="text-muted-foreground text-sm">
											{user.email}
										</p>
									</div>
								</div>
							</div>

							<div className="border-t pt-6">
								<h3 className="mb-4 font-medium text-lg">
									Notification Preferences
								</h3>
								{prefsLoading ? (
									<div className="space-y-6">
										{[1, 2].map((i) => (
											<div
												key={i}
												className="flex animate-pulse items-center justify-between"
											>
												<div className="space-y-2">
													<div className="h-4 w-32 rounded bg-gray-200/20" />
													<div className="h-3 w-48 rounded bg-gray-200/20" />
												</div>
												<div className="h-5 w-10 rounded bg-gray-200/20" />
											</div>
										))}
									</div>
								) : (
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<div>
												<h4 className="font-medium">API Usage Alerts</h4>
												<p className="text-muted-foreground text-sm">
													Receive notifications when API usage nears limits
												</p>
											</div>
											<Switch
												checked={notificationPrefs.apiUsageAlerts}
												onCheckedChange={(checked) =>
													handlePreferenceChange("apiUsageAlerts", checked)
												}
												className="data-[state=checked]:bg-purple-600"
											/>
										</div>
										<div className="flex items-center justify-between">
											<div>
												<h4 className="font-medium">Security Alerts</h4>
												<p className="text-muted-foreground text-sm">
													Get notified about suspicious account activity
												</p>
											</div>
											<Switch
												checked={notificationPrefs.securityAlerts}
												onCheckedChange={(checked) =>
													handlePreferenceChange("securityAlerts", checked)
												}
												className="data-[state=checked]:bg-purple-600"
											/>
										</div>
										<div className="flex items-center justify-between">
											<div>
												<h4 className="font-medium">Data Updates</h4>
												<p className="text-muted-foreground text-sm">
													Get notified when new datasets are available
												</p>
											</div>
											<Switch
												checked={notificationPrefs.dataUpdateAlerts}
												onCheckedChange={(checked) =>
													handlePreferenceChange("dataUpdateAlerts", checked)
												}
												className="data-[state=checked]:bg-purple-600"
											/>
										</div>
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="apikeys" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Create New API Key</CardTitle>
							<CardDescription>
								Generate a new API key to access the API. Keep your API keys
								secure!
							</CardDescription>
						</CardHeader>
						<form onSubmit={handleCreateApiKey} noValidate>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="keyName">API Key Name</Label>
										<Input
											id="keyName"
											placeholder="e.g., Development, Production"
											value={newKeyName}
											onChange={(e) => {
												setNewKeyName(e.target.value);
												if (formError) setFormError(null);
											}}
											required
											className={formError ? "border-red-400" : ""}
										/>
										{formError && (
											<p className="mt-1 text-red-500 text-sm">{formError}</p>
										)}
									</div>
									<div className="space-y-2">
										<Label htmlFor="expiresInDays">Expires In (Days)</Label>
										<div className="relative flex items-center">
											<Input
												id="expiresInDays"
												inputMode="numeric"
												pattern="[0-9]*"
												disabled={neverExpires}
												value={neverExpires ? "" : expiresInDays}
												placeholder={neverExpires ? "∞" : "e.g., 30, 60, 90"}
												onChange={(e) => setExpiresInDays(e.target.value)}
												className={`pr-32 ${neverExpires ? "text-muted-foreground placeholder:text-muted-foreground/80" : ""}`}
											/>
											<div className="absolute right-3 flex items-center space-x-1.5 bg-background pl-2">
												<Checkbox
													id="neverExpires"
													checked={neverExpires}
													onCheckedChange={(checked) =>
														setNeverExpires(checked === true)
													}
													className="h-4 w-4"
												/>
												<Label htmlFor="neverExpires" className="text-xs">
													Never expires
												</Label>
											</div>
										</div>
									</div>
								</div>

								{apiKeyCreated && (
									<div className="mt-4 rounded-md border border-secondary/20 bg-secondary/10 p-4">
										<p className="mb-2 font-medium text-foreground">
											Your new API key has been created. Copy it now, you
											won&apos;t be able to see it again!
										</p>
										<div className="flex items-center space-x-2">
											<code className="flex-1 overflow-x-auto rounded border border-secondary/20 bg-background p-2">
												{apiKeyCreated.key}
											</code>
											<Button
												type="button"
												variant="outline"
												size="sm"
												onClick={() => copyToClipboard(apiKeyCreated.key)}
												disabled={copied}
											>
												{copied ? (
													<Check className="h-4 w-4 text-green-500" />
												) : (
													<Copy size={16} />
												)}
											</Button>
										</div>
									</div>
								)}
							</CardContent>
							<CardFooter>
								<Button
									type="submit"
									className="bg-gradient-to-r from-secondary to-purple-600 text-white"
									disabled={apiKeysLoading}
								>
									{apiKeysLoading ? (
										<span className="flex items-center">
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Creating...
										</span>
									) : (
										"Create API Key"
									)}
								</Button>
							</CardFooter>
						</form>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Your API Keys</CardTitle>
							<CardDescription>Manage your existing API keys</CardDescription>
						</CardHeader>
						<CardContent>
							{apiKeysLoading ? (
								<div className="flex items-center justify-center py-8">
									<Loader2 className="h-8 w-8 animate-spin text-gray-400" />
								</div>
							) : apiKeys.length === 0 ? (
								<p className="py-4 text-muted-foreground">
									You don&apos;t have any API keys yet.
								</p>
							) : (
								<div className="space-y-4">
									{apiKeys.map((key) => (
										<div
											key={key.id}
											className={`rounded-lg p-4 ${
												key.isActive
													? "border"
													: "border border-secondary/30 bg-secondary/20"
											}`}
										>
											<div className="mb-2 flex items-start justify-between">
												<div>
													<h3 className="flex items-center font-semibold">
														{key.name}
														{!key.isActive && (
															<span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 font-medium text-red-700 text-xs dark:bg-red-900 dark:text-red-300">
																Revoked
															</span>
														)}
													</h3>
													<div className="text-muted-foreground text-sm">
														Created: {formatDate(key.createdAt)}
													</div>
												</div>
												<div className="flex items-center">
													{key.isActive ? (
														<Button
															variant="outline"
															size="sm"
															onClick={() => handleRevokeApiKey(key.id)}
															className="mr-2 border-yellow-200 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700"
														>
															Revoke
														</Button>
													) : (
														<Button
															variant="outline"
															size="sm"
															onClick={() => handleUnrevokeApiKey(key.id)}
															className="mr-2 border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700"
														>
															Unrevoke
														</Button>
													)}
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleDeleteApiKey(key.id)}
														className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
													>
														<Trash size={16} />
													</Button>
												</div>
											</div>
											<div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
												<div>
													<span className="text-muted-foreground">
														Last used:
													</span>{" "}
													{formatDate(key.lastUsedAt)}
												</div>
												<div>
													<span className="text-muted-foreground">
														Expires:
													</span>{" "}
													{key.expiresAt ? formatDate(key.expiresAt) : "Never"}
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
