import React from "react";

const loadingBlocksCssStyles = [
	"",
	"hidden md:table-cell",
	"",
	"hidden md:table-cell",
	"hidden xl:table-cell",
	"hidden xl:table-cell",
	"hidden lg:table-cell",
	"",
	"",
];

export const TableRowsSkeleton = () => {
	return (
		<>
			{[...Array(20)].map((_x, _i) => (
				<tr className="odd:bg-black even:bg-graphite text-white h-12 md:h-16">
					{loadingBlocksCssStyles.map((styles, i_) => (
						<td className={styles}>
							<div
								className={`bg-gray w-55% h-5 mx-auto animate-pulse opacity-30`}
							></div>
						</td>
					))}
				</tr>
			))}
		</>
	);
};
