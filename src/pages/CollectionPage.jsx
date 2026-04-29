import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function CollectionPage({ collection }) {
  return (
    <Card className="rounded-xl border shadow-sm">
      <CardContent className="p-0">
        <div className="border-b px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                  {collection.name}
                </h2>
                <Badge
                  variant="secondary"
                  className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600"
                >
                  {collection.endpoints.length} endpoints
                </Badge>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                {collection.subtitle}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              {collection.description}
              </p>
            </div>

            <div className="w-full rounded-lg border bg-slate-50 p-3 lg:w-[260px]">
              <p className="text-xs font-medium uppercase text-slate-500">
                Primary endpoint
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Badge className="rounded-md bg-emerald-600 px-2 py-0.5 font-mono text-[11px]">
                  {collection.method}
                </Badge>
                <code className="truncate text-xs font-medium text-slate-800">
                  {collection.endpoint}
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {collection.endpoints.map((endpoint) => (
            <div
              key={endpoint}
              className="min-w-0 px-4 py-3 sm:px-5"
            >
              <p className="text-[11px] font-medium uppercase text-slate-400">
                Endpoint
              </p>
              <code className="mt-1 block truncate text-xs text-slate-700">
                {endpoint}
              </code>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
