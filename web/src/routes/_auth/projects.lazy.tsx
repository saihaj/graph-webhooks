import { createLazyFileRoute } from "@tanstack/react-router";
import { CreateProject } from "@/components/create";
import { Projects } from "@/components/projects";
import { graphql, useLazyLoadQuery } from "react-relay";
import { projectsQuery } from "./__generated__/projectsQuery.graphql";

export const Route = createLazyFileRoute("/_auth/projects")({
  component: Index,
});

function Index() {
  const data = useLazyLoadQuery<projectsQuery>(
    graphql`
      query projectsQuery {
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
