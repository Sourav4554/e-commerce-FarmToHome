import {body} from 'express-validator'

export const authvalidationResult=[
body('name')
.notEmpty()
.trim()
.withMessage('Name is required'),

body('email')
.notEmpty()
.trim()
.isEmail()
.withMessage('Invalid Email'),

body('password')
.isLength(6)
.trim()
.withMessage('Password containts atleast 6 characters'),

body('phone')
.notEmpty()
.trim()
.isMobilePhone('en-IN')
.withMessage('Invalid phone Number'),

body('whatsapp')
.notEmpty()
.trim()
.isMobilePhone('en-IN')
.withMessage('Invalid phone Number'),

body('role')
.notEmpty()
.withMessage('Role must be required'),

body('district')
.notEmpty()
.trim()
.withMessage('District is required'),

body('panchayth')
.notEmpty()
.trim()
.withMessage('panchayath is required'),

body('ward')
.notEmpty()
.trim()
.withMessage('ward is required'),
]