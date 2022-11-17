import React, { useState } from "react";
import { CoinI } from "../../CryptoTable";
import { SortPropsI } from "../TableContent";
import TableRow from "./TableRow";

const sortData = (
	firstCoin: CoinI,
	secondCoin: CoinI,
	sortType: "ASC" | "DESC",
	propertyToSort: keyof Omit<CoinI, "isFavorite">
) => {
	function sortedValue(a: number, b: number) {
		return a - b;
	}

	if (propertyToSort !== "name") {
		return sortType === "ASC"
			? sortedValue(
					Number(firstCoin[propertyToSort]),
					Number(secondCoin[propertyToSort])
			  )
			: sortedValue(
					Number(secondCoin[propertyToSort]),
					Number(firstCoin[propertyToSort])
			  );
	}

	if (propertyToSort === "name") {
		return sortType === "ASC"
			? firstCoin[propertyToSort]
					.toUpperCase()
					.localeCompare(secondCoin[propertyToSort].toUpperCase())
			: secondCoin[propertyToSort]
					.toUpperCase()
					.localeCompare(firstCoin[propertyToSort].toUpperCase());
	}

	return 0;
};

interface ShowTableRowsI {
	sortProps: SortPropsI;
	showFavoriteCoins: boolean;
	amountOfVisibleCoins: number;
	cryptoCurrencyData: CoinI[];
	setCryptoCurrencyData: React.Dispatch<React.SetStateAction<CoinI[]>>;
}

export const ShowTableRows = ({
	sortProps,
	amountOfVisibleCoins,
	showFavoriteCoins,
	cryptoCurrencyData,
	setCryptoCurrencyData,
}: ShowTableRowsI) => {
	const [favoriteCoinsStorage, setFavoriteCoinsStorage] = useState<string[]>(
		JSON.parse(localStorage.getItem("fav_coins") || "[]")
	);

	return (
		<>
			{cryptoCurrencyData
				.sort((a: CoinI, b: CoinI) => {
					return sortData(a, b, sortProps.type, sortProps.column);
				})

				.filter((coin: CoinI) => (showFavoriteCoins ? coin.isFavorite : true))
				.slice(0, amountOfVisibleCoins)
				.map((coin: CoinI, i: number) => {
					return (
						<TableRow
							key={i}
							coin={coin}
							cryptoCurrencyData={cryptoCurrencyData}
							setCryptoCurrencyData={setCryptoCurrencyData}
							favoriteCoinsStorage={favoriteCoinsStorage}
							setFavoriteCoinsStorage={setFavoriteCoinsStorage}
						/>
					);
				})}
			{console.log(favoriteCoinsStorage)}
			{showFavoriteCoins && favoriteCoinsStorage.length === 0 ? (
				<p className="absolute mt-2">You have no favorite coins!</p>
			) : null}
		</>
	);
};
