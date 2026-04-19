import { motion } from "framer-motion";
import { Home, Users, User, Info } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const tabs = [
	{ path: "/", icon: Home, label: "Home" },
	{ path: "/heroes", icon: Users, label: "Heroes" },
	{ path: "/profile", icon: User, label: "Profile" },
	{ path: "/about", icon: Info, label: "About" },
];

export default function BottomNav() {
	const location = useLocation();

	return (
		<motion.div
			initial={{ y: 100 }}
			animate={{ y: 0 }}
			className="fixed z-50 bottom-0 left-0 right-0 bg-[var(--tg-bg)]/80 backdrop-blur-lg border-t border-[var(--tg-secondary-bg)] safe-bottom"
		>
			<div className="flex items-center justify-around px-4 py-2">
				{tabs.map(({ path, icon: Icon, label }) => {
					const isActive = location.pathname === path;

					return (
						<Link to={path}>
							<motion.button
								key={path}
								whileTap={{ scale: 0.9 }}
								className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors"
							>
								<Icon
									size={22}
									className={
										isActive
											? "text-[var(--tg-button)]"
											: "text-[var(--tg-hint)]"
									}
								/>
								<span
									className={`text-xs ${
										isActive
											? "text-[var(--tg-button)]"
											: "text-[var(--tg-hint)]"
									}`}
								>
									{label}
								</span>
							</motion.button>
						</Link>
					);
				})}
			</div>
		</motion.div>
	);
}
