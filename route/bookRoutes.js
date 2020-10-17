const express = require("express");
const bookController = require("../controller/bookControllers");

const router = express.Router();

// Create 1 book
router.post("/create", bookController.create_book);

// Create n book
router.post("/create-many", bookController.createMany_book);

// Update 1 book
router.put("/edit/:id", bookController.update_book);

// Get 1 book
router.get("/get/:id", bookController.get_book);

// Get All book
router.get("/get", bookController.getAll_book);

// Delete 1 book
router.delete("/delete/:id", bookController.delete_book);

module.exports = router;
