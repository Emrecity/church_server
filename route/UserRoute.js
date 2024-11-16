const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')

router.route('/')
/**
 * @swagger
 * /api/v1/user:
 *  get:
 *     tags:
 *         - User
 *     summary: this api gets all users in the db
 *     produces:
 *          - application/json
 *     responses:
 *          200:
 *              description: Ok
 */
.get(UserController.getAllUsers)
/**
 * @swagger
 * /api/v1/user:
 *  post:
 *      tags:
 *          - User
 *      summary: this api adds new user
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: user
 *            description: the user to create
 *            schema:
 *              type: object
 *              properties:
 *                 fullname:
 *                      type: string
 *                 email:
 *                      type: string
 *                      format: email
 *                 password:
 *                      type: string
 *                      format: password
 *                 confirmpassword:
 *                      type: string
 *      responses:
 *          201:
 *              description: created
 */

.post(UserController.createUser)

router.route('/:id')
/**
 * @swagger
 * /api/v1/user/{id}:
 *      get:
 *          tags:
 *              - User
 *          summary: this api fetches a specific user
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
.get(UserController.getUser)
/**
 * @swagger
 * /api/v1/user/{id}:
 *      patch:
 *          tags:
 *              - User
 *          summary: This endpoint update a user
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: id
 *                description: id of the specific user to update
 *                required: true
 *              - in: body
 *                name: data
 *                schema:
 *                  type: object
 *                  properties:
 *                      fullname:
 *                          type: string
 *                      email:
 *                          type: string
 *          responses:
 *              200:
 *                  description: Ok
 * 
 */
.patch(UserController.updateUser)
/**
 * @swagger
 * /api/v1/user/{id}:
 *     delete:
 *          tags:
 *              - User
 *          summary: This endpoint deletes  a user
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
.delete(UserController.deleteUser)

router.route('/login')
/**
 * @swagger
 * /api/v1/user/login:
 *      post:
 *          tags:
 *              - User
 *          summary: This endpoint logs in a user
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: body
 *                name: data
 *                schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *          responses:
 *              200:
 *                  description: Ok
 */
.post(UserController.login)
module.exports = router