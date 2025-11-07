import { createFileRoute, Link } from '@tanstack/react-router';
import { Lightbulb } from 'lucide-react';
import { fetchIdeas } from '@/api/ideas';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

const ideasQueryOptions = queryOptions({
  queryKey: ['ideas'],
  queryFn: fetchIdeas,
});

export const Route = createFileRoute('/')({
  component: App,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(ideasQueryOptions),
});

function App() {
  const { data: ideas } = useSuspenseQuery(ideasQueryOptions);

  // console.log(ideas);

  const latestIdeas = ideas.slice(0, 3);

  return (
    <div className="flex flex-col items-start justify-between gap-10 p-6 text-blue-600 md:flex-row">
      <div className="flex flex-col items-start gap-4">
        <Lightbulb className="h-16 w-16 text-yellow-400" />
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to IdeaDrop
        </h1>
        <p className="max-w-xs text-gray-600">
          Share, explore, and build on the best startup ideas and side hustles.
        </p>
      </div>

      <section className="flex-1">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Latest Ideas
        </h2>
        <ul className="space-y-6">
          {latestIdeas.map((idea) => (
            <li
              key={idea.id}
              className="rounded-lg border border-gray-300 bg-white p-4 shadow"
            >
              <h3 className="text-lg font-bold text-gray-900">{idea.title}</h3>
              <p className="mb-2 text-gray-600">{idea.summary}</p>
              <Link
                to="/ideas/$ideaId"
                params={{ ideaId: idea.id.toString() }}
                className="text-blue-600 hover:underline"
              >
                Read More →
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <a
            href="/ideas"
            className="inline-block w-full rounded-md bg-blue-600 px-5 py-2 text-center font-semibold text-white transition hover:bg-blue-700"
          >
            View All Ideas
          </a>
        </div>
      </section>
    </div>
  );
}
