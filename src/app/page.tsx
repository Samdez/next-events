import EventCard from "@/components/EventCard";
import { getEvents } from "../kontent/utils";

export default async function Home() {
	const { items: events } = await getEvents();

	return (
		<main className="p-8">
			<div className="flex gap-8">
				{events.map(event => {
					return <EventCard event={event} key={event.system.id} />;
				})}
			</div>
		</main>
	);
}
