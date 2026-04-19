// src/pages/HeroDetail.tsx
// ULTRA PREMIUM PRO MAX 2026 DESIGN - Fully Animated with Armenian Hero Data Structure

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
	MessageCircle,
	Send,
	MoreVertical,
	ThumbsUp,
	Reply,
	FlagIcon,
} from "lucide-react";
import { useTelegram } from "../hooks/useTelegram";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

interface Reply {
	id: string;
	userId: number;
	userName: string;
	text: string;
	timestamp: string;
	likes: number;
}

interface Comment {
	id: string;
	userId: number;
	userName: string;
	userAvatar?: string;
	text: string;
	timestamp: string;
	likes: number;
	isLiked: boolean;
	replies: Reply[];
}

// ==================== ANIMATION VARIANTS ====================

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

// ==================== UTILITY FUNCTIONS ====================

const sanitizeHtml = (html: string): string => {
	if (!html) return "";
	// Remove HTML tags but keep line breaks
	const text = html.replace(/<[^>]*>/g, " ");
	// Remove duplicate spaces
	return text.replace(/\s+/g, " ").trim();
};

const extractBioParagraphs = (bio: string): string[] => {
	if (!bio) return [];
	const cleanText = sanitizeHtml(bio);
	// Split by periods or new lines
	const sentences = cleanText.split(/[.!?։՞՛]+/);
	return sentences.filter((s) => s.trim().length > 20).slice(0, 8);
};

const extractAchievements = (bio: string): string[] => {
	if (!bio) return [];
	const cleanText = sanitizeHtml(bio);
	const lines = cleanText.split(/[.!?։՞՛]+/);
	// Extract meaningful achievements (lines with certain keywords or length)
	const keywords = ["պայքար", "մարտ", "հերոս", "պարգև", "մեդալ", "շքանշան"];
	const achievements = lines.filter(
		(line) =>
			line.length > 30 &&
			keywords.some((kw) => line.toLowerCase().includes(kw)),
	);
	return achievements.slice(0, 5);
};

// ==================== COMMENT ITEM COMPONENT ====================

interface CommentItemProps {
	comment: Comment;
	onLike: (id: string) => void;
	onReply: (id: string, text: string) => void;
	onReport: (id: string) => void;
	currentUserId: number;
	currentUserName: string;
}

