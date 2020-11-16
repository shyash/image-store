export const page = async (req: any, res: any) => {
	res.sendFile('index.html', { root: __dirname + '/../views' });
};
import { uploadFilesMiddleware } from '../middleware/upload';
export const uploadFile = async (req: any, res: any) => {
	try {
		await uploadFilesMiddleware(req, res);
		console.log(req.file);
		if (req.file == undefined) {
			return res
				.status(400)
				.json({ success: false, error: `You must select a file.` });
		}
		return res.status(201).json({
			success: true,
			message: `File uploaded successfully`,
			url: req.headers.host + `/image/${req.file.id}`,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: `Error when trying upload image: ${error}`,
		});
	}
};
