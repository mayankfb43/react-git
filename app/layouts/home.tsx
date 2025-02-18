import { Outlet } from "react-router";
export default function Home() {
  return (
    <div style={{ backgroundColor: "red", padding: "1rem" }}>
      <h1>Home</h1>
      <Outlet />
    </div>
  );
}
