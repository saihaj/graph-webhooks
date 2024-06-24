import { createLazyFileRoute } from "@tanstack/react-router";

function Project() {
  const { id } = Route.useParams();
  return <div>Hello Project {id}!</div>;
}

export const Route = createLazyFileRoute("/_auth/project/$id")({
  loader: async ({ params }) => {
    console.log(params);
  },
  component: Project,
});
