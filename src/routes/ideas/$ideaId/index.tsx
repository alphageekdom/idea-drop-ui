import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import {
  queryOptions,
  useSuspenseQuery,
  useMutation,
} from '@tanstack/react-query';
import { fetchIdea, deleteIdea } from '@/api/ideas';

const ideaQueryOptions = (ideaId: string) =>
  queryOptions({
    queryKey: ['idea', ideaId],
    queryFn: () => fetchIdea(ideaId),
  });

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  },
});

function IdeaDetailsPage() {
  const { ideaId } = Route.useParams();
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

  const navigate = useNavigate();

  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteIdea(ideaId),
    onSuccess: () => {
      navigate({ to: '/ideas' });
    },
  });

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this idea?'
    );

    if (confirmDelete) {
      await deleteMutate();
    }
  };

  return (
    <div className="p-4">
      <Link to="/ideas" className="mb-4 block text-blue-500 underline">
        ⬅ Back To Ideas
      </Link>
      <h2 className="text-2xl font-bold">{idea.title}</h2>
      <p className="mt-2">{idea.description}</p>

      <button
        className="disabled:opacity:50 mt-4 cursor-pointer rounded bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
        disabled={isPending}
        onClick={handleDelete}
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
}
