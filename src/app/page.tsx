import { getEvents } from "../kontent/utils";

export default async function Home() {
	const { items: events } = await getEvents();

	return (
		<main>
			{events.map(({ elements, system }) => {
				return (
					<div key={system.id}>
						<h1>{elements.title.value}</h1>
					</div>
				);
			})}
		</main>
	);
}
