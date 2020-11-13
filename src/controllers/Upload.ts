export const page = async (req: any, res: any) => {
	res.sendFile('index.html', { root: __dirname + '/../views' });
};
