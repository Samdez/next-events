import { env } from "@/src/env";
import { generateModelsAsync } from "@kontent-ai/model-generator";

generateModelsAsync({
	sdkType: "delivery",
	environmentId: env.KONTENT_ENVIRONMENT_ID,
	isEnterpriseSubscription: false,
	apiKey: env.KONTENT_MANAGEMENT_API_KEY,
	addTimestamp: true,
	addEnvironmentInfo: true,
	elementResolver: "camelCase",
	sortConfig: {
		sortTaxonomyTerms: true,
	},
});
