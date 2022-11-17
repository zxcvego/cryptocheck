import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartInactive } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartActive } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { CoinI } from "../../CryptoTable";
import { SortPropsI } from "../TableContent";

interface TableHeadersI {
	nameToView: string;
	propertyName: string;
	cssStyle: string;
}

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
	{ nameToView: "Name", propertyName: "name", cssStyle: "" },

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
	{ nameToView: "Price", propertyName: "priceUsd", cssStyle: "text-center" },
	{
		nameToView: "24h Change",
		propertyName: "changePercent24Hr",
		cssStyle: "overflow-hidden",
	},
];

interface TableHeadersPropsI {
	sortProps: SortPropsI;
	showFavoriteCoins: boolean;
	setSortProps: React.Dispatch<React.SetStateAction<SortPropsI>>;
	setShowFavoriteCoins: React.Dispatch<React.SetStateAction<boolean>>;
	setAmountOfVisibleCoins: React.Dispatch<React.SetStateAction<number>>;
}

export const TableHeaders = ({
	sortProps,
	setSortProps,
	showFavoriteCoins,
	setShowFavoriteCoins,
	setAmountOfVisibleCoins,
}: TableHeadersPropsI) => {
	const changeSortingCategory = (tableHeader: TableHeadersI) => {
		const sortPropsTemp = structuredClone(sortProps);

		sortPropsTemp.type === "ASC" &&
		sortPropsTemp.column === tableHeader.propertyName
			? (sortPropsTemp.type = "DESC")
			: (sortPropsTemp.type = "ASC");

		sortPropsTemp.column = tableHeader.propertyName;
		setSortProps(sortPropsTemp);
	};

	return (
		<>
			<th className="py-3 px-2">
				<button>
					<FontAwesomeIcon
						icon={showFavoriteCoins ? faHeartActive : faHeartInactive}
						className="text-purple cursor-pointer"
						onClick={() => {
							setShowFavoriteCoins(!showFavoriteCoins);
						}}
					/>
				</button>
			</th>
			{TABLE_HEADERS.map((tableHeader, i) => {
				return (
					<th
						key={i}
						onClick={() => {
							changeSortingCategory(tableHeader);
							setAmountOfVisibleCoins(20);
						}}
						className={
							`cursor-pointer text-dark-grey px-3 w-fit hover:text-neutral-200 text-xs sm:text-sm md:text-lg ` +
							tableHeader.cssStyle
						}
					>
						<button className="flex-column items-center justify-center md:whitespace-nowrap">
							<p className="w-full">{tableHeader.nameToView}</p>
							<p className="md:-m-1.5">
								{tableHeader.propertyName === sortProps.column ? (
									sortProps.type === "ASC" ? (
										<FontAwesomeIcon
											icon={faChevronUp}
											className="text-purple w-3 h-3"
										/>
									) : (
										<FontAwesomeIcon
											icon={faChevronDown}
											className="text-purple w-3 h-3"
										/>
									)
								) : null}
							</p>
						</button>
					</th>
				);
			})}
		</>
	);
};
