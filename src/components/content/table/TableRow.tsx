import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartInactive } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartActive } from "@fortawesome/free-solid-svg-icons";
import { CoinI } from "../CryptoTable";
import { useState } from "react";

const COIN_ICON_URL = "https://assets.coincap.io/assets/icons/";

const assignProperColorForPercentage = (value: number) => {
	let color = "";
	value > 0 ? (color = "text-green-500") : (color = "text-red-500");
	return color;
};

const TableRow = ({
	coin,
	cryptoCurrencyData,
	setCryptoCurrencyData,
	id,
}: {
	coin: CoinI;
	cryptoCurrencyData: CoinI[];
	setCryptoCurrencyData: React.Dispatch<React.SetStateAction<CoinI[]>>;
	id: number;
}) => {
	const [favoriteButtonStatus, setFavoriteButtonStatus] = useState(false);

	const changeFavoriteStatus = () => {
		const tempArray = [...cryptoCurrencyData];
		const coinInData = cryptoCurrencyData.find(
			(object: CoinI) => object.symbol === coin.symbol
		);
		const indexOfCurrentCoin = coinInData ? tempArray.indexOf(coinInData) : id;
		tempArray[indexOfCurrentCoin].isFavorite =
			!tempArray[indexOfCurrentCoin].isFavorite;
		setCryptoCurrencyData(tempArray);
	};

	return (
		<>
			<tr className="h-14 bg-gray-100 leading-10 border-t-2 border-neutral-300 text-black box-border text-center">
				<td className="pl-4">
					<FontAwesomeIcon
						icon={
							coin.isFavorite || favoriteButtonStatus
								? faHeartActive
								: faHeartInactive
						}
						className="text-red-500 cursor-pointer text-xl"
						onClick={changeFavoriteStatus}
						onMouseEnter={() => setFavoriteButtonStatus(true)}
						onMouseLeave={() => setFavoriteButtonStatus(false)}
					/>
				</td>
				<td className="w-3">{coin.rank}</td>
				<td>
					<div className="flex justify-center items-center gap-2">
						<img
							src={`${COIN_ICON_URL}${coin.symbol.toLowerCase()}@2x.png`}
							alt={`${coin.name} icon`}
							className="w-6 h-6"
						/>
						{coin.name}
					</div>
				</td>
				<td>{coin.priceUsd}</td>
				<td>{coin.marketCapUsd}</td>
				<td
					className={assignProperColorForPercentage(
						Number(coin.changePercent24Hr)
					)}
				>{`${Number(coin.changePercent24Hr).toFixed(2)}%`}</td>
			</tr>
		</>
	);
};

export default TableRow;
