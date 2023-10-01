import { getArticles } from "../kontent/utils";

export default async function Home() {
	const { items: articles } = await getArticles();

	return (
		<main>
			{articles.map(article => {
				return (
					<div key={article.system.id}>
						<h1>{article.elements.title.value}</h1>
					</div>
				);
			})}
		</main>
	);
}
