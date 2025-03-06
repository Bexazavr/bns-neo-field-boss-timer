import React, { useEffect, useState } from "react";

const ActiveChannels = ({ activeTimers, removeActiveTimer }) => {
	const [timeLeft, setTimeLeft] = useState(() => {
		const initialTimeLeft = {};
		activeTimers.forEach((timer) => {
			const remaining = Math.max(
				0,
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
					0,
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
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
	};

	const handleRemoveTimer = (timerId) => {
		setRemovingTimer(timerId);
		setTimeout(() => {
			removeActiveTimer(timerId);
		}, 300); // Ждем завершения анимации
	};

	const handleRemoveAll = () => {
		setIsHiding(true);
		setTimeout(() => {
			setIsVisible(false);
		}, 500); // Ждем завершения анимации
	};

	if (activeTimers.length === 0) {
		return null;
	}

	return (
		<div
			id="active-channels"
			className={`active-channels mb-3 border border-light border-opacity-25 p-3 ${
				isVisible ? "show" : ""
			} ${isHiding ? "hide" : ""}`}
		>
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h2 className="fs-2 text-center mb-0">Active Channels</h2>
				<button className="btn btn-danger btn-sm" onClick={handleRemoveAll}>
					Clear All
				</button>
			</div>
			<div className="row flex-column gap-3 align-items-center p-3">
				{activeTimers.map((timer) => (
					<div
						key={timer.id}
						className={`col-12 col-lg-8 col-xxl-4 d-flex justify-content-between align-items-center bg-dark text-light p-3 rounded-3 shadow timer-item ${
							removingTimer === timer.id ? "removing" : ""
						}`}
					>
						<div className="d-flex align-items-center gap-3">
							<h4 className="fs-5 mb-0">
								{timer.channelName} - {timer.timerName}
							</h4>
						</div>
						<div className="d-flex align-items-center gap-3">
							<div
								className="bg-light text-dark p-2 rounded-3 border border-dark"
								style={{ minWidth: "60px", textAlign: "center" }}
							>
								{formatTime(timeLeft[timer.id] || 0)}
							</div>
							<button
								className="btn btn-danger btn-sm"
								onClick={() => handleRemoveTimer(timer.id)}
							>
								&times;
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ActiveChannels;
