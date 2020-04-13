const express = require('express');
const Router = express.Router();
const axios = require('axios');

const errorHandler = require('../handlers/errorHandler');
const dataHandler = require('../handlers/dataHandler');
const tokenHandler = require('../handlers/tokenHandler');

Router.get('/', (req, res) => {
	axios
		.get(
			`https://api.spotify.com/v1/artists/${encodeURIComponent(req.query.id)}`,
			tokenHandler.getHeader()
		)
		.then(artistData => {
			const artistMeta = artistData.data;

			res.json({
				name: dataHandler.artist(artistMeta)
			});
		})
		.catch(err => {
			errorHandler.handle(err);
			res.json(errorHandler.build(errorHandler.errors.invalidId));
		});
});

module.exports = Router;
