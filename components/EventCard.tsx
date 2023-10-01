import Image from "next/image";
import { Event } from "..";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

function EventCard({ event }: { event: Event }) {
	return (
		<Card className="flex flex-col items-center">
			<CardHeader>
				<CardTitle>{event.elements.title.value}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex justify-center">
					<Image
						alt="event picture"
						src={event.elements.image.value[0].url}
						width={256}
						height={256}
					/>
				</div>
				<CardDescription className="text-center font-bold p-4 text-xl">
					{event.elements.location.linkedItems[0].elements.name.value}
				</CardDescription>
				<CardDescription className="text-center font-semibold">
					{new Date(event.elements.date.value!).toLocaleDateString("fr-FR")}
				</CardDescription>
			</CardContent>
			<CardFooter>
				<p>
					{event.elements.price.value
						? `${event.elements.price.value} euros`
						: "Gratuit"}
				</p>
			</CardFooter>
		</Card>
	);
}

export default EventCard;
