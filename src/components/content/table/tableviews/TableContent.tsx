import TableRow from "../TableRow";
import { CoinI } from "../../CryptoTable";
import { SortPropsI } from "../../CryptoTable";
export interface ContentI {
	loading: boolean;
	cryptoCurrencyData: CoinI[];
	setCryptoCurrencyData: React.Dispatch<React.SetStateAction<CoinI[]>>;
	amountOfVisibleCoins: number;
	showFavoriteCoins: boolean;
	sortProps: SortPropsI;
}

const TableContent = ({
	loading,
	cryptoCurrencyData,
	setCryptoCurrencyData,
	amountOfVisibleCoins,
	showFavoriteCoins,
	sortProps,
}: ContentI) => {
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

	return (
		<>
			{loading ? (
				<></>
			) : (
				cryptoCurrencyData
					.sort((a, b) => {
						return sortData(a, b, sortProps.type, sortProps.column);
					})
					.filter((coin) => (showFavoriteCoins ? coin.isFavorite : true))
					.slice(0, amountOfVisibleCoins)
					.map((coin, i) => {
						return (
							<TableRow
								key={i}
								coin={coin}
								cryptoCurrencyData={cryptoCurrencyData}
								setCryptoCurrencyData={setCryptoCurrencyData}
								id={i}
							/>
						);
					})
			)}
		</>
	);
};

export default TableContent;
