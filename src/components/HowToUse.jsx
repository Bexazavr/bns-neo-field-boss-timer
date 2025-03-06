import React from "react";

const HowToUse = ({ hasChannels }) => {
	return (
		<div
			className={`how-to-use ${hasChannels ? "show" : ""} border border-light border-opacity-25`}
		>
			<div className={`row text-center p-3 `}>
				<h2 className="mb-3">How to Use</h2>
				<p className={`fs-5`}>
					<span className="fw-bold fs-5 decoration-underline badge text-bg-warning text-wrap">Regular Dead</span> 	– Click when the regular boss is dead.
				</p>
				<p className={`fs-5 `}>
					<span className="fw-bold fs-5 decoration-underline badge text-bg-warning text-wrap">Mutant Portal</span> 	– Click when the mutant boss portal
					appears.
				</p>
				<p className={`fs-5`}>
					<span className="fw-bold fs-5 decoration-underline badge text-bg-warning text-wrap">Mutant Dead</span> 	– Click when the mutant boss is dead.
				</p>
			</div>
		</div>
	);
};

export default HowToUse;
