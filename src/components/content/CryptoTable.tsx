import axios from "axios";
import { useEffect, useState } from "react";
import TableContent from "./table/TableContent";

export interface CoinI {
	rank: string;
	symbol: string;
	name: string;
	priceUsd: string;
	marketCapUsd: string;
	vwap24Hr: string;
	supply: string;
	volumeUsd24Hr: string;
	changePercent24Hr: string;
	isFavorite: boolean;
}

const REQUEST_URL = "https://api.coincap.io/v2/assets";
const REQUEST_CONFIG = {
	params: {
		limit: 2000,
	},
};

const CryptoTable = () => {
	const [cryptoCurrencyData, setCryptoCurrencyData] = useState<CoinI[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get(REQUEST_URL, REQUEST_CONFIG).then(
			({ data }) => {
				const response = data.data;
				const getCachedFavoriteCoins = JSON.parse(
					localStorage.getItem("fav_coins") || "[]"
				);
				setCryptoCurrencyData(
					response.map((coin: CoinI) => ({
						...coin,
						isFavorite: getCachedFavoriteCoins.includes(coin.symbol)
							? true
							: false,
					}))
				);

				setLoading(false);
			},
			(error) => {
				console.log(error);
			}
		);
	}, [loading]);

	return (
		<TableContent
			loading={loading}
			cryptoCurrencyData={cryptoCurrencyData}
			setCryptoCurrencyData={setCryptoCurrencyData}
		/>
	);
};

export default CryptoTable;
