import axios from "axios";
import { useEffect, useState } from "react";
import TableContent from "./table/TableContent";
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
	cssStyle: string;
}

const REQUEST_URL = "https://api.coincap.io/v2/assets";
const REQUEST_CONFIG = {
	params: {
		limit: 2000,
	},
};

const TABLE_HEADERS: {
	nameToView: string;
	propertyName: keyof CoinI;
	cssStyle: string;
}[] = [
	{ nameToView: "Rank", propertyName: "rank", cssStyle: "" },
	{ nameToView: "Name", propertyName: "name", cssStyle: "" },
	{ nameToView: "Price", propertyName: "priceUsd", cssStyle: "" },
	{
		nameToView: "Market Cap",
		propertyName: "marketCapUsd",
		cssStyle: "hidden lg:block",
	},
	{
		nameToView: "VWAP (24H)",
		propertyName: "vwap24Hr",
		cssStyle: "hidden lg:block",
	},
	{ nameToView: "Supply", propertyName: "supply", cssStyle: "hidden lg:block" },
	{
		nameToView: "Volume (24H)",
		propertyName: "volumeUsd24Hr",
		cssStyle: "hidden lg:block",
	},
	{
		nameToView: "Change (24H)",
		propertyName: "changePercent24Hr",
		cssStyle: "",
	},
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
				console.log(response);
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
		<div className="font-inter bg-black text-white">
			<table className="container mx-auto text-white border-dark-grey  border-2  rounded-t-2xl overflow-hidden border-separate">
				<thead className="bg-graphite ">
					<tr>
						<th>
							<FontAwesomeIcon
								icon={faHeartInactive}
								className="text-blue-500 cursor-pointer"
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
									className={
										`cursor-pointer text-dark-grey ` + tableHeader.cssStyle
									}
								>
									<div>
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
		</div>
	);
};

export default CryptoTable;
