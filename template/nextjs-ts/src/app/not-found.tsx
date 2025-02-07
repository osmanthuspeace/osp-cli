import Link from "next/link";

export default async function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>您所访问的资源不存在</p>
      <p>Could not find requested resource</p>
      <Link href="/">返回主页</Link>
    </div>
  );
}
