import { http, HttpResponse } from "msw";

interface User {
  id: string | number;
  [key: string]: any;
}

const allUsers = new Map<string | number, User>();

export const handlers = [
  http.get("http://localhost:3000/api/users", async () => {
    console.log("拦截请求/api/users!!!");

    // const res = await fetch(
    //   "https://randomuser.me/api/?results=3&inc=name,gender,email,nat,picture&noinfo"
    // );

    const results = [
      {
        gender: "male",
        name: { title: "Mr", first: "Yuliy", last: "Karpinec" },
        email: "yuliy.karpinec@example.com",
        picture: {
          large: "https://randomuser.me/api/portraits/men/36.jpg",
          medium: "https://randomuser.me/api/portraits/med/men/36.jpg",
          thumbnail: "https://randomuser.me/api/portraits/thumb/men/36.jpg",
        },
        nat: "UA",
      },
      {
        gender: "male",
        name: { title: "Mr", first: "Filipe de Néri", last: "Rezende" },
        email: "filipedeneri.rezende@example.com",
        picture: {
          large: "https://randomuser.me/api/portraits/men/58.jpg",
          medium: "https://randomuser.me/api/portraits/med/men/58.jpg",
          thumbnail: "https://randomuser.me/api/portraits/thumb/men/58.jpg",
        },
        nat: "BR",
      },
      {
        gender: "male",
        name: { title: "Mr", first: "Ismail", last: "Thum" },
        email: "ismail.thum@example.com",
        picture: {
          large: "https://randomuser.me/api/portraits/men/80.jpg",
          medium: "https://randomuser.me/api/portraits/med/men/80.jpg",
          thumbnail: "https://randomuser.me/api/portraits/thumb/men/80.jpg",
        },
        nat: "DE",
      },
    ];

    return HttpResponse.json(results);
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
    const newUser = (await request.json()) as User;
    allUsers.set(newUser!.id, newUser);
    return HttpResponse.json(newUser, { status: 201 });
  }),
];
