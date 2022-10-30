import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartInactive } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartActive } from "@fortawesome/free-solid-svg-icons";
import { CoinI } from "../CryptoTable";
import { useState } from "react";

const COIN_ICON_URL = "https://assets.coincap.io/assets/icons/";

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
	const [coinImage, setCoinImage] = useState(
		`${COIN_ICON_URL}${coin.symbol.toLowerCase()}@2x.png`
	);

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

	const formatCoinPropertyValue = (
		value: string,
		propertyToFormat: keyof Omit<CoinI, "isFavorite">
	) => {
		if (value === "0.0000000000000000" || value === null) return "-";

		const numberWithCommas = Number(value).toLocaleString("en-US");
		const commaCount = numberWithCommas.split(",").length - 1;
		const commaIndex = numberWithCommas.indexOf(",");
		let suffix = "";
		let prefix = "";
		if (propertyToFormat !== "supply") prefix = "$";

		switch (propertyToFormat) {
			case "marketCapUsd":
			case "volumeUsd24Hr":
			case "supply":
				switch (commaCount) {
					case 0:
						suffix = "";
						break;
					case 1:
						suffix = "k";
						break;
					case 2:
						suffix = "m";
						break;
					case 3:
						suffix = "b";
						break;
					case 4:
						suffix = "t";
						break;
					case 5:
						suffix = "q";
						break;
				}
		}

		if (propertyToFormat === "priceUsd" || propertyToFormat === "vwap24Hr")
			return `${prefix}${numberWithCommas}${suffix}`;

		return `${prefix}${numberWithCommas.slice(0, commaIndex + 3)}${suffix}`;
	};

	const assignProperColorForPercentage = (value: number) => {
		let color = "";
		return value === 0
			? (color = "")
			: value > 0
			? (color = "text-green-500")
			: (color = "text-red-500");
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
							src={coinImage}
							onError={() =>
								setCoinImage(
									`https://toppng.com/uploads/preview/gold-coins-11530998393xtf85riude.png`
								)
							}
							alt={`${coin.name} icon`}
							className="w-6 h-6"
						/>
						{coin.name}
					</div>
				</td>
				<td>
					{formatCoinPropertyValue(coin.priceUsd, "priceUsd")}
					{coin.priceUsd}
				</td>
				<td>{formatCoinPropertyValue(coin.marketCapUsd, "marketCapUsd")}</td>
				<td>
					{formatCoinPropertyValue(coin.vwap24Hr, "vwap24Hr")}
					<br></br>
					<p>{coin.vwap24Hr}</p>
				</td>
				<td>
					{formatCoinPropertyValue(coin.supply, "supply")}
					<br></br>
					{coin.supply}
				</td>
				<td>{formatCoinPropertyValue(coin.volumeUsd24Hr, "volumeUsd24Hr")}</td>
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
