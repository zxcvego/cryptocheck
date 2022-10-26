import { CoinI } from "../../CryptoTable";
import TableRow from "../TableRow";
const FavoriteCoinsContent = ({
	cryptoCurrencyData,
	setCryptoCurrencyData,
}: {
	cryptoCurrencyData: CoinI[];
	setCryptoCurrencyData: React.Dispatch<React.SetStateAction<CoinI[]>>;
}) => {
	const showFavoriteCoins = () => {
		const favoriteCoins = cryptoCurrencyData.filter(
			(favoriteCoin: CoinI, i: number) => {
				return favoriteCoin.isFavorite;
			}
		);

		return (
			<>
				{favoriteCoins.map(
					(coin: CoinI, i: number): JSX.Element => (
						<TableRow
							key={i}
							coin={coin}
							cryptoCurrencyData={cryptoCurrencyData}
							setCryptoCurrencyData={setCryptoCurrencyData}
							id={i}
						/>
					)
				)}
			</>
		);
	};

	return showFavoriteCoins();
};

export default FavoriteCoinsContent;
