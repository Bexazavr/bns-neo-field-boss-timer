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
		}, 1000);

		return () => clearInterval(interval);
	}, [activeTimers]);

	// Форматирование времени в MM:SS
	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
	};

	if (activeTimers.length === 0) {
		return null;
	}

	return (
		<div
			id="active-channels"
			className="active-channels mb-3 border border-light border-opacity-25 p-3"
		>
			<h2 className="fs-2 text-center mb-3">Active Channels</h2>
			<div className="row flex-column gap-3 align-items-center p-3">
				{activeTimers.map((timer) => (
					<div
						key={timer.id}
						className="col-12 col-lg-8 col-xxl-4 d-flex justify-content-between align-items-center bg-dark text-light p-3 rounded-3 shadow"
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
								onClick={() => removeActiveTimer(timer.id)}
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
