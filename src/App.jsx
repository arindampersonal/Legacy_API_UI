import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { apiCollectionPages } from "@/pages";
import AuthenticationPage from "@/pages/AuthenticationPage";
import LoginPage from "@/pages/LoginPage";
import { Box, ChevronDown, ChevronRight, Clock, Database, Eye, FileCode, Home, MoreHorizontal, PanelTop, Plus, RotateCcw, Search, Send, ShieldCheck, Sparkles, Star, Trash2, Users } from "lucide-react";

const headerOptions = [
  {
    key: "Content-Type",
    description:
      "Specifies the media type of the resource so the server knows how to process the request body.",
    placeholder: "application/json",
  },
  {
    key: "Authorization",
    description:
      "Carries credentials for authenticating the client with the server.",
    placeholder: "Bearer <token>",
  },
  {
    key: "Accept",
    description:
      "Informs the server which content types the client can understand in the response.",
    placeholder: "application/json",
  },
  {
    key: "User-Agent",
    description:
      "Identifies the client software making the request.",
    placeholder: "PostmanRuntime/7.43.0",
  },
  {
    key: "Cache-Control",
    description:
      "Directs how caching should be handled by clients, proxies, or servers.",
    placeholder: "no-cache",
  },
  {
    key: "Host",
    description:
      "Specifies the server domain name and TCP port number.",
    placeholder: "api.example.com",
  },
  {
    key: "x-api-key",
    description:
      "Provides an API key for APIs that use key-based authentication.",
    placeholder: "<api-key>",
  },
];

const createHeaderRow = (id, option = headerOptions[0]) => ({
  id,
  key: option.key,
  value: "",
  description: option.description,
});

const bodyTypeOptions = [
  "none",
  "form-data",
  "x-www-form-urlencoded",
  "raw",
  "binary",
  "GraphQL",
];

const methodOptions = ["GET", "POST", "PUT", "DELETE"];

const initialRequests = [
  {
    id: 1,
    method: "GET",
    name: "Get data",
    endpoint: "/employee/details",
  },
  {
    id: 2,
    method: "POST",
    name: "login",
    endpoint: "/auth/login",
  },
  {
    id: 3,
    method: "GET",
    name: "refresh",
    endpoint: "/auth/refresh",
  },
  {
    id: 4,
    method: "GET",
    name: "user info",
    endpoint: "/employee/details",
  },
  {
    id: 5,
    method: "GET",
    name: "New Request",
    endpoint: "/employee/details",
  },
];

