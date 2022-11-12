const ViewMoreButton = (props: any) => {
	return (
		<div className="w-full flex justify-center pt-10 pb-10 lg:pt-16 lg:pb-14 bg-black">
			<div
				className="bg-black w-24 flex justify-center cursor-pointer"
				onClick={() => props.increaseAmountOfVisibleCoins(40)}
			>
				<button className="text-white font-bold">View More</button>
			</div>
		</div>
	);
};

export default ViewMoreButton;
