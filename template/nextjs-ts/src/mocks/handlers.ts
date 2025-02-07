import { http, HttpResponse } from "msw";

interface User {
  id: string | number;
  [key: string]: any;
}

const allUsers = new Map<string | number, User>();

export const handlers = [
  http.get("/api/users", async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET",
    });
    const data = await res.json();
    console.log("data", data);

    return HttpResponse.json(data);
  }),
  http.get("/api/users/:id", async ({ params }) => {
    const { id } = params;
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    console.log("data", data);
    return HttpResponse.json(data);
  }),
  http.post("/api/users", async ({ request }) => {
    const newUser = await request.json() as User;
    allUsers.set(newUser!.id, newUser);
    return HttpResponse.json(newUser, { status: 201 });
  }),
];
