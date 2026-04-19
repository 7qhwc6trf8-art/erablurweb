import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTelegram } from "../hooks/useTelegram";
import HeroCard from "../ui/HeroCard";
import { useSelector } from "react-redux";
import { type RootState } from "../app/store";
import { Sparkles, TrendingUp, Award } from "lucide-react";
import { type Variants } from "framer-motion";

export const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
}

export default function Home() {
	const navigate = useNavigate();
	const { user } = useTelegram();
	const heroes = useSelector((state: RootState) => state.heroes.filteredList);
	const featuredHeroes = heroes.slice(0, 5);

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="pb-24"
		>
			{/* Hero Welcome Section */}
			<motion.div
				variants={itemVariants}
				className="relative overflow-hidden bg-gradient-to-br from-red-600/20 to-yellow-600/20 mx-4 mt-4 rounded-3xl p-6"
			>
				<motion.div
					animate={{ rotate: 360 }}
					transition={{
						duration: 20,
						repeat: Infinity,
						ease: "linear",
					}}
					className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl"
				/>
				<motion.div
					animate={{ rotate: -360 }}
					transition={{
						duration: 25,
						repeat: Infinity,
						ease: "linear",
					}}
					className="absolute bottom-0 left-0 w-40 h-40 bg-red-500/20 rounded-full blur-2xl"
				/>

				<motion.h1
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ type: "spring", stiffness: 400, damping: 20 }}
					className="text-3xl font-bold text-[var(--tg-text)] mb-2"
				>
					🇦🇲 Heroes Museum
				</motion.h1>

				<motion.p
					initial={{ x: -50, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ delay: 0.2 }}
					className="text-[var(--tg-hint)] mb-4"
				>
					Honoring our national heroes who sacrificed everything
				</motion.p>

				{user && (
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{
							type: "spring",
							stiffness: 500,
							delay: 0.3,
						}}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
					>
						<Sparkles size={14} className="text-yellow-500" />
						<span className="text-sm text-[var(--tg-text)]">
							Welcome back, {user.first_name}! 🕊️
						</span>
					</motion.div>
				)}
			</motion.div>

			{/* Stats Section */}
			<motion.div
				variants={itemVariants}
				className="grid grid-cols-3 gap-3 mx-4 mt-4"
			>
				{[
					{
						icon: Award,
						label: "Heroes",
						value: heroes.length,
						color: "#ef4444",
					},
					{
						icon: TrendingUp,
						label: "Favorites",
						value: 0,
						color: "#10b981",
					},
					{
						icon: Sparkles,
						label: "Years",
						value: "∞",
						color: "#8b5cf6",
					},
				].map((stat, index) => (
					<motion.div
						key={stat.label}
						whileHover={{ y: -5, scale: 1.02 }}
						className="bg-[var(--tg-secondary-bg)] rounded-2xl p-4 text-center"
					>
						<stat.icon
							size={24}
							style={{ color: stat.color, margin: "0 auto 8px" }}
						/>
						<div className="text-2xl font-bold text-[var(--tg-text)]">
							{stat.value}
						</div>
						<div className="text-xs text-[var(--tg-hint)]">
							{stat.label}
						</div>
					</motion.div>
				))}
			</motion.div>

			{/* Featured Heroes Section */}
			<motion.div variants={itemVariants} className="mt-6 px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="flex items-center justify-between mb-4"
				>
					<div>
						<h2 className="text-lg font-semibold text-[var(--tg-text)]">
							Featured Heroes
						</h2>
						<p className="text-xs text-[var(--tg-hint)] mt-0.5">
							Stories of courage and sacrifice
						</p>
					</div>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => navigate("/heroes")}
						className="text-sm text-[var(--tg-button)] font-medium"
					>
						See all →
					</motion.button>
				</motion.div>

				<div className="space-y-3">
					{featuredHeroes.map((hero, index) => (
						<HeroCard
							key={hero.id}
							hero={hero}
							onClick={() => navigate(`/hero/${hero.id}`)}
							index={index}
						/>
					))}
				</div>
			</motion.div>

			{/* Inspirational Quote */}
			<motion.div
				variants={itemVariants}
				className="mx-4 mt-6 p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-center"
			>
				<motion.div
					animate={{ rotate: [0, 5, -5, 0] }}
					transition={{ duration: 4, repeat: Infinity }}
					className="text-4xl mb-3"
				>
					🕯️
				</motion.div>
				<p className="text-sm text-[var(--tg-text)] italic leading-relaxed">
					"A nation that forgets its heroes is a nation that forgets
					itself."
				</p>
				<p className="text-xs text-[var(--tg-hint)] mt-2">
					- Armenian Proverb
				</p>
			</motion.div>
		</motion.div>
	);
}
