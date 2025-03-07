import React, { useEffect, useState } from "react";

const ActiveChannels = ({ activeTimers, removeActiveTimer }) => {
	const [timeLeft, setTimeLeft] = useState(() => {
		const initialTimeLeft = {};
		activeTimers.forEach((timer) => {
			const remaining = Math.max(
				-60, // Минимальное значение -1 минута
				Math.floor((timer.endTime - Date.now()) / 1000)
			);
			initialTimeLeft[timer.id] = remaining;
		});
		return initialTimeLeft;
	});

	const [removingTimer, setRemovingTimer] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const [isHiding, setIsHiding] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			const newTimeLeft = {};
			activeTimers.forEach((timer) => {
				const remaining = Math.max(
					-60, // Минимальное значение -1 минута
					Math.floor((timer.endTime - Date.now()) / 1000)
				);
				newTimeLeft[timer.id] = remaining;
			});
			setTimeLeft(newTimeLeft);
		}, 10);

		return () => clearInterval(interval);
	}, [activeTimers]);

	// Анимация появления
	useEffect(() => {
		if (activeTimers.length > 0) {
			setIsHiding(false);
			const timer = setTimeout(() => {
				setIsVisible(true);
			}, 50);
			return () => clearTimeout(timer);
		}
	}, [activeTimers.length]);

	// Форматирование времени в MM:SS
	const formatTime = (seconds) => {
		const isNegative = seconds < 0;
		const absSeconds = Math.abs(seconds);
		const minutes = Math.floor(absSeconds / 60);
		const secs = absSeconds % 60;
		return `${isNegative ? "-" : ""}${minutes}:${
			secs < 10 ? `0${secs}` : secs
		}`;
	};

	// Получение сообщения о респавне
	const getRespawnMessage = (seconds) => {
		const absSeconds = Math.abs(seconds);

		switch (true) {
			case seconds > 15:
				return {
					text: null,
					seconds: seconds,
					suffix: "s",
				};
			case seconds > 0:
				return {
					text: null,
					seconds: seconds,
					suffix: "s",
				};
			case seconds > -60 && seconds <= 0:
				return {
					text: null,
					seconds: `-${absSeconds}`,
					suffix: "s",
				};
			default:
				return {
					text: "Boss was probably killed",
					seconds: null,
					suffix: null,
				};
		}
	};

	// Получение цвета сообщения в зависимости от времени
	const getMessageColor = (seconds) => {
		if (seconds > 15) return "success"; // Зеленый
		if (seconds > 0) return "warning"; // Желтый
		return "danger"; // Красный
	};

	const handleRemoveTimer = (timerId) => {
		setRemovingTimer(timerId);
		setTimeout(() => {
			removeActiveTimer(timerId);
		}, 300); // Ждем завершения анимации
	};

	const handleRemoveAll = () => {
		setIsHiding(true);
		// Удаляем все таймеры с небольшой задержкой для анимации
		setTimeout(() => {
			activeTimers.forEach((timer) => {
				removeActiveTimer(timer.id);
			});
			setIsVisible(false);
		}, 250); // Ждем завершения анимации
	};

	if (activeTimers.length === 0) {
		return null;
	}

	// Сортируем таймеры по оставшемуся времени
	const sortedTimers = [...activeTimers].sort((a, b) => {
		const timeA = timeLeft[a.id] || 0;
		const timeB = timeLeft[b.id] || 0;
		return timeA - timeB;
	});

	return (
		<div
			id="active-channels"
			className={`active-channels mb-3 border border-light border-opacity-25 p-3 rounded-3 position-relative ${
				isVisible ? "show" : ""
			} ${isHiding ? "hide" : ""}`}
		>
			<h2 className="fs-2 text-center mb-4">Active Channels</h2>
			<div className="row flex-column gap-3 align-items-center p-3">
				{sortedTimers.map((timer) => {
					const message = getRespawnMessage(timeLeft[timer.id]);

					return (
						<div
							key={timer.id}
							className={`col-12 col-lg-8 col-xxl-4 d-flex justify-content-between align-items-center bg-dark text-light p-3 rounded-3 shadow timer-item position-relative ${
								removingTimer === timer.id ? "removing" : ""
							}`}
						>
							<button
								className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle"
								style={{
									width: "16px",
									height: "16px",
									padding: "0",
									lineHeight: "1",
									transform: "translate(20%, -20%)",
									zIndex: "1",
								}}
								onClick={() => handleRemoveTimer(timer.id)}
							>
								&times;
							</button>
							<div className="d-flex justify-content-between align-items-center gap-3 flex-grow-1">
								<h4 className="fs-5 mb-0">{timer.channelName}</h4>
								<span
									className={`text-${getMessageColor(timeLeft[timer.id])} fs-4`}
								>
									{message.text}{" "}
									<span
										className={`badge text-bg-${getMessageColor(
											timeLeft[timer.id]
										)} text-light fs-4 ms-1`}
									>
										{message.seconds}
										{message.suffix}
									</span>
								</span>
							</div>
						</div>
					);
				})}
			</div>
			<button
				className="btn btn-danger position-absolute bottom-0 end-0 m-3"
				onClick={handleRemoveAll}
			>
				Clear All
			</button>
		</div>
	);
};

export default ActiveChannels;
