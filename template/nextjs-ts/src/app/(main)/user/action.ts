"use server";
export interface User {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const fakeDataUrl = `/api/users`;
const dataUrl = `${baseUrl}${fakeDataUrl}`;

export async function fetchUsers(): Promise<User[]> {
  try {
    console.log("fetchUsers");
    const res = await fetch("http://localhost:3000/api/users");

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}

//Server Action
export async function fetchMoreUsers(currentUsers: User[]): Promise<User[]> {
  try {
    console.log("fetchMoreUsers");
    const res = await fetch(dataUrl);

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const results = await res.json();

    return currentUsers.concat(results);
  } catch (e) {
    console.error("Failed to fetch more users:", e);
    return currentUsers;
  }
}
