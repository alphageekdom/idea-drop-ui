import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Link,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClient } from '@tanstack/react-query';
import Header from '@/components/Header';

type RouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        name: 'description',
        content:
          'Discover, collaborate on, and develop premier startup concepts and side hustle opportunities.',
      },
      { title: 'IdeaDrop - Your Idea Hub' },
    ],
  }),

  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <HeadContent />
      <Header />
      <main className="flex justify-center p-6">
        <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
          <Outlet />
        </div>
      </main>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">404</h1>
      <p className="mb-6 text-lg text-gray-600">
        Sorry, the page you're looking for can't be found.
      </p>
      <Link
        to="/"
        className="rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
      >
        ⬅ Go Back Home
      </Link>
    </div>
  );
}
