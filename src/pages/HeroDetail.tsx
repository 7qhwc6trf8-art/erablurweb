// src/pages/HeroDetail.tsx
// ULTRA PREMIUM PRO MAX 2026 DESIGN - Fully Animated, Elegant, Professional

import {
	motion,
	useScroll,
	useTransform,
	AnimatePresence,
	type Variants,
} from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../app/store";
import { toggleFavorite } from "../app/features/cart/heroesSlice";
import {
	Heart,
	ArrowLeft,
	Calendar,
	Award,
	Share2,
	Bookmark,
	ChevronRight,
	Sparkles,
	Shield,
	Star,
	Users,
	Flag,
	Clock,
} from "lucide-react";
import { useTelegram } from "../hooks/useTelegram";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

// Animation variants
export const pageVariants: Variants = {
	initial: { opacity: 0 },

	animate: {
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.1, 0.25, 1] as const,
		},
	},

	exit: {
		opacity: 0,
		transition: {
			duration: 0.4,
			ease: [0.25, 0.1, 0.25, 1] as const,
		},
	},
};

export const imageReveal: Variants = {
  initial: { scale: 1.2, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const contentStagger = {
	animate: {
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.3,
		},
	},
};


export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 40, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};


export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const buttonTap = { scale: 0.95 };
export const buttonHover = {
  scale: 1.04,
  transition: {
    type: "spring" as const,
    stiffness: 500,
    damping: 30,
    mass: 0.6,
  },
};

