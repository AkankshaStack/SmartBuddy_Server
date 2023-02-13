const router = require("express").Router();
const conversationController = require("../controllers/conversation.controller");

// DEVICE ENDPOINTS
router.route("/data")
.get(conversationController.getData)
.post(conversationController.postData);

module.exports = router;