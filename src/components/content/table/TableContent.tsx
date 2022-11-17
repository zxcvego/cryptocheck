import { CoinI } from "../CryptoTable";
import { useState } from "react";
import ViewMoreButton from "../../content/table/ViewMoreButton";
import { ShowTableRows } from "./rows/ShowTableRows";
import { TableHeaders } from "./headers/TableHeaders";
import { TableHeadersSkeleton } from "./skeleton/TableHeadersSkeleton";
import { TableRowsSkeleton } from "./skeleton/TableRowsSkeleton";
export interface ContentI {
	loading: boolean;
	cryptoCurrencyData: CoinI[];
	setCryptoCurrencyData: React.Dispatch<React.SetStateAction<CoinI[]>>;
}
export interface SortPropsI {
	column: keyof Omit<CoinI, "isFavorite">;
	type: "ASC" | "DESC";
}

const TableContent = ({
	loading,
	cryptoCurrencyData,
	setCryptoCurrencyData,
}: ContentI) => {
	const [showFavoriteCoins, setShowFavoriteCoins] = useState<boolean>(false);
	const [sortProps, setSortProps] = useState<SortPropsI>({
		column: "rank",
		type: "ASC",
	});
	const [amountOfVisibleCoins, setAmountOfVisibleCoins] = useState<number>(20);

	const increaseAmountOfVisibleCoins = (incrementValue: number) => {
		setAmountOfVisibleCoins(amountOfVisibleCoins + incrementValue);
	};

	return (
		<>
			<table className="bg-black font-inter text-white overflow-hidden mx-auto text-xs sm:text-sm md:text-base border-darker-grey border-2 rounded-t-2xl w-full sm:min-w-fit md:w-8/12">
				<thead className="bg-graphite">
					<tr>
						{loading ? (
							<TableHeadersSkeleton />
						) : (
							<TableHeaders
								sortProps={sortProps}
								showFavoriteCoins={showFavoriteCoins}
								setSortProps={setSortProps}
								setShowFavoriteCoins={setShowFavoriteCoins}
								setAmountOfVisibleCoins={setAmountOfVisibleCoins}
							/>
						)}
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<TableRowsSkeleton />
					) : (
						<ShowTableRows
							sortProps={sortProps}
							showFavoriteCoins={showFavoriteCoins}
							amountOfVisibleCoins={amountOfVisibleCoins}
							cryptoCurrencyData={cryptoCurrencyData}
							setCryptoCurrencyData={setCryptoCurrencyData}
						/>
					)}
				</tbody>
			</table>
			{showFavoriteCoins ? null : (
				<ViewMoreButton
					increaseAmountOfVisibleCoins={increaseAmountOfVisibleCoins}
				/>
			)}
		</>
	);
};

export default TableContent;
