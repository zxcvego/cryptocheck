import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const TableRow = ({ coin }: any) => {
	return (
		<>
			<tr className="h-14 bg-gray-100 leading-10 border-t-2 border-neutral-300 text-black box-border">
				<td className="pl-4">
					<FontAwesomeIcon icon={faHeart} />
				</td>
				<td className="text-center w-3">{coin.rank}</td>
				<td className="text-center">{coin.name}</td>
				<td className="text-center">{coin.priceUsd}</td>
				<td className="text-center">{coin.marketCapUsd}</td>
			</tr>
		</>
	);
};

export default TableRow;
