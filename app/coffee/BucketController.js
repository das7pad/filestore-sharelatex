settings = require("settings-sharelatex")
logger = require("logger-sharelatex")
FileHandler = require("./FileHandler")
metrics = require("metrics-sharelatex")
Errors = require('./Errors')

module.exports = BucketController =

	getFile: (req, res)->
		{bucket} = req.params
		key = req.params[0]
		credentials = settings.filestore.s3BucketCreds?[bucket]
		options = {
			key: key,
			bucket: bucket,
			credentials: credentials
		}
		metrics.inc "#{bucket}.getFile"
		logger.log key:key, bucket:bucket, "receiving request to get file from bucket"
		FileHandler.getFile bucket, key, options, (err, fileStream)->
			if err?
				logger.err err:err, key:key, bucket:bucket, "problem getting file from bucket"
				if err instanceof Errors.NotFoundError
					return res.send 404
				else
					return res.send 500
			else
				logger.log key:key, bucket:bucket, "sending bucket file to response"
				fileStream.pipe res
