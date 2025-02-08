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

const fakeDataUrl = `/api/users`;

export async function fetchUsers(): Promise<User[]> {
  try {
    const res = await fetch(fakeDataUrl);
    console.log("res", res);

    const data = await res.json();
    return data.results;
  } catch (e) {
    console.log(e);
    return [];
  }
}

//Server Action
export async function fetchMoreUsers(currentUsers: User[]): Promise<User[]> {
  const res = await fetch(fakeDataUrl, { cache: "no-store" });
  const { results } = await res.json();
  return currentUsers.concat(results);
}
