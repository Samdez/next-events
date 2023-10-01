import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		KONTENT_ENVIRONMENT_ID: z.string(),
		KONTENT_MANAGEMENT_API_KEY: z.string(),
	},
	client: {},
	runtimeEnv: {
		KONTENT_ENVIRONMENT_ID: process.env.KONTENT_ENVIRONMENT_ID,
		KONTENT_MANAGEMENT_API_KEY: process.env.KONTENT_MANAGEMENT_API_KEY,
	},
});
