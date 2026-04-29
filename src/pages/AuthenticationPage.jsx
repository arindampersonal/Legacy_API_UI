import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, KeyRound, Lock, ShieldCheck } from "lucide-react";

const authMethods = [
  "Bearer Token",
  "API Key",
  "Basic Auth",
  "OAuth 2.0",
  "Legacy HMAC",
];

export default function AuthenticationPage({ onBack }) {
  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 lg:p-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase text-orange-600">
              Authentication
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              Workspace authentication
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Configure the default auth pattern used by legacy API requests.
            </p>
          </div>
          <Button variant="outline" className="w-full rounded-md sm:w-auto" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to studio
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
          <Card className="rounded-xl border shadow-sm">
            <CardContent className="p-3">
              <p className="px-2 pb-2 text-sm font-semibold">Auth type</p>
              <div className="space-y-1">
                {authMethods.map((method, index) => (
                  <button
                    key={method}
                    type="button"
                    className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
                      index === 0
                        ? "bg-orange-50 font-medium text-orange-700"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {method}
                    {index === 0 ? (
                      <Badge className="rounded bg-orange-500 px-1.5 py-0 text-[10px]">
                        Active
                      </Badge>
                    ) : null}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border shadow-sm">
            <CardContent className="p-0">
              <div className="border-b px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-orange-500" />
                  <h2 className="font-semibold">Bearer Token</h2>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Add a token template for requests that use Authorization headers.
                </p>
              </div>

              <div className="space-y-4 p-4 sm:p-5">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_1fr] md:items-center">
                  <label className="text-sm font-medium text-slate-600">
                    Header key
                  </label>
                  <Input value="Authorization" readOnly className="h-10 rounded-md bg-slate-50" />
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_1fr] md:items-center">
                  <label className="text-sm font-medium text-slate-600">
                    Token prefix
                  </label>
                  <Input value="Bearer" readOnly className="h-10 rounded-md bg-slate-50" />
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_1fr] md:items-center">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <Lock className="h-4 w-4 text-slate-400" />
                    Token value
                  </label>
                  <Input
                    type="password"
                    placeholder="Paste token during runtime"
                    className="h-10 rounded-md"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_1fr] md:items-center">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <KeyRound className="h-4 w-4 text-slate-400" />
                    Scope
                  </label>
                  <select className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                    <option>Apply to selected collection</option>
                    <option>Apply to all collections</option>
                    <option>Request only</option>
                  </select>
                </div>

                <div className="rounded-lg border bg-slate-50 p-3">
                  <p className="text-xs font-medium uppercase text-slate-500">
                    Preview
                  </p>
                  <code className="mt-2 block break-all text-xs text-slate-700">
                    Authorization: Bearer {"<token>"}
                  </code>
                </div>

                <div className="flex flex-col gap-2 border-t pt-4 sm:flex-row sm:justify-end">
                  <Button variant="outline" className="rounded-md">
                    Reset
                  </Button>
                  <Button className="rounded-md bg-orange-500 hover:bg-orange-600">
                    Save auth template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
