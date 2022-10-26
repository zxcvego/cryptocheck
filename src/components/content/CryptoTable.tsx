import axios from "axios";
import { useEffect, useState } from "react";
import MainTableContent from "./table/tableviews/MainTableContent";
import ViewMoreButton from "./table/ViewMoreButton";
import FavoriteCoinsContent from "./table/tableviews/FavoriteCoinsContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartInactive } from "@fortawesome/free-regular-svg-icons";
export interface CoinI {
	rank: number;
	symbol: string;
	name: string;
	priceUsd: number;
	marketCapUsd: number;
	vwap24Hr: number;
	supply: number;
	volumeUsd24Hr: number;
	changePercent24Hr: number;
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
	const [amountOfVisibleCoins, setAmountOfVisibleCoins] = useState(20);
	const [showFavoriteCoins, setShowFavoriteCoins] = useState(false);

	useEffect(() => {
		axios.get(REQUEST_URL, REQUEST_CONFIG).then(
			({ data }) => {
				const response = data.data;
				setCryptoCurrencyData(
					response.map((obj: CoinI) => ({
						...obj,
						isFavorite: false,
					}))
				);
				setLoading(false);
			},
			(error) => {
				console.log(error);
			}
		);
	}, []);

	const increaseAmountOfVisibleCoins = (incrementValue: number) => {
		setAmountOfVisibleCoins(amountOfVisibleCoins + incrementValue);
	};

	return (
		<>
			<table className="container mx-auto bg-black text-white font-open-sans rounded-t-md min-h-24">
				<thead>
					<tr>
						<th>
							<FontAwesomeIcon
								icon={faHeartInactive}
								className="text-blue-500 pl-4 cursor-pointer"
								onClick={() => setShowFavoriteCoins(!showFavoriteCoins)}
							/>
						</th>
						<th>Rank</th>
						<th>Name</th>
						<th>Price</th>
						<th>Market Cap</th>
						<th>Change (24Hr)</th>
						<th className="hidden">VWAP (24Hr)</th>
						<th className="hidden">Supply</th>
						<th className="hidden">Volume (24Hr)</th>
					</tr>
				</thead>
				<tbody>
					{!showFavoriteCoins ? (
						<MainTableContent
							loading={loading}
							cryptoCurrencyData={cryptoCurrencyData}
							setCryptoCurrencyData={setCryptoCurrencyData}
							amountOfVisibleCoins={amountOfVisibleCoins}
						/>
					) : (
						<FavoriteCoinsContent
							cryptoCurrencyData={cryptoCurrencyData}
							setCryptoCurrencyData={setCryptoCurrencyData}
							amountOfVisibleCoins={amountOfVisibleCoins}
						/>
					)}
				</tbody>
			</table>
			<ViewMoreButton
				increaseAmountOfVisibleCoins={increaseAmountOfVisibleCoins}
			/>
		</>
	);
};

export default CryptoTable;
