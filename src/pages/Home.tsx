import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../app/store";
import HeroCard from "../ui/HeroCard";

export default function Home() {
	const navigate = useNavigate();
	const heroes = useSelector((state: RootState) => state.heroes.filteredList);

	return (
		<div className="page-container">
			{/* Hero Header Section */}
			<header className="content-padding pt-12 pb-8">
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<h1 className="text-4xl font-black tracking-tight">
						Museum
					</h1>
					<p className="text-[var(--tg-hint)] mt-2 text-lg">
						Discover Armenian Legends
					</p>
				</motion.div>
			</header>

			{/* Featured Section */}
			<section className="content-padding">
				<div className="flex justify-between items-end mb-6">
					<h2 className="text-xl font-bold">Greatest Heroes</h2>
					<span className="text-[var(--tg-button)] text-sm font-medium">
						View All
					</span>
				</div>

				<div className="flex flex-col gap-5">
					{" "}
					{/* Increased gap */}
					{heroes.map((hero, index) => (
						<motion.div
							key={hero.id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<HeroCard
								index={index}
								hero={hero}
								onClick={() => navigate(`/hero/${hero.id}`)}
							/>
						</motion.div>
					))}
				</div>
			</section>
		</div>
	);
}
