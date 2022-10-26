import TableRow from "../TableRow";
import { CoinI } from "../../CryptoTable";

export interface ContentI {
	loading: boolean;
	cryptoCurrencyData: CoinI[];
	setCryptoCurrencyData: React.Dispatch<React.SetStateAction<CoinI[]>>;
	amountOfVisibleCoins: number;
}

const MainTableContent = ({
	loading,
	cryptoCurrencyData,
	setCryptoCurrencyData,
	amountOfVisibleCoins,
}: ContentI) => {
	const showMainContent = () => {
		return loading
			? null
			: cryptoCurrencyData
					.slice(0, amountOfVisibleCoins)
					.map((_x: any, i: number) => (
						<TableRow
							key={i}
							coin={cryptoCurrencyData[i]}
							cryptoCurrencyData={cryptoCurrencyData}
							setCryptoCurrencyData={setCryptoCurrencyData}
							id={i}
						/>
					));
	};

	return <>{showMainContent()}</>;
};

export default MainTableContent;
