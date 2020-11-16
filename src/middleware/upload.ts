import util from 'util';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';

const storage = new GridFsStorage({
	url: process.env.MONGO_URI || 'mongodb://localhost/uploader',
	options: { useNewUrlParser: true, useUnifiedTopology: true },
	file: (req: Express.Request, file: Express.Multer.File) => {
		const match = ['image/png', 'image/jpeg'];
		if (match.indexOf(file.mimetype) === -1) {
			const filename: string = `${Date.now()}-${file.originalname}`;
			return filename;
		}
		return {
			bucketName: 'photos',
			filename: `${Date.now()}-${file.originalname}`,
		};
	},
});

const uploadFile = multer({ storage: storage }).single('file');
export const uploadFilesMiddleware = util.promisify(uploadFile);
