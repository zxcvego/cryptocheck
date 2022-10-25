const ViewMoreButton = (props: any) => {
	return (
		<div className="w-full flex justify-center pt-8 pb-8">
			<div
				className="bg-black w-24 flex justify-center cursor-pointer"
				onClick={() => props.increaseAmountOfVisibleCoins(40)}
			>
				<button className="text-white">More</button>
			</div>
		</div>
	);
};

export default ViewMoreButton;