function CommentItem({
	comment,
	onLike,
	onReply,
	onReport,
}: CommentItemProps) {
	const [isReplying, setIsReplying] = useState(false);
	const [replyText, setReplyText] = useState("");
	const [showActions, setShowActions] = useState(false);
	const [showReplies, setShowReplies] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmitReply = () => {
		if (replyText.trim()) {
			onReply(comment.id, replyText);
			setReplyText("");
			setIsReplying(false);
			toast.success("Reply added", { icon: "💬", duration: 1500 });
		}
	};

	return (
		<motion.div
			variants={fadeInUp}
			initial="initial"
			animate="animate"
			className="group"
		>
			<div className="flex gap-3">
				<motion.div
					whileHover={{ scale: 1.05 }}
					className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center shrink-0"
				>
					<span className="text-white text-sm font-medium">
						{comment.userName?.[0] || "U"}
					</span>
				</motion.div>

				<div className="flex-1">
					<div className="bg-[var(--tg-secondary-bg)] rounded-2xl p-3">
						<div className="flex items-center justify-between mb-1">
							<div className="flex items-center gap-2">
								<span className="text-sm font-semibold text-[var(--tg-text)]">
									{comment.userName}
								</span>
								<span className="text-xs text-[var(--tg-hint)]">
									{new Date(
										comment.timestamp,
									).toLocaleDateString()}
								</span>
							</div>

							<div className="relative">
								<motion.button
									whileTap={{ scale: 0.9 }}
									onClick={() => setShowActions(!showActions)}
									className="p-1 rounded-full hover:bg-white/10 transition"
								>
									<MoreVertical
										size={14}
										className="text-[var(--tg-hint)]"
									/>
								</motion.button>

								<AnimatePresence>
									{showActions && (
										<motion.div
											initial={{
												opacity: 0,
												scale: 0.9,
												y: -10,
											}}
											animate={{
												opacity: 1,
												scale: 1,
												y: 0,
											}}
											exit={{
												opacity: 0,
												scale: 0.9,
												y: -10,
											}}
											className="absolute right-0 top-6 bg-[var(--tg-bg)] border border-[var(--tg-secondary-bg)] rounded-xl shadow-xl z-10 min-w-[120px] overflow-hidden"
										>
											<button
												onClick={() => {
													onReport(comment.id);
													setShowActions(false);
												}}
												className="w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-2"
											>
												<FlagIcon size={14} />
												Report
											</button>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</div>

						<p className="text-sm text-[var(--tg-text)] leading-relaxed">
							{comment.text}
						</p>
					</div>

					<div className="flex items-center gap-4 mt-1 ml-2">
						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={() => onLike(comment.id)}
							className="flex items-center gap-1 py-1 px-2 rounded-full hover:bg-white/10 transition"
						>
							<ThumbsUp
								size={12}
								className={
									comment.isLiked
										? "fill-blue-500 stroke-blue-500"
										: "text-[var(--tg-hint)]"
								}
							/>
							<span className="text-xs text-[var(--tg-hint)]">
								{comment.likes > 0 && comment.likes}
							</span>
						</motion.button>

						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={() => {
								setIsReplying(!isReplying);
								setTimeout(
									() => inputRef.current?.focus(),
									100,
								);
							}}
							className="flex items-center gap-1 py-1 px-2 rounded-full hover:bg-white/10 transition"
						>
							<Reply
								size={12}
								className="text-[var(--tg-hint)]"
							/>
							<span className="text-xs text-[var(--tg-hint)]">
								Reply
							</span>
						</motion.button>

						{comment.replies.length > 0 && (
							<motion.button
								whileTap={{ scale: 0.9 }}
								onClick={() => setShowReplies(!showReplies)}
								className="text-xs text-[var(--tg-hint)] hover:text-[var(--tg-button)] transition"
							>
								{showReplies
									? "Hide"
									: `View ${comment.replies.length} repl${comment.replies.length === 1 ? "y" : "ies"}`}
							</motion.button>
						)}
					</div>

					<AnimatePresence>
						{isReplying && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								className="mt-2 flex gap-2"
							>
								<input
									ref={inputRef}
									type="text"
									value={replyText}
									onChange={(e) =>
										setReplyText(e.target.value)
									}
									onKeyPress={(e) =>
										e.key === "Enter" && handleSubmitReply()
									}
									placeholder="Write a reply..."
									className="flex-1 py-2 px-3 rounded-xl bg-[var(--tg-secondary-bg)] text-[var(--tg-text)] text-sm outline-none"
								/>
								<motion.button
									whileTap={{ scale: 0.9 }}
									onClick={handleSubmitReply}
									disabled={!replyText.trim()}
									className="px-4 py-2 rounded-xl bg-[var(--tg-button)] text-[var(--tg-button-text)] text-sm font-medium disabled:opacity-50"
								>
									<Send size={14} />
								</motion.button>
							</motion.div>
						)}
					</AnimatePresence>

					<AnimatePresence>
						{showReplies && comment.replies.length > 0 && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="mt-3 ml-6 space-y-3 border-l-2 border-[var(--tg-secondary-bg)] pl-4"
							>
								{comment.replies.map((reply) => (
									<div key={reply.id} className="flex gap-2">
										<div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center shrink-0">
											<span className="text-white text-xs font-medium">
												{reply.userName?.[0] || "R"}
											</span>
										</div>
										<div className="flex-1">
											<div className="bg-[var(--tg-secondary-bg)] rounded-xl p-2">
												<div className="flex items-center gap-2 mb-1">
													<span className="text-xs font-semibold text-[var(--tg-text)]">
														{reply.userName}
													</span>
													<span className="text-xs text-[var(--tg-hint)]">
														{new Date(
															reply.timestamp,
														).toLocaleDateString()}
													</span>
												</div>
												<p className="text-xs text-[var(--tg-text)]">
													{reply.text}
												</p>
											</div>
										</div>
									</div>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	);
}

// ==================== MAIN COMPONENT ====================

export default function HeroDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { hapticFeedback, tg, user } = useTelegram();
	const [isLikedAnimating, setIsLikedAnimating] = useState(false);
	const [commentText, setCommentText] = useState("");
	const [comments, setComments] = useState<Comment[]>([]);
	const [isLoadingComments, setIsLoadingComments] = useState(true);
	const [bioParagraphs, setBioParagraphs] = useState<string[]>([]);
	const [achievements, setAchievements] = useState<string[]>([]);
	const headerRef = useRef<HTMLDivElement>(null);
	const commentsEndRef = useRef<HTMLDivElement>(null);
	const { scrollY } = useScroll();

	const heroData = useSelector((state: RootState) => {
		console.log(state.heroes.list);
		return state.heroes.list[id];
	});

	const isFavorite = useSelector((state: RootState) =>
		state.heroes.favorites.includes(Number(id)),
	);

	// Process hero data for display
	useEffect(() => {
		if (heroData) {
			// Extract bio paragraphs from HTML
			const paragraphs = extractBioParagraphs(heroData.bio);
			setBioParagraphs(paragraphs);

			// Extract achievements from bio
			const extractedAchievements = extractAchievements(heroData?.bio);
			setAchievements(extractedAchievements);
		}
	}, [heroData]);

	// Parallax effect
	const headerOpacity = useTransform(scrollY, [0, 200], [1, 0]);
	const headerScale = useTransform(scrollY, [0, 200], [1, 0.95]);
	const headerBlur = useTransform(scrollY, [0, 200], [0, 8]);

	// Load comments from localStorage
	useEffect(() => {
		window.scrollTo(0, 0);
		if (heroData) {
			const fullName = `${heroData.name.first} ${heroData.name.last}`;
			document.title = `${fullName} - Heroes Museum`;

			const savedComments = localStorage.getItem(
				`hero_comments_${heroData.name.first}_${heroData.name.last}`,
			);
			if (savedComments) {
				setComments(JSON.parse(savedComments));
			} else {
				const demoComments: Comment[] = [
					{
						id: "1",
						userId: 1001,
						userName: "ArmenianPatriot",
						text: "Հավերժ փառք հերոսին! Նրա զոհաբերությունը երբեք չի մոռացվի: 🇦🇲",
						timestamp: new Date(
							Date.now() - 86400000,
						).toISOString(),
						likes: 24,
						isLiked: false,
						replies: [
							{
								id: "r1",
								userId: 1002,
								userName: "HeroLover",
								text: "Անմահ հերոս!",
								timestamp: new Date(
									Date.now() - 72000000,
								).toISOString(),
								likes: 5,
							},
						],
					},
					{
						id: "2",
						userId: 1003,
						userName: "YerevanSpirit",
						text: "We owe our freedom to heroes like him. Eternal glory!",
						timestamp: new Date(
							Date.now() - 172800000,
						).toISOString(),
						likes: 15,
						isLiked: false,
						replies: [],
					},
				];
				setComments(demoComments);
				localStorage.setItem(
					`hero_comments_${heroData.name.first}_${heroData.name.last}`,
					JSON.stringify(demoComments),
				);
			}
			setIsLoadingComments(false);
		}
	}, [heroData]);

	// Save comments to localStorage
	const saveComments = (newComments: Comment[]) => {
		if (heroData) {
			localStorage.setItem(
				`hero_comments_${heroData.name.first}_${heroData.name.last}`,
				JSON.stringify(newComments),
			);
			setComments(newComments);
		}
	};

	if (!heroData) {
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
						Հերոսը չի գտնվել
					</p>
					<motion.button
						whileTap={buttonTap}
						whileHover={buttonHover}
						onClick={() => navigate("/")}
						className="tg-button px-8 py-3 rounded-2xl text-base font-medium"
					>
						Վերադառնալ
					</motion.button>
				</div>
			</motion.div>
		);
	}

	const fullName = `${heroData.name.first} ${heroData.name.last}`;
	const birthYear = heroData.date.birth;
	const deathYear = heroData.date.dead;

	const handleFavorite = async () => {
		hapticFeedback?.impact("light");
		setIsLikedAnimating(true);
		dispatch(toggleFavorite(heroData.id));
		toast.success(
			isFavorite ? "Removed from favorites" : "Added to favorites",
			{
				icon: isFavorite ? "💔" : "❤️",
				duration: 2000,
			},
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

	const handleAddComment = () => {
		if (!commentText.trim()) return;

		hapticFeedback?.impact("light");

		const newComment: Comment = {
			id: Date.now().toString(),
			userId: user?.id || 0,
			userName: user?.first_name
				? `${user.first_name} ${user.last_name || ""}`.trim()
				: "Anonymous",
			text: commentText.trim(),
			timestamp: new Date().toISOString(),
			likes: 0,
			isLiked: false,
			replies: [],
		};

		const updatedComments = [newComment, ...comments];
		saveComments(updatedComments);
		setCommentText("");

		toast.success("Tribute added!", { icon: "💬", duration: 1500 });
		commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const handleLikeComment = (commentId: string) => {
		hapticFeedback?.impact("light");

		const updatedComments = comments.map((comment) => {
			if (comment.id === commentId) {
				return {
					...comment,
					likes: comment.isLiked
						? comment.likes - 1
						: comment.likes + 1,
					isLiked: !comment.isLiked,
				};
			}
			return comment;
		});

		saveComments(updatedComments);
	};

	const handleReplyToComment = (commentId: string, replyText: string) => {
		const newReply: Reply = {
			id: Date.now().toString(),
			userId: user?.id || 0,
			userName: user?.first_name
				? `${user.first_name} ${user.last_name || ""}`.trim()
				: "Anonymous",
			text: replyText,
			timestamp: new Date().toISOString(),
			likes: 0,
		};

		const updatedComments = comments.map((comment) => {
			if (comment.id === commentId) {
				return {
					...comment,
					replies: [...comment.replies, newReply],
				};
			}
			return comment;
		});

		saveComments(updatedComments);
	};

	const handleReportComment = (commentId: string) => {
		hapticFeedback?.impact("heavy");
		toast.success("Comment reported. Our team will review it.", {
			icon: "🚩",
			duration: 2000,
		});
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
					{heroData.img_url && (
						<motion.img
							src={heroData.img_url}
							alt={fullName}
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
							Ազգային Հերոս
						</span>
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className="text-4xl font-bold text-white mb-2 tracking-tight"
					>
						{fullName}
					</motion.h1>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						className="text-white/80 text-base"
					>
						{heroData.region} • {heroData.war}
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
								label: "Ծնունդ",
								value: birthYear || "Unknown",
								color: "#ef4444",
							},
							{
								icon: Flag,
								label: "Զոհվել",
								value: deathYear || "Unknown",
								color: "#f59e0b",
							},
							{
								icon: Users,
								label: "Մարտ",
								value: heroData.war?.split(" ")[0] || "Հերոս",
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
								Կենսագրություն
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

						<div className="space-y-3">
							{bioParagraphs.map((paragraph, idx) => (
								<motion.p
									key={idx}
									variants={fadeInUp}
									className="text-[var(--tg-text)] leading-relaxed tracking-wide"
								>
									{paragraph}
								</motion.p>
							))}
						</div>
					</motion.div>

					{/* Life Timeline */}
					{(birthYear || deathYear) && (
						<motion.div variants={fadeInUp}>
							<div className="flex items-center gap-2 mb-4">
								<div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center">
									<Clock
										size={14}
										className="text-indigo-400"
									/>
								</div>
								<h2 className="text-lg font-semibold text-[var(--tg-text)]">
									Կյանքի Ուղի
								</h2>
							</div>

							<div className="relative pl-6 border-l-2 border-indigo-500/30 space-y-6">
								{birthYear && (
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
											{birthYear}
										</div>
										<div className="text-sm text-[var(--tg-text)] opacity-80">
											Ծնվել է հայրենիքի համար պայքարելու
											ճակատագրով
										</div>
									</motion.div>
								)}

								{deathYear && (
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
											{deathYear}
										</div>
										<div className="text-sm text-[var(--tg-text)] opacity-80">
											Զոհվեց հայրենիքի համար - անմահ հերոս
										</div>
									</motion.div>
								)}
							</div>
						</motion.div>
					)}

					{/* Achievements Section */}
					{achievements.length > 0 && (
						<motion.div variants={fadeInUp}>
							<div className="flex items-center gap-2 mb-4">
								<div className="w-8 h-8 rounded-xl bg-yellow-500/20 flex items-center justify-center">
									<Award
										size={14}
										className="text-yellow-500"
									/>
								</div>
								<h2 className="text-lg font-semibold text-[var(--tg-text)]">
									Մարտական Ուղի
								</h2>
							</div>

							<div className="space-y-3">
								{achievements.map((achievement, index) => (
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

					{/* Comments Section */}
					<motion.div variants={fadeInUp} className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
									<MessageCircle
										size={14}
										className="text-blue-400"
									/>
								</div>
								<h2 className="text-lg font-semibold text-[var(--tg-text)]">
									Հարգանքի Տուրք
								</h2>
							</div>
							<motion.div
								whileHover={{ scale: 1.05 }}
								className="text-xs text-[var(--tg-hint)]"
							>
								{comments.length} հարգանքի տուրք
							</motion.div>
						</div>

						{/* Comment Input */}
						<motion.div variants={scaleIn} className="flex gap-3">
							<div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-yellow-600 flex items-center justify-center shrink-0">
								<span className="text-white text-sm font-medium">
									{user?.first_name?.[0] || "U"}
								</span>
							</div>
							<div className="flex-1 flex gap-2">
								<input
									type="text"
									value={commentText}
									onChange={(e) =>
										setCommentText(e.target.value)
									}
									onKeyPress={(e) =>
										e.key === "Enter" && handleAddComment()
									}
									placeholder="Միացեք հարգանքի տուրքին..."
									className="flex-1 py-3 px-4 rounded-2xl bg-[var(--tg-secondary-bg)] text-[var(--tg-text)] placeholder:text-[var(--tg-hint)] text-sm outline-none focus:ring-2 focus:ring-[var(--tg-button)] transition"
								/>
								<motion.button
									whileTap={{ scale: 0.95 }}
									whileHover={{ scale: 1.05 }}
									onClick={handleAddComment}
									disabled={!commentText.trim()}
									className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-yellow-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<Send size={18} />
								</motion.button>
							</div>
						</motion.div>

						{/* Comments List */}
						<div className="space-y-5 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
							{isLoadingComments ? (
								<div className="flex justify-center py-8">
									<motion.div
										animate={{ rotate: 360 }}
										transition={{
											duration: 1,
											repeat: Infinity,
										}}
										className="w-6 h-6 border-2 border-[var(--tg-button)] border-t-transparent rounded-full"
									/>
								</div>
							) : comments.length === 0 ? (
								<motion.div
									variants={scaleIn}
									className="text-center py-8 bg-[var(--tg-secondary-bg)] rounded-2xl"
								>
									<motion.div
										animate={{ y: [0, -5, 0] }}
										transition={{
											duration: 2,
											repeat: Infinity,
										}}
										className="text-4xl mb-3"
									>
										💬
									</motion.div>
									<p className="text-sm text-[var(--tg-hint)]">
										Դեռևս հարգանքի տուրք չկա
									</p>
									<p className="text-xs text-[var(--tg-hint)] mt-1">
										Եղեք առաջինը, ով կհարգի այս հերոսին
									</p>
								</motion.div>
							) : (
								comments.map((comment) => (
									<CommentItem
										key={comment.id}
										comment={comment}
										onLike={handleLikeComment}
										onReply={handleReplyToComment}
										onReport={handleReportComment}
										currentUserId={user?.id || 0}
										currentUserName={
											user?.first_name || "Anonymous"
										}
									/>
								))
							)}
							<div ref={commentsEndRef} />
						</div>
					</motion.div>

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
								"Նրանց զոհողությունը հավերժ արձագանքում է
								դարերում: Նրանց քաջությունը լուսավորում է մեր
								ճանապարհը: Մենք երբեք չենք մոռանա:"
							</p>

							<motion.div
								whileHover={{ scale: 1.02 }}
								className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--tg-hint)]"
							>
								<Shield size={12} />
								<span>Հավերժ Փառք Մեր Հերոսներին</span>
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
							Տարածել Հերոսի Մասին
						</motion.button>
					</motion.div>
				</div>
			</motion.div>

			<style>{`
				.custom-scrollbar::-webkit-scrollbar {
					width: 4px;
				}
				.custom-scrollbar::-webkit-scrollbar-track {
					background: var(--tg-secondary-bg);
					border-radius: 10px;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb {
					background: var(--tg-button);
					border-radius: 10px;
				}
			`}</style>
		</motion.div>
	);
}
