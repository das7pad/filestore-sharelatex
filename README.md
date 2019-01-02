filestore-sharelatex
====================

An API for CRUD operations on binary files stored in S3

[![Build Status](https://travis-ci.org/sharelatex/filestore-sharelatex.png?branch=master)](https://travis-ci.org/sharelatex/filestore-sharelatex)

filestore acts as a proxy between the CLSIs and (currently) Amazon S3 storage, presenting a RESTful HTTP interface to the CLSIs on port 3009 by default. Urls are mapped to node functions in https://github.com/sharelatex/filestore-sharelatex/blob/master/app.coffee . URLs are of the form:

* `/project/:project_id/file/:file_id`
* `/template/:template_id/v/:version/:format`
* `/project/:project_id/public/:public_file_id`
* `/project/:project_id/size`
* `/bucket/:bucket/key/*`
* `/heapdump`
* `/shutdown`
* `/status` - returns `filestore sharelatex up` or `server is being shut down` (HTTP 500)
* `/health_check` 

License
-------

The code in this repository is released under the GNU AFFERO GENERAL PUBLIC LICENSE, version 3. A copy can be found in the `LICENSE` file.

Copyright (c) ShareLaTeX, 2014.
