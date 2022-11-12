import axios from "axios";
import { useEffect, useState } from "react";
import TableContent from "./table/TableContent";
import ViewMoreButton from "./table/ViewMoreButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartInactive } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartActive } from "@fortawesome/free-solid-svg-icons";
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
	{
		nameToView: "Rank",
		propertyName: "rank",
		cssStyle: "hidden md:table-cell",
	},
	{ nameToView: "Name", propertyName: "name", cssStyle: "text-left " },

	{
		nameToView: "Market Cap",
		propertyName: "marketCapUsd",
		cssStyle: "hidden md:table-cell",
	},
	{
		nameToView: "24h VWAP",
		propertyName: "vwap24Hr",
		cssStyle: "hidden xl:table-cell",
	},
	{
		nameToView: "Supply",
		propertyName: "supply",
		cssStyle: "hidden xl:table-cell",
	},
	{
		nameToView: "24h Volume",
		propertyName: "volumeUsd24Hr",
		cssStyle: "hidden lg:table-cell",
	},
	{ nameToView: "Price", propertyName: "priceUsd", cssStyle: "text-left" },
	{
		nameToView: "24h Change",
		propertyName: "changePercent24Hr",
		cssStyle: "overflow-hidden",
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
			<div className="bg-black font-inter text-white overflow-hidden">
				<table className=" mx-auto text-white text-xs  md:text-lg lg:text-xl border-darker-grey border-2 rounded-t-2xl w-2/3">
					<thead className="bg-graphite ">
						<tr>
							<th className="px-3 py-5">
								<FontAwesomeIcon
									icon={showFavoriteCoins ? faHeartActive : faHeartInactive}
									className="text-purple cursor-pointer"
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
											`cursor-pointer text-dark-grey md:px-2 ` +
											tableHeader.cssStyle
										}
									>
										<div className="flex items-center md:whitespace-nowrap gap-1 ">
											<p>{tableHeader.nameToView}</p>
											<p>
												{tableHeader.propertyName === sortProps.column ? (
													sortProps.type === "ASC" ? (
														<FontAwesomeIcon
															icon={faArrowUp}
															className="text-purple"
														/>
													) : (
														<FontAwesomeIcon
															icon={faArrowDown}
															className="text-purple"
														/>
													)
												) : null}
											</p>
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
			</div>
			<ViewMoreButton
				increaseAmountOfVisibleCoins={increaseAmountOfVisibleCoins}
			/>
		</>
	);
};

export default CryptoTable;
