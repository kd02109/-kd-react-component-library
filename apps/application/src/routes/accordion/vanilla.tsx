import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/accordion/vanilla')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/accordion/vanilla"!</div>;
}
