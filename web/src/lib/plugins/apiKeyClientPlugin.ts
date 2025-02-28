import type { BetterAuthClientPlugin } from "better-auth/client";
import type { apiKeyPlugin } from "./apiKeyPlugin";

export const apiKeyClientPlugin = () => {
  return {
    id: "api-key-factory",
    $InferServerPlugin: {} as ReturnType<typeof apiKeyPlugin>,
  } satisfies BetterAuthClientPlugin;
};

export default apiKeyClientPlugin; 