export default function LegacyApiDashboard() {
  const [currentView, setCurrentView] = useState("login");
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequestId, setSelectedRequestId] = useState(4);
  const [method, setMethod] = useState("GET");
  const [bodyType, setBodyType] = useState("none");
  const [headers, setHeaders] = useState([
    createHeaderRow(1, headerOptions[0]),
    createHeaderRow(2, headerOptions[1]),
  ]);

  const updateHeader = (id, field, value) => {
    setHeaders((currentHeaders) =>
      currentHeaders.map((header) =>
        header.id === id ? { ...header, [field]: value } : header
      )
    );
  };

  const updateHeaderKey = (id, key) => {
    const selectedOption = headerOptions.find((option) => option.key === key);

    setHeaders((currentHeaders) =>
      currentHeaders.map((header) =>
        header.id === id
          ? {
              ...header,
              key,
              description: selectedOption?.description ?? header.description,
            }
          : header
      )
    );
  };

  const addHeader = () => {
    setHeaders((currentHeaders) => [
      ...currentHeaders,
      createHeaderRow(Date.now(), headerOptions[0]),
    ]);
  };

  const removeHeader = (id) => {
    setHeaders((currentHeaders) =>
      currentHeaders.length === 1
        ? currentHeaders
        : currentHeaders.filter((header) => header.id !== id)
    );
  };

  const selectedCollection =
    apiCollectionPages.find((collection) => collection.id === "legacy-hrms") ??
    apiCollectionPages[0];
  const selectedRequest =
    requests.find((request) => request.id === selectedRequestId) ?? requests[0];

  const selectRequest = (request) => {
    setSelectedRequestId(request.id);
    setMethod(request.method);
  };

  const addRequest = () => {
    const newRequest = {
      id: Date.now(),
      method: "GET",
      name: "New Request",
      endpoint: selectedCollection.endpoint,
    };

    setRequests((currentRequests) => [...currentRequests, newRequest]);
    setSelectedRequestId(newRequest.id);
    setMethod(newRequest.method);
  };

  const deleteRequest = (requestId) => {
    setRequests((currentRequests) => {
      if (currentRequests.length === 1) {
        return currentRequests;
      }

      const nextRequests = currentRequests.filter(
        (request) => request.id !== requestId
      );

      if (selectedRequestId === requestId) {
        const nextSelectedRequest = nextRequests[0];
        setSelectedRequestId(nextSelectedRequest.id);
        setMethod(nextSelectedRequest.method);
      }

      return nextRequests;
    });
  };

  if (currentView === "login") {
    return (
      <LoginPage
        onContinue={() => setCurrentView("studio")}
        onOpenAuth={() => setCurrentView("auth")}
      />
    );
  }

  if (currentView === "auth") {
    return <AuthenticationPage onBack={() => setCurrentView("studio")} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 lg:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Legacy API Integration Studio
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              AI-powered code comment generation for undocumented legacy APIs
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
            <Button
              variant="outline"
              className="w-full rounded-xl sm:w-auto"
              onClick={() => setCurrentView("auth")}
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Authentication
            </Button>
            <Button variant="outline" className="w-full rounded-xl sm:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Discover APIs
            </Button>
            <Button className="w-full rounded-xl sm:w-auto">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Comments
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          {/* Sidebar */}
          <aside className="overflow-hidden rounded-xl border bg-white shadow-sm lg:col-span-3">
            <div className="flex h-11 items-center gap-2 border-b px-3 text-sm">
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
                aria-label="Home"
              >
                <Home className="h-4 w-4" />
              </button>
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <Users className="h-4 w-4 text-slate-500" />
                <span className="truncate font-medium">Arindam's Workspace</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div className="flex h-11 items-center justify-center gap-5 border-b bg-slate-50">
              <button
                type="button"
                className="flex h-8 w-10 items-center justify-center rounded-md bg-white text-slate-700 shadow-sm"
                aria-label="Collections"
              >
                <Box className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-8 w-10 items-center justify-center rounded-md text-slate-500 hover:bg-white"
                aria-label="Environments"
              >
                <PanelTop className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-8 w-10 items-center justify-center rounded-md text-slate-500 hover:bg-white"
                aria-label="History"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            <div className="p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-md border bg-white px-2 text-slate-400">
                  <Search className="h-4 w-4" />
                  <span className="truncate text-xs">Filter collections</span>
                </div>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
                  onClick={addRequest}
                  aria-label="Add request"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
                  aria-label="More collection actions"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center gap-1 text-[11px] font-semibold uppercase text-slate-900">
                  <ChevronDown className="h-3.5 w-3.5" />
                  Collections
                </div>

                <div className="rounded-md bg-slate-100">
                  <div className="flex h-8 items-center gap-2 rounded-md px-2">
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">
                      My Collection
                    </span>
                    <button
                      type="button"
                      className="flex h-6 w-6 items-center justify-center rounded text-slate-500 hover:bg-white"
                      onClick={addRequest}
                      aria-label="Add request to My Collection"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="flex h-6 w-6 items-center justify-center rounded text-slate-500 hover:bg-white"
                      aria-label="Favorite collection"
                    >
                      <Star className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="flex h-6 w-6 items-center justify-center rounded text-slate-500 hover:bg-white"
                      aria-label="More options"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="border-l border-slate-200 bg-white py-1 pl-5">
                    {requests.map((request) => (
                      <button
                        key={request.id}
                        type="button"
                        onClick={() => selectRequest(request)}
                        className={`group/request flex h-8 w-full items-center gap-2 rounded-md px-3 text-left text-sm transition ${
                          selectedRequest.id === request.id
                            ? "bg-slate-200 text-slate-950"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span
                          className={`w-9 shrink-0 text-[10px] font-semibold ${
                            request.method === "POST"
                              ? "text-orange-500"
                              : "text-emerald-600"
                          }`}
                        >
                          {request.method}
                        </span>
                        <span className="min-w-0 flex-1 truncate">
                          {request.name}
                        </span>
                        <span
                          role="button"
                          tabIndex={0}
                          aria-label={`Delete ${request.name}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            deleteRequest(request.id);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              event.stopPropagation();
                              deleteRequest(request.id);
                            }
                          }}
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-slate-400 transition hover:bg-white hover:text-red-500 focus:bg-white focus:text-red-500 focus:outline-none ${
                            requests.length === 1
                              ? "pointer-events-none opacity-30"
                              : "opacity-0 group-hover/request:opacity-100 group-focus/request:opacity-100"
                          }`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-36 divide-y border-t text-xs font-semibold uppercase text-slate-800">
                {["Environments", "Specs", "Flows"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="flex h-9 w-full items-center gap-2 text-left"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Workspace */}
          <div className="space-y-4 lg:col-span-9 lg:space-y-6">
            {/* Request Builder */}
            <Card className="rounded-xl shadow-sm border">
              <CardContent className="p-3 space-y-3 sm:p-4">
                <div className="flex flex-col gap-3 border-b pb-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs text-slate-500">
                      My Collection
                    </p>
                    <h2 className="text-sm font-semibold">
                      {selectedRequest.name}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 rounded-md text-slate-500">
                      Save
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 rounded-md">
                      Share
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <select
                    value={method}
                    onChange={(event) => setMethod(event.target.value)}
                    className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-emerald-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:w-24"
                    aria-label="HTTP method"
                  >
                    {methodOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <Input
                    placeholder={selectedRequest.endpoint}
                    className="h-10 min-w-0 rounded-md border-slate-300"
                  />

                  <Button className="h-10 w-full rounded-md bg-blue-600 px-7 hover:bg-blue-700 sm:w-auto">
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>

                <Tabs defaultValue="headers" className="w-full flex-col gap-0">
                  <div className="flex flex-col gap-2 border-b sm:flex-row sm:items-center sm:justify-between">
                    <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-none bg-transparent p-0 pb-px sm:h-10">
                    <TabsTrigger value="docs" className="h-10 flex-none rounded-none border-b-2 border-transparent px-3 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                      Docs
                    </TabsTrigger>
                    <TabsTrigger value="params" className="h-10 flex-none rounded-none border-b-2 border-transparent px-3 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                      Params
                    </TabsTrigger>
                    <TabsTrigger value="auth" className="h-10 flex-none rounded-none border-b-2 border-transparent px-3 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                      Authorization
                    </TabsTrigger>
                    <TabsTrigger value="headers" className="h-10 flex-none rounded-none border-b-2 border-transparent px-3 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                      Headers
                      <span className="ml-1 rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600">
                        {headers.length}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="body" className="h-10 flex-none rounded-none border-b-2 border-transparent px-3 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                      Body
                    </TabsTrigger>
                    <TabsTrigger value="scripts" className="h-10 flex-none rounded-none border-b-2 border-transparent px-3 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                      Scripts
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="h-10 flex-none rounded-none border-b-2 border-transparent px-3 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                      Settings
                    </TabsTrigger>
                    </TabsList>
                    <button className="self-start text-xs font-medium text-blue-600 sm:self-auto" type="button">
                      Cookies
                    </button>
                  </div>

                  <TabsContent value="headers" className="mt-4">
                    <div className="space-y-2">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium">Headers</h3>
                          <Badge variant="secondary" className="gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-100">
                            <Eye className="h-3 w-3" />
                            7 hidden
                          </Badge>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 rounded-md text-slate-500"
                          onClick={addHeader}
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          Header
                        </Button>
                      </div>

                      <div className="overflow-x-auto rounded-none border bg-white">
                        <div className="min-w-[720px]">
                        <div className="grid grid-cols-[36%_31%_1fr_96px] border-b text-sm text-slate-600">
                          <div className="border-r px-3 py-2 text-center">Key</div>
                          <div className="border-r px-3 py-2">Value</div>
                          <div className="border-r px-3 py-2">Description</div>
                          <div className="flex items-center justify-center gap-2 px-3 py-2 text-xs">
                            <span>Presets</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </div>
                        </div>

                        {headers.map((header) => {
                          const selectedHeader = headerOptions.find(
                            (option) => option.key === header.key
                          );

                          return (
                            <div
                              key={header.id}
                              className="group grid grid-cols-[36%_31%_1fr_96px] border-b last:border-b-0"
                            >
                              <div className="border-r">
                                <select
                                  value={header.key}
                                  onChange={(event) =>
                                    updateHeaderKey(header.id, event.target.value)
                                  }
                                  className="h-9 w-full bg-white px-12 text-sm text-slate-700 outline-none focus:bg-blue-50"
                                  aria-label="Header key"
                                >
                                  {headerOptions.map((option) => (
                                    <option key={option.key} value={option.key}>
                                      {option.key}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="border-r">
                                <input
                                  value={header.value}
                                  onChange={(event) =>
                                    updateHeader(
                                      header.id,
                                      "value",
                                      event.target.value
                                    )
                                  }
                                  placeholder={selectedHeader?.placeholder ?? "Value"}
                                  className="h-9 w-full px-3 text-sm outline-none placeholder:text-slate-400 focus:bg-blue-50"
                                />
                              </div>

                              <div className="border-r">
                                <input
                                  value={header.description}
                                  onChange={(event) =>
                                    updateHeader(
                                      header.id,
                                      "description",
                                      event.target.value
                                    )
                                  }
                                  placeholder="Description"
                                  className="h-9 w-full px-3 text-sm outline-none placeholder:text-slate-400 focus:bg-blue-50"
                                />
                              </div>

                              <div className="flex items-center justify-center px-2">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 rounded-md text-slate-400 opacity-0 transition group-hover:opacity-100"
                                  onClick={() => removeHeader(header.id)}
                                  disabled={headers.length === 1}
                                  aria-label="Remove header"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="docs" className="mt-4">
                    <Textarea
                      placeholder="Request documentation..."
                      className="rounded-md min-h-[120px]"
                    />
                  </TabsContent>

                  <TabsContent value="params" className="mt-4">
                    <Textarea
                      placeholder="Query parameters..."
                      className="rounded-md min-h-[120px]"
                    />
                  </TabsContent>

                  <TabsContent value="body" className="mt-4">
                    <div className="min-h-[148px] space-y-3">
                        <select
                        value={bodyType}
                        onChange={(event) => setBodyType(event.target.value)}
                        className="h-8 w-full rounded-md border border-slate-200 bg-slate-100 px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:w-44"
                        aria-label="Body type"
                      >
                        {bodyTypeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      {bodyType === "none" ? (
                        <div className="flex min-h-[92px] items-center justify-center border-t text-sm text-slate-400">
                          This request does not have a body
                        </div>
                      ) : bodyType === "raw" || bodyType === "GraphQL" ? (
                        <Textarea
                          placeholder={
                            bodyType === "GraphQL"
                              ? "Enter GraphQL query..."
                              : "Raw request body..."
                          }
                          className="rounded-md min-h-[120px] font-mono text-sm"
                        />
                      ) : bodyType === "binary" ? (
                        <div className="flex min-h-[92px] items-center justify-center rounded-md border border-dashed text-sm text-slate-400">
                          Select a binary file for this request body
                        </div>
                      ) : (
                        <div className="overflow-x-auto border bg-white">
                          <div className="min-w-[420px]">
                          <div className="grid grid-cols-2 border-b text-sm text-slate-600">
                            <div className="border-r px-3 py-2">Key</div>
                            <div className="px-3 py-2">Value</div>
                          </div>
                          <div className="grid grid-cols-2">
                            <input
                              placeholder="Key"
                              className="h-9 border-r px-3 text-sm outline-none placeholder:text-slate-400 focus:bg-blue-50"
                            />
                            <input
                              placeholder="Value"
                              className="h-9 px-3 text-sm outline-none placeholder:text-slate-400 focus:bg-blue-50"
                            />
                          </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="auth" className="mt-4">
                    <div className="space-y-3">
                      <Badge className="rounded-lg px-3 py-1">
                        Adaptive Authentication Enabled
                      </Badge>
                      <Textarea
                        placeholder="Custom legacy authentication rules..."
                        className="rounded-md min-h-[120px]"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="scripts" className="mt-4">
                    <Textarea
                      placeholder="Pre-request or post-response scripts..."
                      className="rounded-md min-h-[120px]"
                    />
                  </TabsContent>

                  <TabsContent value="settings" className="mt-4">
                    <Textarea
                      placeholder="Request settings..."
                      className="rounded-md min-h-[120px]"
                    />
                  </TabsContent>
                </Tabs>

                <div className="flex h-9 items-center gap-5 overflow-x-auto border-t text-sm">
                  <button
                    type="button"
                    className="font-semibold text-slate-900"
                  >
                    Response
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-slate-500"
                  >
                    <Clock className="h-4 w-4" />
                    History
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Response + AI Output */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
              <Card className="rounded-2xl shadow-sm border">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Database className="w-5 h-5" />
                    <h2 className="font-semibold">Normalized API Response</h2>
                  </div>

                  <Textarea
                    className="rounded-xl min-h-[280px] font-mono text-sm"
                    value={`{
  "status": "success",
  "normalized_payload": {
    "collection": "${selectedCollection.name}",
    "endpoint": "${selectedCollection.endpoint}",
    "response_type": "${selectedCollection.responseType}",
    "mapped_fields": ${JSON.stringify(selectedCollection.mappedFields, null, 4)}
  }
}`}
                    readOnly
                  />
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm border">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <FileCode className="w-5 h-5" />
                    <h2 className="font-semibold">AI Generated Code Comments</h2>
                  </div>

                  <Textarea
                    className="rounded-xl min-h-[280px] font-mono text-sm"
                    value={`/**
 * Handles ${selectedCollection.name.toLowerCase()} through the legacy integration layer.
 * Normalizes ${selectedCollection.responseType.toLowerCase()} for downstream consumers.
 * Documents authentication, mapping, and compatibility behavior.
 * Primary endpoint: ${selectedCollection.method} ${selectedCollection.endpoint}
 */`}
                    readOnly
                  />
                </CardContent>
              </Card>
            </div>

            {/* Bottom Insights */}
            <Card className="rounded-2xl shadow-sm border">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5" />
                  <h2 className="font-semibold">System Insights</h2>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
                  {selectedCollection.insights.map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border bg-white text-sm font-medium"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
