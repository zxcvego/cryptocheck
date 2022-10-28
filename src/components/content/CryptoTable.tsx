import axios from "axios";
import { useEffect, useState } from "react";
import TableContent from "./table/tableviews/TableContent";
import ViewMoreButton from "./table/ViewMoreButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartInactive } from "@fortawesome/free-regular-svg-icons";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

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

export interface SortPropsI {
	column: keyof Omit<CoinI, "isFavorite">;
	type: "ASC" | "DESC";
}

interface TableHeadersI {
	nameToView: string;
	propertyName: string;
}

const REQUEST_URL = "https://api.coincap.io/v2/assets";
const REQUEST_CONFIG = {
	params: {
		limit: 2000,
	},
};

const TABLE_HEADERS: { nameToView: string; propertyName: keyof CoinI }[] = [
	{ nameToView: "Rank", propertyName: "rank" },
	{ nameToView: "Name", propertyName: "name" },
	{ nameToView: "Price", propertyName: "priceUsd" },
	{ nameToView: "Market Cap", propertyName: "marketCapUsd" },
	{ nameToView: "Change (24H)", propertyName: "changePercent24Hr" },
	{ nameToView: "VWAP (24H)", propertyName: "vwap24Hr" },
	{ nameToView: "Supply", propertyName: "supply" },
	{ nameToView: "Volume (24H)", propertyName: "volumeUsd24Hr" },
];

const CryptoTable = () => {
	const [cryptoCurrencyData, setCryptoCurrencyData] = useState<CoinI[]>([]);
	const [loading, setLoading] = useState(true);
	const [amountOfVisibleCoins, setAmountOfVisibleCoins] = useState(20);
	const [showFavoriteCoins, setShowFavoriteCoins] = useState(false);
	const [sortProps, setSortProps] = useState<SortPropsI>({
		column: "rank",
		type: "ASC",
	});

	useEffect(() => {
		axios.get(REQUEST_URL, REQUEST_CONFIG).then(
			({ data }) => {
				const response = data.data;
				setCryptoCurrencyData(
					response.map((coin: CoinI) => ({
						...coin,
						isFavorite: false,
					}))
				);
				setLoading(false);
			},
			(error) => {
				console.log(error);
			}
		);
	}, [loading]);

	const increaseAmountOfVisibleCoins = (incrementValue: number) => {
		setAmountOfVisibleCoins(amountOfVisibleCoins + incrementValue);
	};

	const changeSortingCategory = (tableHeader: TableHeadersI) => {
		const sortPropsTemp = structuredClone(sortProps);
		sortPropsTemp.column = tableHeader.propertyName;
		sortPropsTemp.type === "ASC"
			? (sortPropsTemp.type = "DESC")
			: (sortPropsTemp.type = "ASC");
		setSortProps(sortPropsTemp);
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
								onClick={() => {
									setShowFavoriteCoins(!showFavoriteCoins);
								}}
							/>
						</th>
						{TABLE_HEADERS.map((tableHeader, i) => {
							return (
								<th
									key={i}
									onClick={() => {
										changeSortingCategory(tableHeader);
									}}
									className="cursor-pointer hover:bg-blue-400"
								>
									<div className="flex">
										{tableHeader.nameToView}
										{tableHeader.propertyName === sortProps.column ? (
											sortProps.type === "ASC" ? (
												<FontAwesomeIcon
													icon={faArrowUp}
													className="text-blue-500"
												/>
											) : (
												<FontAwesomeIcon
													icon={faArrowDown}
													className="text-blue-500"
												/>
											)
										) : null}
									</div>
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<TableContent
						loading={loading}
						cryptoCurrencyData={cryptoCurrencyData}
						setCryptoCurrencyData={setCryptoCurrencyData}
						amountOfVisibleCoins={amountOfVisibleCoins}
						showFavoriteCoins={showFavoriteCoins}
						sortProps={sortProps}
					/>
				</tbody>
			</table>
			<ViewMoreButton
				increaseAmountOfVisibleCoins={increaseAmountOfVisibleCoins}
			/>
		</>
	);
};

export default CryptoTable;
