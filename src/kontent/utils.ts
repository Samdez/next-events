import { env } from "@/src/env";
import { createDeliveryClient } from "@kontent-ai/delivery-sdk";
import { Event } from "@/content-types";
import { contentTypes } from "@/project";

function initClient() {
	return createDeliveryClient({
		environmentId: env.KONTENT_ENVIRONMENT_ID,
	});
}

export async function getEvents() {
	const client = initClient();
	const res = await client
		.items<Event>()
		.type(contentTypes.event.codename)
		.toPromise();

	return res.data;
}
