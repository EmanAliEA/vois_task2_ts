// import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import NewPost from "./pages/NewPost";
import AppLayout from "./pages/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/postsApi";
import EditPost from "./pages/EditPost";

const route = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "posts", element: <Posts /> },
      { path: "newPost", element: <NewPost /> },
      { path: ":id", element: <EditPost /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={route} />;
    </QueryClientProvider>
  );
}

export default App;
