import type { Idea } from '@/types';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';

const IdeaCard = ({
  idea,
  button = true,
}: {
  idea: Idea;
  button?: boolean;
}) => {
  const linkClasses = clsx({
    'text-blue-600 hover:underline mt-3': !button,
    'mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-center text-white transition hover:bg-blue-700':
      button,
  });
  return (
    <div className="flex flex-col justify-between rounded border border-gray-300 bg-white p-4 shadow">
      <div>
        <h2 className="text-lg font-semibold">{idea.title}</h2>
        <p className="mt-2 text-gray-700">{idea.summary}</p>
      </div>

      <Link
        to="/ideas/$ideaId"
        params={{ ideaId: idea.id.toString() }}
        className={linkClasses}
      >
        {button ? 'View Idea' : 'Read More →'}
      </Link>
    </div>
  );
};

export default IdeaCard;
