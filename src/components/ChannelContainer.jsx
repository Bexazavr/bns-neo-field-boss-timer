import React from "react";
import Channel from "./Channel";

const ChannelContainer = ({
	hasChannels,
	channels,
	addActiveTimer,
	deleteChannel,
}) => {
	return (
		<>
			{hasChannels && (
				<div className="channel-container mb-3">
					<div className="row justify-content-center flex-wrap gap-3 p-3">
						{channels.map((channel) => (
							<Channel
								key={channel.id}
								id={channel.id}
								addActiveTimer={addActiveTimer}
								deleteChannel={deleteChannel}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default ChannelContainer;
