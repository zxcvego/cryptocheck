import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { CoinI } from "../CryptoTable";

const COIN_ICON_URL = "https://assets.coincap.io/assets/icons/";

const assignProperColorForPercentage = (value: number) => {
	let color = "";
	value > 0 ? (color = "text-green-500") : (color = "text-red-500");
	return color;
};

const TableRow = ({ coin }: { coin: CoinI }) => {
	return (
		<>
			<tr className="h-14 bg-gray-100 leading-10 border-t-2 border-neutral-300 text-black box-border text-center">
				<td className="pl-4">
					<FontAwesomeIcon icon={faHeart} />
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
