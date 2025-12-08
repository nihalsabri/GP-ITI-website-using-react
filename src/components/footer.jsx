import { useSelector } from "react-redux";

export default function Footer() {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <footer
      className={`${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-gray-200 text-gray-900"
      }  p-4 mt-8 flex justify-center items-center`}
    >
      <p className="text-2xl font-bold mb-2">
        © 2024 My Website. All rights reserved.
      </p>
    </footer>
  );
}
