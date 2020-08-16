const Path = require('path')

// use functions to get a fresh copy, not a reference, each time
function s3Config() {
  return {
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_S3_ENDPOINT,
    pathStyle: true,
    partSize: 100 * 1024 * 1024
  }
}

function s3Stores() {
  return {
    user_files: process.env.AWS_S3_USER_FILES_BUCKET_NAME,
    template_files: process.env.AWS_S3_TEMPLATE_FILES_BUCKET_NAME,
    public_files: process.env.AWS_S3_PUBLIC_FILES_BUCKET_NAME
  }
}

function fsStores() {
  return {
    user_files: Path.resolve(__dirname, '../../../user_files'),
    public_files: Path.resolve(__dirname, '../../../public_files'),
    template_files: Path.resolve(__dirname, '../../../template_files')
  }
}

function fallbackStores(primaryConfig, fallbackConfig) {
  return {
    [primaryConfig.user_files]: fallbackConfig.user_files,
    [primaryConfig.public_files]: fallbackConfig.public_files,
    [primaryConfig.template_files]: fallbackConfig.template_files
  }
}

module.exports = {
  FSPersistor: {
    backend: 'fs',
    stores: fsStores()
  },
  S3Persistor: {
    backend: 's3',
    s3: s3Config(),
    stores: s3Stores()
  },
  FallbackS3ToFSPersistor: {
    backend: 's3',
    s3: s3Config(),
    stores: s3Stores(),
    fallback: {
      backend: 'fs',
      buckets: fallbackStores(s3Stores(), fsStores())
    }
  },
  FallbackFSToS3Persistor: {
    backend: 'fs',
    s3: s3Config(),
    stores: fsStores(),
    fallback: {
      backend: 's3',
      buckets: fallbackStores(fsStores(), s3Stores())
    }
  }
}
