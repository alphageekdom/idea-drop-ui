import { createFileRoute, Link } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { fetchIdeas } from '@/api/ideas';
import IdeaCard from '@/components/IdeaCard';

const ideasQueryOptions = () =>
  queryOptions({
    queryKey: ['ideas'],
    queryFn: () => fetchIdeas(),
  });

export const Route = createFileRoute('/ideas/')({
  head: () => ({
    meta: [{ title: 'IdeaHub - Browse Ideas' }],
  }),
  component: IdeasPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideasQueryOptions());
  },
});

function IdeasPage() {
  const { data: ideas } = useSuspenseQuery(ideasQueryOptions());

  // console.log(ideas);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Ideas</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  );
}
