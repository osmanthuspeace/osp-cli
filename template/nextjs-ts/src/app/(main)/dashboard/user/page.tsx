
interface DataType {
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
  loading: boolean;
}

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

async function fetchUsers() {
  const res = await fetch(fakeDataUrl, { cache: "no-cache" });
  const data = await res.json();
  return data.results;
}

const User = async () => {
  const initialUsers = await fetchUsers();
  return (
    <>
      <UserClient initialUsers={initialUsers}></UserClient>
    </>
  );
};
export default User;
