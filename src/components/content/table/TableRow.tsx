import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartInactive } from "@fortawesome/free-regular-svg-icons";
import {
	faHeart as faHeartActive,
	faArrowTrendDown,
	faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { CoinI } from "../CryptoTable";
import { useEffect, useState } from "react";
import genericCoin from "../../../assets/golden-coin.png";
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
	const COIN_ICON_URL = `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`;
	const [coinImage, setCoinImage] = useState(COIN_ICON_URL);

	useEffect(() => {
		setCoinImage(COIN_ICON_URL);
	}, [coin.symbol]);

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
		if (numberWithCommas === "0") return `$${Number(value).toFixed(6)}`;
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

		if (propertyToFormat === "priceUsd" || propertyToFormat === "vwap24Hr") {
			return `${prefix}${numberWithCommas}${suffix}`;
		}
		return `${prefix}${numberWithCommas.slice(0, commaIndex + 3)}${suffix}`;
	};

	const assignProperColorForPercentage = (value: number) => {
		let color = "";
		return value === 0
			? (color = "")
			: value > 0
			? (color = "text-green")
			: (color = "text-red");
	};

	const assignIconForPercentage = (value: number) => {
		return value === 0 ? null : value > 0 ? (
			<FontAwesomeIcon icon={faArrowTrendUp} />
		) : (
			<FontAwesomeIcon icon={faArrowTrendDown} />
		);
	};

	return (
		<>
			<tr className="odd:bg-black even:bg-graphite text-white h-20 overflow-hidden">
				<td className="text-center">
					<p>
						<FontAwesomeIcon
							icon={coin.isFavorite ? faHeartActive : faHeartInactive}
							className={
								coin.isFavorite
									? "text-purple cursor-pointer"
									: "text-gray cursor-pointer"
							}
							onClick={changeFavoriteStatus}
						/>
					</p>
				</td>
				<td className="hidden md:table-cell text-center">
					<p>{coin.rank}</p>
				</td>
				<td className="md:px-2">
					<div className="flex items-center gap-2 overflow-hidden ">
						<img
							src={coinImage}
							alt={`${coin.name} icon`}
							className="w-5 h-5 md:w-7 md:h-7"
							onError={() => setCoinImage(genericCoin)}
						/>
						<div className="w-24 x-sm:w-fit">
							<p className="w-16 truncate x-sm:w-fit">
								{coin.name === "" || coin.name === null ? "-" : coin.name}
							</p>
							<p className="text-dark-grey">
								{coin.symbol === "" || coin.symbol === null
									? null
									: coin.symbol}
							</p>
						</div>
					</div>
				</td>

				<td className="hidden md:table-cell text-center">
					<p>{formatCoinPropertyValue(coin.marketCapUsd, "marketCapUsd")}</p>
				</td>
				<td className="hidden xl:table-cell text-center">
					<p>{formatCoinPropertyValue(coin.vwap24Hr, "vwap24Hr")}</p>
				</td>
				<td className="hidden xl:table-cell text-center">
					<p>{formatCoinPropertyValue(coin.supply, "supply")}</p>
				</td>
				<td className="hidden lg:table-cell text-center">
					<p>{formatCoinPropertyValue(coin.volumeUsd24Hr, "volumeUsd24Hr")}</p>
				</td>
				<td className="md:px-2 text-center">
					<p>{formatCoinPropertyValue(coin.priceUsd, "priceUsd")}</p>
				</td>
				<td
					className={`${assignProperColorForPercentage(
						Number(coin.changePercent24Hr)
					)}`}
				>
					<div className="flex gap-1 items-center justify-center">
						<p>{assignIconForPercentage(Number(coin.changePercent24Hr))}</p>
						<p>
							{Number(coin.changePercent24Hr) === 0.0
								? "-"
								: `${Math.abs(Number(coin.changePercent24Hr)).toFixed(2)}`}
						</p>
					</div>
				</td>
			</tr>
		</>
	);
};

export default TableRow;
