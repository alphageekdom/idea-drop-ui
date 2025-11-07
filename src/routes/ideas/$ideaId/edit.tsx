import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import {
  useMutation,
  useSuspenseQuery,
  queryOptions,
} from '@tanstack/react-query';
import { fetchIdea, updateIdea } from '@/api/ideas';

const ideaQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['idea', id],
    queryFn: () => fetchIdea(id),
  });

export const Route = createFileRoute('/ideas/$ideaId/edit')({
  component: IdeaEditPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  },
});

function IdeaEditPage() {
  const { ideaId } = Route.useParams();
  const navigate = useNavigate();
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

  const [title, setTitle] = useState(idea.title);
  const [summary, setSummary] = useState(idea.summary);
  const [description, setDescription] = useState(idea.description);
  const [tagsInput, setTagsInput] = useState(idea.tags.join(', '));

  // console.log(idea);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      updateIdea(ideaId, {
        title,
        summary,
        description,
        tags: tagsInput
          .split('.')
          .map((t) => t.trim())
          .filter(Boolean),
      }),
    onSuccess: () => {
      navigate({ to: '/ideas/$ideaId', params: { ideaId } });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync();
  };

  return (
    <div className="space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Idea</h1>
        <Link
          to="/ideas/$ideaId"
          params={{ ideaId }}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back To Idea
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label
            htmlFor="title"
            className="mb-1 block font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter idea title"
          />
        </div>

        <div>
          <label
            htmlFor="summary"
            className="mb-1 block font-medium text-gray-700"
          >
            Summary
          </label>
          <input
            id="summary"
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter idea summary"
          />
        </div>

        <div>
          <label
            htmlFor="body"
            className="mb-1 block font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="body"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Write out the description of your idea"
          />
        </div>

        <div>
          <label
            htmlFor="tags"
            className="mb-1 block font-medium text-gray-700"
          >
            Tags
          </label>
          <input
            id="tags"
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="optional tags, comma separated"
          />
        </div>

        <div className="mt-5">
          <button
            type="submit"
            disabled={isPending}
            className="block w-full cursor-pointer rounded-md bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? 'Updating...' : 'Update Idea'}
          </button>
        </div>
      </form>
    </div>
  );
}
