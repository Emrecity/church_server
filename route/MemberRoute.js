const express = require('express')
const router = express.Router()
const MemberController = require('../controller/MemberController')
const multer  = require('multer')

const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, '/tmp'); // Use /tmp as the storage location
  },
    filename: function (req, file, cb) {
      cb(null, req.body.firstname + file.originalname)
    }
  })

const upload = multer({storage: storage})

router.route('/')
/**
 * @swagger
 * /api/v1/member:
 *  get:
 *     tags:
 *         - Member
 *     summary: this api gets all members in the db
 *     produces:
 *          - application/json
 *     responses:
 *          200:
 *              description: Ok
 */
.get(MemberController.getAllMember)
/**
 * @swagger
 * /api/v1/member:
 *  post:
 *      tags:
 *          - Member
 *      summary: this api adds new member
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: member
 *            description: the member to create
 *            schema:
 *              type: object
 *              properties:
 *                 firstname:
 *                      type: string
 *                 lastname:
 *                      type: string
 *                 othername:
 *                      type: string
 *                 phone:
 *                      type: string
 *                 gender:
 *                      type: string
 *                 role:
 *                      type: array
 *                      items:
 *                         type: string
 *                 dateOfBirth:
 *                      type: string
 *                      format: date
 *                 ageRange:
 *                      type: string
 *      responses:
 *          201:
 *              description: created
 */

.post(upload.single('image'),MemberController.createMember)

router.route('/:id')
/**
 * @swagger
 * /api/v1/member/{id}:
 *      get:
 *          tags:
 *              - Member
 *          summary: this api fetches a specific member
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
.get(MemberController.getMember)
/**
 * @swagger
 * /api/v1/member/{id}:
 *      patch:
 *          tags:
 *              - Member
 *          summary: This endpoint update a member
 *          consumes:
 *              - application/json
 *          produces:
 *              - application/json
 *          parameters:
 *              - in: path
 *                name: id
 *                description: id of the specific member to update
 *                required: true
 *              - in: body
 *                name: data
 *                schema:
 *                  type: object
 *                  properties:
 *                      firstname:
 *                           type: string
 *                      lastname:
 *                           type: string
 *                      othername:
 *                           type: string
 *                      phone:
 *                           type: string
 *                      gender:
 *                           type: string
 *                      role:
 *                           type: array
 *                           items:
 *                              type: string
 *                      dateOfBirth:
 *                          type: string
 *                          format: date
 *                      ageRange:
 *                          type: string
 *          responses:
 *              200:
 *                  description: Ok
 * 
 */
.patch(MemberController.updateMember)
/**
 * @swagger
 * /api/v1/member/{id}:
 *     delete:
 *          tags:
 *              - Member
 *          summary: This endpoint deletes  a member
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
.delete(MemberController.deleteMember)

module.exports = router