const Navbar = () => {
	return (
		<div className="bg-neutral-800 w-full font-medium flex gap-3 justify-center items-center p-3 select-none md:p-6">
			<h1 className="text-3xl text-white font-open-sans md:text-6xl">
				CryptoCheck
			</h1>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg"
				alt="bitcoin logo"
				className="w-10 md:w-16"
			/>
		</div>
	);
};

export default Navbar;
