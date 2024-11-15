const express = require('express')
const router = express.Router()
const EventController = require('../controller/EventController')

router.route('/')
/**
 * @swagger
 * /api/v1/event:
 *  get:
 *     tags:
 *         - Event
 *     summary: this api gets all event in the db
 *     produces:
 *          - application/json
 *     responses:
 *          200:
 *              description: Ok
 */
.get(EventController.getAllEvent)
/**
 * @swagger
 * /api/v1/event:
 *  post:
 *      tags:
 *          - Event
 *      summary: this api adds an event
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: user
 *            description: the event to create
 *            schema:
 *              type: object
 *              properties:
 *                 title:
 *                      type: string
 *                 description:
 *                      type: string
 *                 venue:
 *                      type: string
 *                 speaker:
 *                      type: string
 *                 category:
 *                      type: string
 *                 status:
 *                      type: string
 *                 date:
 *                      type: string
 *                      format: date
 *                 time:
 *                      type: string
 *      responses:
 *          201:
 *              description: created
 */

.post(EventController.createEvent)

router.route('/:id')
/**
 * @swagger
 * /api/v1/event/{id}:
 *      get:
 *          tags:
 *              - Event
 *          summary: this api fetches a specific event
 *          consumes:
 *             - application/json
 *          produces:
 *             - application/json
 *          parameters:
 *               - in: path
 *                 name: id
 *                 type: String
 *                 require: true
 *          responses:
 *              200:
 *                 description: ok
 */
.get(EventController.getEvent)
/**
 * @swagger
 * /api/v1/event/{id}:
 *      patch:
 *          tags:
 *              - Event
 *          summary: This endpoint update an event
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: id
 *                description: id of the specific event to update
 *                required: true
 *              - in: body
 *                name: data
 *                schema:
 *                  type: object
 *                  properties:
 *                      title:
 *                          type: string
 *                      description:
 *                          type: string
 *                      venue:
 *                          type: string
 *                      speaker:
 *                          type: string
 *                      category:
 *                          type: string
 *                      status:
 *                          type: string
 *                      date:
 *                          type: string
 *                          format: date
 *                      time:
 *                          type: string
 *          responses:
 *              200:
 *                  description: Ok
 * 
 */
.patch(EventController.updateEvent)
/**
 * @swagger
 * /api/v1/event/{id}:
 *     delete:
 *          tags:
 *              - Event
 *          summary: This endpoint deletes an event
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *          responses:
 *              200:
 *                  description: Ok
 */
.delete(EventController.deleteEvent)

module.exports = router