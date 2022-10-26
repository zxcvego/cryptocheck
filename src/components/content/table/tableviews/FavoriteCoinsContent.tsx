import { CoinI } from "../../CryptoTable";
import TableRow from "../TableRow";
const FavoriteCoinsContent = ({
	cryptoCurrencyData,
	setCryptoCurrencyData,
}: any) => {
	const showFavoriteCoins = () => {
		const fav = cryptoCurrencyData.filter((object: CoinI, i: number) => {
			return object.isFavorite ? object : null;
		});

		console.log(fav);
		const showFav = fav.map((_x: any, i: number) => (
			<TableRow
				key={i + 100}
				coin={fav[i]}
				cryptoCurrencyData={cryptoCurrencyData}
				setCryptoCurrencyData={setCryptoCurrencyData}
				id={i}
			/>
		));
		console.log(showFav);
		return showFav;
	};

	return showFavoriteCoins();
};

export default FavoriteCoinsContent;
