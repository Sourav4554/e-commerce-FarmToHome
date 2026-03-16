import express from 'express'
import { authMiddleware } from '../Middlewares/auth.middleware.js'
import { adminroleMiddleware } from '../Middlewares/adminrole.middleware.js'
import { fetchPendingRequestController, approvePendingVendorController, disableVendorAccount,  blockCustomerController } from '../Controllers/admin.controller.js'
const adminRouter=express.Router()

//fetch pending request for admin
adminRouter.get(
    '/pending-request',
    authMiddleware,
    adminroleMiddleware,
    fetchPendingRequestController
    )
//approve pending request of customer
adminRouter.patch(
    '/approve-request/:id',
    authMiddleware,
    adminroleMiddleware,
    approvePendingVendorController
    )
//disable approved accout
adminRouter.patch(
    '/disable-account/:id',
    authMiddleware,
    adminroleMiddleware,
    disableVendorAccount
    )
adminRouter.patch(
    '/block-customer/:id',
    authMiddleware,
    adminroleMiddleware,
    blockCustomerController
    )
export default adminRouter