export default function HeroDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { hapticFeedback, tg } = useTelegram();
	const [isLikedAnimating, setIsLikedAnimating] = useState(false);
	const headerRef = useRef<HTMLDivElement>(null);
	const { scrollY } = useScroll();

	const hero = useSelector((state: RootState) =>
		state.heroes.list.find((h) => h.id === Number(id)),
	);

	const isFavorite = useSelector((state: RootState) =>
		state.heroes.favorites.includes(Number(id)),
	);

	// Parallax effect
	const headerOpacity = useTransform(scrollY, [0, 200], [1, 0]);
	const headerScale = useTransform(scrollY, [0, 200], [1, 0.95]);
	const headerBlur = useTransform(scrollY, [0, 200], [0, 8]);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (hero) {
			document.title = `${hero.name} - Heroes Museum`;
		}
	}, [hero]);

	if (!hero) {
		return (
			<motion.div
				variants={pageVariants}
				initial="initial"
				animate="animate"
				exit="exit"
				className="min-h-screen flex items-center justify-center"
			>
				<div className="text-center px-6">
					<motion.div
						animate={{ rotate: 360, scale: [1, 1.1, 1] }}
						transition={{ duration: 3, repeat: Infinity }}
						className="text-6xl mb-6"
					>
						🕯️
					</motion.div>
					<p className="text-[var(--tg-hint)] text-lg mb-4">
						Hero not found
					</p>
					<motion.button
						whileTap={buttonTap}
						whileHover={buttonHover}
						onClick={() => navigate("/")}
						className="tg-button px-8 py-3 rounded-2xl text-base font-medium"
					>
						Return Home
					</motion.button>
				</div>
			</motion.div>
		);
	}

	const handleFavorite = async () => {
		hapticFeedback?.impact("light");
		setIsLikedAnimating(true);
		dispatch(toggleFavorite(hero.id));
		toast.success(
			isFavorite ? "Removed from favorites" : "Added to favorites",
			{ icon: isFavorite ? "💔" : "❤️", duration: 2000 },
		);
		setTimeout(() => setIsLikedAnimating(false), 500);
	};

	const handleShare = async () => {
		hapticFeedback?.impact("light");

		if ((tg as any)?.shareToStory) {
			(tg as any).shareToStory?.();
		}

		toast.success("Hero shared!", { icon: "📤", duration: 2000 });
	};

	return (
		<motion.div
			variants={pageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className="relative min-h-screen pb-32 overflow-x-hidden"
		>
			{/* Animated Background Gradient */}
			<motion.div
				animate={{
					background: [
						"radial-gradient(ellipse at 20% 0%, rgba(239, 68, 68, 0.15), transparent 50%)",
						"radial-gradient(ellipse at 80% 10%, rgba(245, 158, 11, 0.15), transparent 50%)",
						"radial-gradient(ellipse at 40% 5%, rgba(168, 85, 247, 0.15), transparent 50%)",
						"radial-gradient(ellipse at 60% 0%, rgba(59, 130, 246, 0.15), transparent 50%)",
					],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					repeatType: "reverse",
				}}
				className="fixed inset-0 pointer-events-none z-0"
			/>

			{/* Floating Particles */}
			<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
				{[...Array(30)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-red-500 to-yellow-500"
						initial={{
							x: Math.random() * window.innerWidth,
							y: Math.random() * window.innerHeight,
							opacity: 0,
							scale: 0,
						}}
						animate={{
							y: [null, -200, -400],
							x: [
								null,
								Math.random() * 200 - 100,
								Math.random() * 400 - 200,
							],
							opacity: [0, Math.random() * 0.5 + 0.3, 0],
							scale: [0, Math.random() * 2 + 0.5, 0],
						}}
						transition={{
							duration: Math.random() * 8 + 5,
							repeat: Infinity,
							delay: Math.random() * 10,
							ease: "easeOut",
						}}
					/>
				))}
			</div>

			{/* Hero Image Section with Parallax */}
			<motion.div
				ref={headerRef}
				style={{
					opacity: headerOpacity,
					scale: headerScale,
					filter: `blur(${headerBlur}px)`,
				}}
				className="relative h-[65vh] overflow-hidden"
			>
				<motion.div
					variants={imageReveal}
					initial="initial"
					animate="animate"
					className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-600 to-yellow-700"
				>
					{hero.image && (
						<motion.img
							src={hero.image}
							alt={hero.name}
							className="w-full h-full object-cover"
							style={{ objectPosition: "center 30%" }}
							initial={{ scale: 1.1 }}
							animate={{ scale: 1 }}
							transition={{
								duration: 0.8,
								ease: [0.25, 0.1, 0.25, 1],
							}}
						/>
					)}
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
					<div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
				</motion.div>

				{/* Action Buttons */}
				<div className="absolute top-6 left-4 right-4 flex justify-between z-20">
					<motion.button
						whileTap={buttonTap}
						whileHover={buttonHover}
						onClick={() => navigate(-1)}
						className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl"
					>
						<ArrowLeft size={22} className="text-white" />
					</motion.button>

					<div className="flex gap-3">
						<motion.button
							whileTap={buttonTap}
							whileHover={buttonHover}
							onClick={handleShare}
							className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl"
						>
							<Share2 size={20} className="text-white" />
						</motion.button>

						<motion.button
							whileTap={buttonTap}
							whileHover={buttonHover}
							onClick={handleFavorite}
							className="relative w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-xl overflow-hidden"
						>
							<AnimatePresence>
								{isLikedAnimating && (
									<motion.div
										initial={{ scale: 0, opacity: 1 }}
										animate={{ scale: 2, opacity: 0 }}
										exit={{ scale: 0, opacity: 0 }}
										transition={{ duration: 0.5 }}
										className="absolute inset-0 bg-red-500 rounded-2xl"
									/>
								)}
							</AnimatePresence>
							<motion.div
								animate={
									isFavorite ? { scale: [1, 1.2, 1] } : {}
								}
								transition={{ duration: 0.3 }}
							>
								<Heart
									size={20}
									className={
										isFavorite
											? "fill-red-500 stroke-red-500"
											: "stroke-white"
									}
								/>
							</motion.div>
						</motion.button>
					</div>
				</div>

				{/* Hero Title Overlay */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.6 }}
					className="absolute bottom-8 left-6 right-6"
				>
					<motion.div
						animate={{ y: [0, -5, 0] }}
						transition={{ duration: 3, repeat: Infinity }}
						className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3"
					>
						<Sparkles size={12} className="text-yellow-400" />
						<span className="text-xs text-white/90 font-medium">
							National Hero
						</span>
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className="text-4xl font-bold text-white mb-2 tracking-tight"
					>
						{hero.name}
					</motion.h1>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						className="text-white/80 text-base"
					>
						{hero.title}
					</motion.p>
				</motion.div>

				{/* Scroll Indicator */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
					className="absolute bottom-4 left-1/2 -translate-x-1/2"
				>
					<motion.div
						animate={{ y: [0, 8, 0] }}
						transition={{ duration: 1.5, repeat: Infinity }}
						className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center"
					>
						<motion.div
							animate={{ y: [4, 12, 4] }}
							transition={{ duration: 1.5, repeat: Infinity }}
							className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2"
						/>
					</motion.div>
				</motion.div>
			</motion.div>

			{/* Content Section */}
			<motion.div
				variants={contentStagger}
				initial="initial"
				animate="animate"
				className="relative z-10 -mt-6 rounded-t-3xl bg-[var(--tg-bg)]"
			>
				{/* Decorative top curve */}
				<div className="absolute top-0 left-0 right-0 h-6 bg-[var(--tg-bg)] rounded-t-3xl" />

				<div className="px-5 pt-8 pb-12 space-y-8">
					{/* Quick Info Cards */}
					<motion.div
						variants={fadeInUp}
						className="grid grid-cols-3 gap-3"
					>
						{[
							{
								icon: Calendar,
								label: "Born",
								value:
									hero.birthDate?.split(",")[0] || "Unknown",
								color: "#ef4444",
							},
							{
								icon: Flag,
								label: "Legacy",
								value:
									hero.deathDate?.split(",")[0] || "Present",
								color: "#f59e0b",
							},
							{
								icon: Users,
								label: "Role",
								value: hero.title?.split(" ")[0] || "Hero",
								color: "#10b981",
							},
						].map((stat, idx) => (
							<motion.div
								key={idx}
								whileHover={{
									y: -4,
									transition: {
										type: "spring",
										stiffness: 400,
									},
								}}
								className="bg-[var(--tg-secondary-bg)] rounded-2xl p-4 text-center"
							>
								<motion.div
									whileHover={{ scale: 1.1, rotate: 5 }}
									className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
									style={{
										backgroundColor: `${stat.color}20`,
									}}
								>
									<stat.icon
										size={18}
										style={{ color: stat.color }}
									/>
								</motion.div>
								<div className="text-xs text-[var(--tg-hint)] mb-1">
									{stat.label}
								</div>
								<div className="text-sm font-semibold text-[var(--tg-text)] line-clamp-1">
									{stat.value}
								</div>
							</motion.div>
						))}
					</motion.div>

					{/* Biography Section */}
					<motion.div variants={fadeInUp}>
						<div className="flex items-center gap-2 mb-4">
							<motion.div
								whileHover={{ scale: 1.1, rotate: 90 }}
								className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center"
							>
								<Bookmark size={14} className="text-white" />
							</motion.div>
							<h2 className="text-lg font-semibold text-[var(--tg-text)]">
								Biography
							</h2>
							<motion.div
								animate={{ x: [0, 5, 0] }}
								transition={{ duration: 1.5, repeat: Infinity }}
							>
								<ChevronRight
									size={16}
									className="text-[var(--tg-hint)]"
								/>
							</motion.div>
						</div>

						<motion.p
							variants={fadeInUp}
							className="text-[var(--tg-text)] leading-relaxed tracking-wide"
						>
							{hero.description}
						</motion.p>
					</motion.div>

					{/* Life Timeline */}
					{(hero.birthDate || hero.deathDate) && (
						<motion.div variants={fadeInUp}>
							<div className="flex items-center gap-2 mb-4">
								<div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center">
									<Clock
										size={14}
										className="text-indigo-400"
									/>
								</div>
								<h2 className="text-lg font-semibold text-[var(--tg-text)]">
									Life Journey
								</h2>
							</div>

							<div className="relative pl-6 border-l-2 border-indigo-500/30 space-y-6">
								{hero.birthDate && (
									<motion.div
										variants={slideInLeft}
										className="relative"
									>
										<motion.div
											className="absolute -left-[27px] top-0 w-4 h-4 rounded-full bg-indigo-500 shadow-lg"
											animate={{ scale: [1, 1.3, 1] }}
											transition={{
												duration: 2,
												repeat: Infinity,
											}}
										/>
										<div className="text-sm font-medium text-indigo-400 mb-1">
											{hero.birthDate}
										</div>
										<div className="text-sm text-[var(--tg-text)] opacity-80">
											Born into a family of patriots
										</div>
									</motion.div>
								)}

								{hero.deathDate && (
									<motion.div
										variants={slideInLeft}
										className="relative"
									>
										<motion.div
											className="absolute -left-[27px] top-0 w-4 h-4 rounded-full bg-yellow-500 shadow-lg"
											animate={{ scale: [1, 1.3, 1] }}
											transition={{
												duration: 2,
												repeat: Infinity,
												delay: 0.5,
											}}
										/>
										<div className="text-sm font-medium text-yellow-400 mb-1">
											{hero.deathDate}
										</div>
										<div className="text-sm text-[var(--tg-text)] opacity-80">
											Sacrificed for the homeland
										</div>
									</motion.div>
								)}
							</div>
						</motion.div>
					)}

					{/* Achievements Section */}
					{hero.achievements && hero.achievements.length > 0 && (
						<motion.div variants={fadeInUp}>
							<div className="flex items-center gap-2 mb-4">
								<div className="w-8 h-8 rounded-xl bg-yellow-500/20 flex items-center justify-center">
									<Award
										size={14}
										className="text-yellow-500"
									/>
								</div>
								<h2 className="text-lg font-semibold text-[var(--tg-text)]">
									Achievements
								</h2>
							</div>

							<div className="space-y-3">
								{hero.achievements.map((achievement, index) => (
									<motion.div
										key={index}
										custom={index}
										variants={scaleIn}
										whileHover={{
											x: 8,
											transition: {
												type: "spring",
												stiffness: 400,
											},
										}}
										className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--tg-secondary-bg)] border border-white/5"
									>
										<motion.div
											animate={{
												rotate: [0, 360],
											}}
											transition={{
												duration: 0.5,
												delay: index * 0.1,
											}}
											className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0 mt-0.5"
										>
											<Star
												size={12}
												className="text-yellow-500"
											/>
										</motion.div>
										<span className="text-sm text-[var(--tg-text)] leading-relaxed">
											{achievement}
										</span>
									</motion.div>
								))}
							</div>
						</motion.div>
					)}

					{/* Memorial Section */}
					<motion.div variants={fadeInUp}>
						<div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600/20 via-yellow-600/20 to-red-600/20 p-6 text-center">
							<motion.div
								animate={{ scale: [1, 1.05, 1] }}
								transition={{ duration: 4, repeat: Infinity }}
								className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
								style={{ backgroundSize: "200% 100%" }}
							/>

							<motion.div
								animate={{ y: [0, -5, 0] }}
								transition={{ duration: 3, repeat: Infinity }}
								className="text-5xl mb-3"
							>
								🕯️
							</motion.div>

							<p className="text-sm text-[var(--tg-text)] italic leading-relaxed">
								"Their sacrifice echoes through eternity. Their
								courage lights our path forward. We will never
								forget."
							</p>

							<motion.div
								whileHover={{ scale: 1.02 }}
								className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--tg-hint)]"
							>
								<Shield size={12} />
								<span>Eternal Glory to Our Heroes</span>
							</motion.div>
						</div>
					</motion.div>

					{/* Share Footer */}
					<motion.div variants={fadeInUp} className="pt-4">
						<motion.button
							whileTap={buttonTap}
							whileHover={buttonHover}
							onClick={handleShare}
							className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-yellow-500 text-white font-semibold flex items-center justify-center gap-2 shadow-xl"
						>
							<Share2 size={18} />
							Share This Hero
						</motion.button>
					</motion.div>
				</div>
			</motion.div>
		</motion.div>
	);
}
