import { createFileRoute, Link } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { fetchIdeas } from '@/api/ideas';

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
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {ideas.map((idea) => (
          <li
            key={idea.id}
            className="flex flex-col justify-between rounded border border-gray-300 bg-white p-4 shadow"
          >
            <div>
              <h2 className="text-lg font-semibold">{idea.title}</h2>
              <p className="mt-2 text-gray-700">{idea.summary}</p>
            </div>

            <Link
              to="/ideas/$ideaId"
              params={{ ideaId: idea.id.toString() }}
              className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-center text-white transition hover:bg-blue-700"
            >
              View Idea
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
