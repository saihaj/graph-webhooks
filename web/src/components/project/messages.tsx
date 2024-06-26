import { graphql, usePaginationFragment } from "react-relay";
import { messages_ProjectMessage$key } from "./__generated__/messages_ProjectMessage.graphql";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  hasNextPage: boolean;
  loadNextPage: () => void;
  isLoadingNext: boolean;
}

function DataTable<TData, TValue>({
  columns,
  data,
  hasNextPage,
  loadNextPage,
  isLoadingNext,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: hasNextPage ? data.length - 1 : data.length,
    onPaginationChange: () => {
      loadNextPage();
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || isLoadingNext}
        >
          {isLoadingNext ? (
            <>
              Load more <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            "Load more"
          )}
        </Button>
      </div>
    </div>
  );
}

const columns: ColumnDef<{
  id: string;
  eventType: string;
  timestamp: number;
}>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "eventType",
    header: "Event Type",
  },
  {
    accessorKey: "timestamp",
    header: "timestamp",
    cell(props) {
      const timestamp = props.row.getValue("timestamp") as number;

      return <span>{formatDate(new Date(timestamp))}</span>;
    },
  },
];

export function ProjectMessages({
  messages,
}: {
  messages: messages_ProjectMessage$key;
}) {
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment messages_ProjectMessage on Project
      @argumentDefinitions(
        cursor: { type: "String" }
        first: { type: "Int", defaultValue: 10 }
      )
      @refetchable(queryName: "Project_messages") {
        messages(after: $cursor, first: $first)
          @connection(key: "ProjectMessage_messages") {
          edges {
            node {
              id
              eventType
              timestamp
            }
          }
        }
      }
    `,
    messages,
  );

  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
        Messages
      </h3>
      {data?.messages ? (
        <DataTable
          columns={columns}
          hasNextPage={hasNext}
          loadNextPage={() => loadNext(50)}
          data={data.messages.edges.map(({ node }) => ({ ...node }))}
          isLoadingNext={isLoadingNext}
        />
      ) : (
        <div className="text-center text-lg">No data sent</div>
      )}
    </div>
  );
}
