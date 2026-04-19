import { Header } from "./Header";
import { TelegramButton } from "./TelegramButton";
import { useTelegramWebApp } from "@telegram-web-app/react";
import { useEffect, useState } from "react";

function App() {
	const tg = useTelegramWebApp().WebApp;
	const user = tg.initDataUnsafe?.user;

	const [useCustomTheme, setUseCustomTheme] = useState(false);

	const theme = tg.themeParams;

	useEffect(() => {
		tg.ready();
		tg.expand();
	}, [tg]);

	return (
		<div
			style={{
				background: useCustomTheme ? "#0f172a" : theme.bg_color,
				color: useCustomTheme ? "#fff" : theme.text_color,
				minHeight: "100vh",
			}}
		>
			{/* 🧭 HEADER */}
			<Header />

			<div style={{ padding: 20 }}>
				<h1>Hello {user?.first_name}</h1>

				<button onClick={() => setUseCustomTheme((p) => !p)}>
					Switch Theme
				</button>
			</div>

			<TelegramButton text="Close" onClick={() => tg.close()} />
		</div>
	);
}

export default App;
