import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";

export interface User extends Record<string, string> {
  username: string;
  password: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "登录",
      credentials: {
        username: {
          label: "用户名",
          type: "text",
          placeholder: "请输入用户名",
        },
        password: { label: "密码", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as User;
        if (username === "admin" && password === "admin") {
          return { id: "", name: "admin" };
        }
        // const res = await fetch("/your/endpoint", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const user = await res.json();
        return null;
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
  },
  signIn: "/login",
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
