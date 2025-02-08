import UserListClient from "@/component/client/UserListClient";
import { fetchUsers } from "./action";

const User = async () => {
  const initialUsers = await fetchUsers();
  return (
    <>
      <UserListClient initialUsers={initialUsers}></UserListClient>
    </>
  );
};
export default User;
