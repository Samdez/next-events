import { env } from "@/src/env";
import { createDeliveryClient } from "@kontent-ai/delivery-sdk";
import { contentTypes } from "./project";
import { Article } from "./content-types";

function initClient() {
	return createDeliveryClient({
		environmentId: env.KONTENT_ENVIRONMENT_ID,
	});
}

export async function getArticles() {
	const client = initClient();
	const res = await client
		.items<Article>()
		.type(contentTypes.article.codename)
		.toPromise();

	return res.data;
}
