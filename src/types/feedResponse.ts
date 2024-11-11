export type BBCRssRes = {
	title: string[];
	description: string[];
	link: string[];
	pubDate: string[];
	"media:thumbnail": {
		$: {
			width: string;
			height: string;
			url: string;
		};
	}[];
};
