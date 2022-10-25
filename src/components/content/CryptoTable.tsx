import axios from "axios";
import { useEffect, useState } from "react";

import TableRow from "./table/TableRow";
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
}

export class CryptoCoin implements CoinI {
	rank: number;
	symbol: string;
	name: string;
	priceUsd: number;
	marketCapUsd: number;
	vwap24Hr: number;
	supply: number;
	volumeUsd24Hr: number;
	changePercent24Hr: number;

	constructor(coin: CoinI) {
		this.rank = coin.rank;
		this.symbol = coin.symbol;
		this.name = coin.name;
		this.priceUsd = coin.priceUsd;
		this.marketCapUsd = coin.marketCapUsd;
		this.vwap24Hr = coin.vwap24Hr;
		this.supply = coin.supply;
		this.volumeUsd24Hr = coin.volumeUsd24Hr;
		this.changePercent24Hr = coin.changePercent24Hr;
	}
}

const REQUEST_URL = "https://api.coincap.io/v2/assets";

const CryptoTable = () => {
	const [cryptoCurrencyData, setCryptoCurrencyData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(REQUEST_URL, {
				params: {
					limit: 2000,
				},
			})
			.then(
				({ data }) => {
					setCryptoCurrencyData(data.data);
					setLoading(false);
				},
				(error) => {
					console.log(error);
				}
			);
	}, []);

	const parseCryptoDataToArrayOfCoins = () => {
		const arrayOfCoins = [];
		for (let i = 0; i < cryptoCurrencyData.length; i++) {
			const coin = new CryptoCoin(cryptoCurrencyData[i]);
			arrayOfCoins.push(coin);
		}
		return arrayOfCoins;
	};
	const coinsArray = parseCryptoDataToArrayOfCoins();
	return (
		<table className="container mx-auto bg-black text-white font-open-sans rounded-t-md">
			<thead>
				<tr>
					<th></th>
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
				{loading
					? null
					: [...Array(15)].map((_x, i) => (
							<TableRow key={i} coin={coinsArray[i]} />
					  ))}
			</tbody>
		</table>
	);
};

export default CryptoTable;
