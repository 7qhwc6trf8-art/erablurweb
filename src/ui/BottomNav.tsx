import { Home, Users, User, Info } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const nav = useNavigate();
  const path = useLocation().pathname;

  const items = [
    { icon: Home, to: "/" },
    { icon: Users, to: "/heroes" },
    { icon: User, to: "/profile" },
    { icon: Info, to: "/about" },
  ];

  return (
    <div className="
      fixed bottom-4 left-4 right-4
      bg-black/40 backdrop-blur-xl
      border border-white/10
      rounded-2xl
      flex justify-around
      py-3
      shadow-xl
    ">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => nav(item.to)}
          className={`
            p-2 rounded-xl transition
            ${path === item.to ? "bg-white/10" : ""}
          `}
        >
          <item.icon size={20} />
        </button>
      ))}
    </div>
  );
}