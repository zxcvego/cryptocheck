import React from "react";

interface ViewMoreButtonI {
	increaseAmountOfVisibleCoins: (incrementValue: number) => void;
}

const ViewMoreButton = ({ increaseAmountOfVisibleCoins }: ViewMoreButtonI) => {
	return (
		<div className="w-full flex justify-center pt-4 pb-4 sm:pt-10 sm:pb-10 lg:pt-10 lg:pb-10 bg-black">
			<button
				className="text-white font-bold text-xs bg-black w-24 flex justify-center cursor-pointer md:text-base"
				onClick={() => increaseAmountOfVisibleCoins(40)}
			>
				View More
			</button>
		</div>
	);
};

export default ViewMoreButton;
