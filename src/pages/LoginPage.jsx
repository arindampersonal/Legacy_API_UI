import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { KeyRound, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage({ onContinue, onOpenAuth }) {
  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-48px)] max-w-6xl grid-cols-1 overflow-hidden rounded-xl border bg-white shadow-sm lg:grid-cols-[1fr_420px]">
        <section className="flex flex-col justify-between border-b bg-slate-50 p-5 sm:p-8 lg:border-b-0 lg:border-r">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Legacy API Integration Studio
                </p>
                <p className="text-xs text-slate-500">Secure workspace access</p>
              </div>
            </div>

            <div className="mt-12 max-w-xl">
              <p className="text-xs font-medium uppercase text-orange-600">
                Sign in
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Access your API workspace
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Continue into a Postman-style request environment for legacy API
                discovery, normalization, and AI-assisted documentation.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {["SSO ready", "Token aware", "Audit friendly"].map((item) => (
              <div key={item} className="rounded-lg border bg-white p-3">
                <p className="text-xs font-medium text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-5 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Login</h2>
              <p className="text-sm text-slate-500">Use your workspace account</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              className="rounded-md text-slate-500"
              onClick={onOpenAuth}
            >
              Auth setup
            </Button>
          </div>

          <Card className="rounded-xl border shadow-none">
            <CardContent className="space-y-4 p-4">
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Mail className="h-4 w-4 text-slate-400" />
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  className="h-10 rounded-md"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <LockKeyhole className="h-4 w-4 text-slate-400" />
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  className="h-10 rounded-md"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                  Keep me signed in
                </label>
                <button type="button" className="font-medium text-blue-600">
                  Forgot password?
                </button>
              </div>

              <Button
                type="button"
                className="h-10 w-full rounded-md bg-orange-500 hover:bg-orange-600"
                onClick={onContinue}
              >
                <KeyRound className="mr-2 h-4 w-4" />
                Sign in
              </Button>
            </CardContent>
          </Card>

          <div className="mt-4 rounded-lg border bg-slate-50 p-3 text-xs leading-5 text-slate-500">
            Authentication is local to this demo UI. Connect your identity
            provider during deployment to enable real session management.
          </div>
        </section>
      </div>
    </div>
  );
}
