import { useState, useEffect } from "react";

export const useChannels = () => {
	const [channels, setChannels] = useState(() => {
		const savedChannels = localStorage.getItem("channels");
		return savedChannels ? JSON.parse(savedChannels) : [];
	});

	const [activeTimers, setActiveTimers] = useState(() => {
		const savedTimers = localStorage.getItem("activeTimers");
		return savedTimers ? JSON.parse(savedTimers) : [];
	});

	// Сохраняем каналы в localStorage при изменении
	useEffect(() => {
		localStorage.setItem("channels", JSON.stringify(channels));
	}, [channels]);

	// Сохраняем активные таймеры в localStorage при изменении
	useEffect(() => {
		localStorage.setItem("activeTimers", JSON.stringify(activeTimers));
	}, [activeTimers]);

	// Добавление нового канала
	const addNewChannel = (channelName) => {
		if (!channelName.trim()) return;

		const newChannel = {
			id: Date.now(),
			name: channelName.trim(),
			timers: [],
		};

		setChannels((prevChannels) => [...prevChannels, newChannel]);
	};

	// Удаление канала
	const deleteChannel = (channelId) => {
		// Удаляем все активные таймеры этого канала
		setActiveTimers((prevTimers) =>
			prevTimers.filter((timer) => timer.channelId !== channelId)
		);

		// Удаляем сам канал
		setChannels((prevChannels) =>
			prevChannels.filter((channel) => channel.id !== channelId)
		);
	};

	// Добавление нового таймера в канал
	const addNewTimer = (channelId, timerName, duration) => {
		if (!timerName.trim() || !duration) return;

		const newTimer = {
			id: Date.now(),
			name: timerName.trim(),
			duration: duration,
		};

		setChannels((prevChannels) =>
			prevChannels.map((channel) =>
				channel.id === channelId
					? {
							...channel,
							timers: [...channel.timers, newTimer],
					  }
					: channel
			)
		);
	};

	// Удаление таймера из канала
	const deleteTimer = (channelId, timerId) => {
		setChannels((prevChannels) =>
			prevChannels.map((channel) =>
				channel.id === channelId
					? {
							...channel,
							timers: channel.timers.filter((timer) => timer.id !== timerId),
					  }
					: channel
			)
		);
	};

	// Добавление таймера в активные
	const addActiveTimer = (channelId, channelName, timerName, duration) => {
		const newTimer = {
			id: Date.now(),
			channelId,
			channelName,
			timerName,
			endTime: Date.now() + duration * 1000,
		};

		setActiveTimers((prevTimers) => [...prevTimers, newTimer]);
	};

	// Удаление таймера из активных
	const removeActiveTimer = (timerId) => {
		setActiveTimers((prevTimers) =>
			prevTimers.filter((timer) => timer.id !== timerId)
		);
	};

	return {
		channels,
		activeTimers,
		addNewChannel,
		deleteChannel,
		addNewTimer,
		deleteTimer,
		addActiveTimer,
		removeActiveTimer,
	};
};
