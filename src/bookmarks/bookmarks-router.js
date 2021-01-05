const express = require('express');

const bookmarksRouter = express.Router();
const bodyParser = express.json();
const { v4: uuid } = require('uuid');
const logger = require('../logger');
const bookmarks = require('../store');
const { isWebUri } = require('valid-url') 

bookmarksRouter
    .route('/bookmarks')
    .get((req, res) => {
        res
            .status(200)
            .json(bookmarks)
    })
    .post(bodyParser, (req, res) => {
        const { title, url, desc='', rating} = req.body;
        if(!title) {
            logger.error('Title is required');
            return res
                .status(400)
                .json({error: 'Title is required'})
        }
        if(!url) {
            logger.error('URL is required');
            return res
                .status(400)
                .json({error: 'URL is required'});
        }
        if(title.length < 1) {
            logger.error('Title needs to be at least 1 character long');
            return res
                .status(400)
                .json({error: 'Title needs to be at least 1 character long'})
        }
        if(url.length < 5) {
            logger.error('URL needs to be at least 5 characters long');
            return res
                .status(400)
                .json({error: 'URL needs to be at least 5 characters long'})
        }
        if(!isWebUri(url)) {
            logger.error('URL needs to include http/https');
            return res
                .status(400)
                .json({error: 'URL needs to be valid'})
        }
        if(!Number.isInteger(parseInt(rating)) || rating > 5 || rating < 0) {
            logger.error('Rating must be a number')
            return res
                .status(400)
                .json({error: 'Rating must be a number between 0 and 5'})
        }
        const id = uuid();
        const bookmark = {
            id,
            title,
            url,
            desc,
            rating
        };
        bookmarks.push(bookmark);

        logger.info(`Bookmark with id ${id} has been created`)

        res.status(201).location(`http://localhost:8000/bookmarks/${id}`).json({id})
    })

bookmarksRouter
    .route('/bookmarks/:id')
    .get((req, res) => {
        const { id } = req.params;
        const bookmark = bookmarks.find(b => b.id == id)

        if (!bookmark) {
            logger.error(`Bookmark with id ${id} not found.`);
            return res
                .status(404)
                .send('404 Not Found')
        }
        res.status(200).json(bookmark);
    })
    .delete((req, res) => {
        const {id} = req.params;
        const bookmarkIndex = bookmarks.findIndex(bm => bm.id == id);
        
        if(bookmarkIndex === -1) {
            logger.error(`Bookmark with id ${id} not found`);
            return res
                .status(404)
                .send('404 Not Found')
        }

        bookmarks.splice(bookmarkIndex, 1);

        logger.info(`Bookmark with id ${id} deleted`);
        res.status(204).end();

    })

module.exports = bookmarksRouter;