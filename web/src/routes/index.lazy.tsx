import { createLazyFileRoute } from "@tanstack/react-router";
import { CreateProject } from "@/components/create";
import { Projects } from "@/components/projects";
import { graphql, useLazyLoadQuery } from "react-relay";
import { routesIndexProjectQuery } from "./__generated__/routesIndexProjectQuery.graphql";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const data = useLazyLoadQuery<routesIndexProjectQuery>(
    graphql`
      query routesIndexProjectQuery {
        ...projects_ProjectsGrid
      }
    `,
    {},
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Projects</h1>
        <CreateProject />
      </div>
      <Projects projects={data} />
    </main>
  );
}
