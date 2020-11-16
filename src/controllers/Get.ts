import { MongoClient, ObjectId } from 'mongodb';

export const get = (req: any, res: any) => {
	const url = process.env.MONGO_URI || 'mongodb://localhost/uploader';
	MongoClient.connect(url, { useUnifiedTopology: true }, function (
		err,
		client,
	) {
		if (err) {
			return res.json({
				success: false,
				error: 'MongoClient Connection error',
			});
		}
		const db = client.db('uploader');
		const collection = db.collection('photos.files');
		const collectionChunks = db.collection('photos.chunks');
		collection
			.find({ _id: new ObjectId(req.params.id) })
			.toArray(function (err1, docs) {
				if (err1) {
					return res.json({
						success: false,
						error: 'Error finding file',
					});
				}
				if (!docs || docs.length === 0) {
					return res.json({
						success: false,
						error: 'No file found',
					});
				} else {
					collectionChunks
						.find({ files_id: docs[0]._id })
						.sort({ n: 1 })
						.toArray(function (err2, chunks) {
							if (err2) {
								return res.json({
									success: false,
									error: 'data not found',
								});
							}
							if (!chunks || chunks.length === 0) {
								return res.json({
									success: false,
									error: 'Error retrieving chunks',
								});
							}
							let fileData = [];
							for (let i = 0; i < chunks.length; i++) {
								fileData.push(chunks[i].data.toString('base64'));
							}
							const finalFile =
								'data:' + docs[0].contentType + ';base64,' + fileData.join('');
							return res.json({
								success: true,
								src: finalFile,
							});
						});
				}
			});
	});
};
