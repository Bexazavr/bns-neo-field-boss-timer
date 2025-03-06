import React, { useState } from "react";
import ChannelContainer from "./components/ChannelContainer"; // Новый компонент
import ActiveChannels from "./components/ActiveChannels";
import HowToUse from "./components/HowToUse";
import "./styles/App.css";

const App = ({ maxChannels = 30 }) => {
	const [channels, setChannels] = useState([]);
	const [hasChannels, setHasChannels] = useState(false);
	const [activeTimers, setActiveTimers] = useState([]);

	const addNewChannel = () => {
		if (channels.length >= maxChannels) {
			alert(`You can't add more than ${maxChannels} channels`);
			return;
		}
		setChannels([...channels, { id: channels.length + 1 }]);
		setHasChannels(true);
	};

	const deleteChannel = (id) => {
		setChannels(channels.filter((channel) => channel.id !== id));
		setActiveTimers(activeTimers.filter((timer) => timer.channelId !== id)); // Удаляем таймеры этого канала
		if (channels.length === 1) {
			setHasChannels(false); // Если удален последний канал, скрываем контейнер
		}
	};

	const addActiveTimer = (channelId, channelName, timerName, duration) => {
		// Удаляем старый таймер для этого канала, если он существует
		setActiveTimers((prevTimers) =>
			prevTimers.filter((timer) => timer.channelId !== channelId)
		);

		const timerId = `${channelId}_${timerName}`;
		const endTime = Date.now() + duration * 1000;

		setActiveTimers((prevTimers) => [
			...prevTimers,
			{ id: timerId, channelId, channelName, timerName, endTime },
		]);
	};

	const removeActiveTimer = (timerId) => {
		setActiveTimers((prevTimers) =>
			prevTimers.filter((timer) => timer.id !== timerId)
		);
	};

	return (
		<div className="app">
			<div className="container-fluid">
				<h1 class="mb-3">BnS Neo Field Boss Timer</h1>
				<ActiveChannels
					activeTimers={activeTimers}
					removeActiveTimer={removeActiveTimer}
				/>

				<ChannelContainer
					hasChannels={hasChannels}
					channels={channels}
					addActiveTimer={addActiveTimer}
					deleteChannel={deleteChannel}
				/>
				<button
					id="add-channel-btn"
					className="btn btn-warning position-fixed bottom-0 end-0 me-3 mb-3 w-auto px-5 py-2 fw-bold border-light fs-4 rounded-4"
					onClick={addNewChannel}
				>
					Add New Timer
				</button>
				<HowToUse hasChannels={hasChannels} />
			</div>
		</div>
	);
};

export default App;
