const router = require("express").Router();
const contextualController = require("../controllers/contextual.controller");
const contextualPlayController = require("../controllers/contextualplay.controller");
const uploadFile = require("../controllers/dashboard/uploadFile");
const aws = require("aws-sdk");
const multer = require("multer");
const multers3 = require("multer-s3");

const s3 = new aws.S3();
const upload = multer({
    storage: multers3({
      s3: s3,
      bucket: process.env.BUCKET,
      acl: "public-read",
      key: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  });


// ENDPOINT = /contextual

// DEVICE ENDPOINTS
router.route("/data")
.get(contextualController.getData)
.post(contextualController.postData);

router.get("/play/data", contextualPlayController.getData);

router.post("/play/data/:contextual_id", contextualPlayController.postPlayData);

// router.post("/add_video/:rgetDataetail_id", contextualController.addVideo);

router.post("/upload_video/verify", contextualController.handleVerifyUpload);

router.post("/upload_video/merge", contextualController.handleMerge);

router.post("/upload_video/delete", contextualController.deleteFiles);

router.post("/upload_video/data", contextualController.handleFormData);

// router.post("/update_video/:retail_id",);
// router.post("/data/:retail_id",);
// router.get("/stats",);
// router.delete("/delete",);

// **********************************************************************************************

router.post("/upload",  upload.single("file"),uploadFile.uploadData);

router.get("/list", uploadFile.listData);

router.get("/download/:filename", uploadFile.downloadData);

router.delete("/delete/:filename", uploadFile.deleteData);

module.exports = router;
