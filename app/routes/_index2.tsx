import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Smart Token Tool" },
    { name: "description", content: "Welcome to SMT!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      aaa
    </div>
  );
}
