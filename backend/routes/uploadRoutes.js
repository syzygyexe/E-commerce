import express from "express";
import multer from "multer";
// Path provides the extension of a file name(JPG, PNG and so forth).
import path from "path";

const router = express.Router();

// Image storage object which takes two functions.
// Namely, folder direction function and file upload function.
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // We call our callback null, because there is no error.
    // Then we add directory whicch is going to be used in order to upload images.
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    // Passing null for the error.
    // Field name specified in the form + Current time + File extension.
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  // Check for allowed filetypes with the type of the file.
  const extensionName = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  // Check for allowed filetypes with the mimetype.
  // EX: Every file has a mime type. Like /jpeg, /png, etc.
  const mimetype = filetypes.test(file.mimetype);

  // If both extensionName and mimetype has a value of true after testing, return null for the error.
  if (extensionName && mimetype) {
    return cb(null, true);
    // If either of the two has a value of false, callback an error.
  } else {
    cb("Image only!");
  }
}

// Use our storage and filter in order to upload an image.
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// This router is hooked to api/upload
// A path, with an upload middleware.
// We set our upload.single to an image, because that is the name which we have set in our front-end(ProductEditScreen).
router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
