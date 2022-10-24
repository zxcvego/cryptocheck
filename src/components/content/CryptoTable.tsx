import TableRow from "./table/TableRow";

const CryptoTable = () => {
	return (
		<table className="container mx-auto bg-black text-white font-open-sans rounded-t-md">
			<th className="leading-8 text-center pl-12">head 1</th>
			<th className="leading-8 text-center pl-12">head 2</th>
			<TableRow />
			<TableRow />
			<TableRow />
			<TableRow />
			<TableRow />
			<TableRow />
			<TableRow />
		</table>
	);
};

export default CryptoTable;
