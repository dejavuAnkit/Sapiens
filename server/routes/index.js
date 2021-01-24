const express = require('express')
const router = express.Router();

const googleRoutes = require('./google');
const profileRoutes = require('./updateProfile');
const postsRoutes = require("./posts");
const signUpRoutes = require("./signup");
const signInRoutes = require("./signin");
const autoLoginRoutes = require("./autologin");
const purchaseRoutes = require("./purchase");

router.use('/v1/auth/google', googleRoutes);
router.use('/v1/updateprofile', profileRoutes);
router.use('/v1/posts', postsRoutes);
router.use('/v1/signup', signUpRoutes);
router.use('/v1/signin', signInRoutes);
router.use('/v1/autologin', autoLoginRoutes);
router.use('/v1/purchase', purchaseRoutes);

module.exports = router;