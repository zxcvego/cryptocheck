import TableRow from "./table/TableRow";

const CryptoTable = () => {
	return (
		<table className="container mx-auto bg-black text-white font-open-sans rounded-t-md">
			<thead>
				<tr>
					<th></th>
					<th>Rank</th>
					<th>Name</th>
					<th>Price</th>
					<th>Market Cap</th>
					<th className="hidden">VWAP (24Hr)</th>
					<th className="hidden">Supply</th>
					<th className="hidden">Volume (24Hr)</th>
					<th className="hidden">Change (24Hr)</th>
				</tr>
			</thead>
			<tbody>
				{[...Array(15)].map((_x, i) => (
					<TableRow />
				))}
			</tbody>
		</table>
	);
};

export default CryptoTable;
