import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const TableRow = () => {
	return (
		<>
			<tr className="h-14 bg-gray-100 leading-10 border-t-2 border-neutral-300 text-black box-border">
				<td>
					<FontAwesomeIcon icon={faHeart} className="relative left-4" />
				</td>
				<td className="text-center w-3">1</td>
				<td className="text-center">Bitcoin</td>
				<td className="text-center">100$</td>
				<td className="text-center">100,000</td>
			</tr>
		</>
	);
};

export default TableRow;
