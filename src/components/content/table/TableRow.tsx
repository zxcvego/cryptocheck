import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { CoinI } from "../CryptoTable";

const COIN_ICON_URL = "https://assets.coincap.io/assets/icons/";

const TableRow = ({ coin }: { coin: CoinI }) => {
	return (
		<>
			<tr className="h-14 bg-gray-100 leading-10 border-t-2 border-neutral-300 text-black box-border">
				<td className="pl-4">
					<FontAwesomeIcon icon={faHeart} />
				</td>
				<td className="text-center w-3">{coin.rank}</td>
				<td className="text-center">
					<div className="flex justify-center items-center gap-2">
						<img
							src={`${COIN_ICON_URL}${coin.symbol.toLowerCase()}@2x.png`}
							alt={`${coin.name} icon`}
							className="w-6 h-6"
						/>
						{coin.name}
					</div>
				</td>
				<td className="text-center">{coin.priceUsd}</td>
				<td className="text-center">{coin.marketCapUsd}</td>
			</tr>
		</>
	);
};

export default TableRow;
