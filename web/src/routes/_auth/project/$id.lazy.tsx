import { createLazyFileRoute } from "@tanstack/react-router";
import { graphql, useLazyLoadQuery } from "react-relay";
import { IdProjectQuery } from "./__generated__/IdProjectQuery.graphql";
import { ProjectMessages } from "@/components/project/messages";
import { Circle, CirclePauseIcon } from "lucide-react";

function Project() {
  const { id } = Route.useParams();
  const { project } = useLazyLoadQuery<IdProjectQuery>(
    graphql`
      query IdProjectQuery($id: String!) {
        project(id: $id) {
          chain
          endpoint
          name
          state
          ...messages_ProjectMessage
        }
      }
    `,
    {
      id,
    },
  );

  return (
    <div className="m-4">
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center">
          {project.name}
        </h1>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {project.chain}
        </h4>
      </div>
      <div className="flex items-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Endpoint:
        </h3>
        <code className="relative rounded bg-muted font-mono text-lg font-semibold ml-2 mt-1">
          {project.endpoint}
        </code>
      </div>
      <div className="flex items-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          State:
        </h3>
        <div className="ml-2 flex text-2xl items-center">
          {project.state === "ACTIVE" ? (
            <>
              <span>Active</span>
              <Circle size={24} className="text-green-500 ml-2" />
            </>
          ) : (
            <>
              <span>Paused</span>
              <CirclePauseIcon size={24} className="text-red-500 ml-2" />
            </>
          )}
        </div>
      </div>
      <div className="mt-4">
        <ProjectMessages messages={project} />
      </div>
    </div>
  );
}

export const Route = createLazyFileRoute("/_auth/project/$id")({
  component: Project,
});
