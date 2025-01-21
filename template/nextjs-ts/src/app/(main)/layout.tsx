import Layout from "@/component/Layout";
import { Children } from "@/type";

export default function MainLayout({ children }: Children) {
  return (
    <div style={{ height: "100%" }}>
      <Layout direction="row">
        <div className="sider">sider</div>
        <Layout direction="column">
          <header>header</header>
          <main>{children}</main>
          <footer>footer</footer>
        </Layout>
      </Layout>
    </div>
  );
}
