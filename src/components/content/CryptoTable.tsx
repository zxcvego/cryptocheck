import TableRow from "./table/TableRow";

const CryptoTable = () => {
	return (
		<table className="container mx-auto bg-black text-white font-open-sans rounded-t-md">
			<thead>
				<tr>
					<th className="leading-8 text-center pl-12">head 1</th>
					<th className="leading-8 text-center pl-12">head 2</th>
				</tr>
			</thead>
			<tbody>
				<TableRow />
				<TableRow />
				<TableRow />
				<TableRow />
				<TableRow />
				<TableRow />
				<TableRow />
			</tbody>
		</table>
	);
};

export default CryptoTable;
