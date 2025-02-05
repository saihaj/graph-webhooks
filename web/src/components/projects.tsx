import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { graphql, useFragment, usePaginationFragment } from "react-relay";
import { projects_ProjectCard$key } from "./__generated__/projects_ProjectCard.graphql";
import { projects_ProjectsGrid$key } from "./__generated__/projects_ProjectsGrid.graphql";
import { Link } from "@tanstack/react-router";
import { Circle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

function ProjectCard({ card }: { card: projects_ProjectCard$key }) {
  const data = useFragment(
    graphql`
      fragment projects_ProjectCard on Project {
        id
        name
        chain
        state
      }
    `,
    card,
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="grid gap-1">
          <CardTitle>{data.name}</CardTitle>
          <CardDescription className="flex items-center">
            <Button
              variant="link"
              size="sm"
              className="p-0 text-muted-foreground"
            >
              {data.chain}
            </Button>
            <div className="ml-1 mt-1">
              {data.state === "ACTIVE" ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Circle className="w-4 h-4 fill-green-500 text-green-500"></Circle>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Project is sending events</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Circle className="w-4 h-4 fill-red-500 text-red-500"></Circle>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Project is not sending any events</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm">
          <Button variant="link" size="sm" className="p-0">
            <Link
              to="/project/$id"
              params={{
                id: data.id,
              }}
            >
              View
            </Link>
          </Button>
          <Button variant="link" size="sm" className="p-0">
            <Link
              to="/project/$id"
              params={{
                id: data.id,
              }}
            >
              Edit
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function Projects({
  projects,
}: {
  projects: projects_ProjectsGrid$key;
}) {
  const { data, hasNext, loadNext } = usePaginationFragment(
    graphql`
      fragment projects_ProjectsGrid on Query
      @argumentDefinitions(
        cursor: { type: "String" }
        first: { type: "Int", defaultValue: 9 }
      )
      @refetchable(queryName: "ProjectsGridQuery") {
        projects(after: $cursor, first: $first)
          @connection(key: "ProjectsGrid_projects") {
          edges {
            node {
              id
              ...projects_ProjectCard
            }
          }
        }
      }
    `,
    projects,
  );

  return (
    <section className="flex flex-col">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.projects.edges.map(({ node }) => (
          <ProjectCard key={node.id} card={node} />
        ))}
      </div>
      {hasNext && (
        <div className="mt-4 justify-center flex">
          <Button variant="secondary" size="sm" onClick={() => loadNext(9)}>
            Load more
          </Button>
        </div>
      )}
    </section>
  );
}
