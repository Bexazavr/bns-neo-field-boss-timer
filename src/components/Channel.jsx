import React, { useState, useEffect } from "react";

const Channel = ({ id, addActiveTimer, deleteChannel }) => {
	const fixedPart = "Channel "; // Фиксированная часть названия
	const [channelName, setChannelName] = useState(`${fixedPart}${id}`); // Начальное название
	const [isEditing, setIsEditing] = useState(false); // Режим редактирования
	const [editablePart, setEditablePart] = useState(id.toString()); // Изменяемая часть названия
	const [isVisible, setIsVisible] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 50);

		return () => clearTimeout(timer);
	}, []);

	// Обработчик изменения изменяемой части названия
	const handleNameChange = (e) => {
		setEditablePart(e.target.value);
	};

	// Сохранение нового названия по нажатию Enter
	const handleSaveName = (e) => {
		if (e.key === "Enter") {
			// Проверяем, что поле не пустое
			if (editablePart.trim() === "") {
				// Если пустое, не обновляем название и не выходим из режима редактирования
				return;
			}

			// Объединяем фиксированную и изменяемую части
			setChannelName(`${fixedPart}${editablePart}`);
			setIsEditing(false);
		}
	};

	const handleDelete = () => {
		setIsDeleting(true);
		// Ждем завершения анимации перед удалением
		setTimeout(() => {
			deleteChannel(id);
		}, 300);
	};

	const handleStartTimer = (duration, timerName) => {
		addActiveTimer(id, channelName, timerName, duration); // Передаем channelName
	};

	return (
		<div
			id={`${channelName.replace(/\s+/g, "-").toLowerCase()}`} // Уникальный id на основе полного названия
			className={`col-12 col-lg-4 col-xxl-2 shadow p-4 border border-light border-opacity-25 text-center rounded-3 channel-section ${
				isVisible ? "show" : ""
			} ${isDeleting ? "deleting" : ""}`}
			style={{
				transition: "all 0.1s ease-in-out",
				transform: isDeleting
					? "scale(0.8) translateY(30px)"
					: "scale(1) translateY(0)",
				opacity: isDeleting ? 0 : 1,
			}}
		>
			<div className="channel-header">
				{isEditing ? (
					<div className="mb-3">
						<label htmlFor="editablePart" className="form-label">
							Enter your channel number
						</label>
						<div className="input-group">
							<span
								className={`input-group-text fw-bold`}
								style={{ backgroundColor: "#ff6f00" }}
							>
								{fixedPart}
							</span>
							<input
								type="number"
								value={editablePart}
								onChange={handleNameChange}
								onKeyDown={handleSaveName}
								className="form-control"
								id="editablePart"
								placeholder="Enter a number" // Подсказка для пользователя
								autoFocus
							/>
						</div>
						{editablePart.trim() === "" && ( // Сообщение об ошибке, если поле пустое
							<small className="text-danger">This field is required</small>
						)}
					</div>
				) : (
					<h3
						onClick={() => setIsEditing(true)}
						style={{ cursor: "pointer" }}
						className={`text-truncate mb-3`}
					>
						{channelName}
					</h3>
				)}
			</div>
			<div className="button-timer-container">
			{/* <button
					className="btn btn-warning w-100 p-1 mb-3 fs-5 fw-bold rounded-3"
					onClick={() => handleStartTimer(-55, "Test (-55 sec)")}
				>
					Test (-55 sec)
				</button>
				<button
					className="btn btn-warning w-100 p-1 mb-3 fs-5 fw-bold rounded-3"
					onClick={() => handleStartTimer(5, "Test (5 sec)")}
				>
					Test (5 sec)
				</button>
				<button
					className="btn btn-warning w-100 p-1 mb-3 fs-5 fw-bold rounded-3"
					onClick={() => handleStartTimer(25, "Test (25 sec)")}
				>
					Test (25 sec)
				</button>
				<button
					className="btn btn-warning w-100 p-1 mb-3 fs-5 fw-bold rounded-3"
					onClick={() => handleStartTimer(35, "Test (35 sec)")}
				>
					Test (35 sec)
				</button> */}
				<button
					className="btn btn-warning w-100 p-1 mb-3 fs-5 fw-bold rounded-3"
					onClick={() => handleStartTimer(300, "Regular Dead (5 Min)")}
				>
					Regular Dead (5 Min)
				</button>
				<button
					className="btn btn-warning w-100 p-1 mb-3 fs-5 fw-bold rounded-3"
					onClick={() => handleStartTimer(120, "Mutant Portal (2 Min)")}
				>
					Mutant Portal (2 Min)
				</button>
				<button
					className="btn btn-warning w-100 p-1 mb-5 fs-5 fw-bold rounded-3"
					onClick={() => handleStartTimer(480, "Mutant Dead (8 Min)")}
				>
					Mutant Dead (8 Min)
				</button>
			</div>

			<button
				className="delete-btn btn btn-danger w-100 py-1 fs-5 fw-bold rounded-3"
				onClick={handleDelete}
			>
				Delete Channel
			</button>
		</div>
	);
};

export default Channel;
