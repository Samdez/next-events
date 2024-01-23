import FilterSection from '@/components/FilterSection';
import { getCategories } from '../queries';
import { searchParamsSchema } from '@/src/schemas/searchParams';

export default async function GenresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <>
      {/* <FilterSection categories={categories} /> */}
      <section>{children}</section>
    </>
  );
}
