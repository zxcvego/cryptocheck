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

const REQUEST_URL = "https://api.coincap.io/v2/assets";
const REQUEST_CONFIG = {
	params: {
		limit: 2000,
	},
};

const CryptoTable = () => {
	const [cryptoCurrencyData, setCryptoCurrencyData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get(REQUEST_URL, REQUEST_CONFIG).then(
			({ data }) => {
				setCryptoCurrencyData(data.data);
				setLoading(false);
			},
			(error) => {
				console.log(error);
			}
		);
	}, [cryptoCurrencyData]);

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
					: [...Array(20)].map((_x, i) => (
							<TableRow key={i} coin={cryptoCurrencyData[i]} />
					  ))}
			</tbody>
		</table>
	);
};

export default CryptoTable;
