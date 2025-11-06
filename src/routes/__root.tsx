import { Outlet, createRootRoute, HeadContent } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

export const Route = createRootRoute({
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

  component: () => (
    <>
      <HeadContent />
      <Outlet />
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
    </>
  ),
});
