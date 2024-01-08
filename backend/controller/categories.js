const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Category = require("../model/category");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");

router.post(
    "/create-category",
    catchAsyncErrors(async (req, res, next) => {
        try {
            let images = [];

            if (typeof req.body.images === "string") {
                images.push(req.body.images);
            } else {
                images = req.body.images;
            }

            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "Category",
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }

            const productData = req.body;
            productData.images = imagesLinks;

            const product = await Category.create(productData);

            res.status(201).json({
                success: true,
                product,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// Get all categories
router.get(
    "/categories",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const categories = await Category.find().sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                categories,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

// Update category by ID
router.put(
    "/update-category/:id",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { title, images } = req.body; // Thay đổi imageUrl thành images để phản ánh cấu trúc của categorySchema

            const updatedCategory = await Category.findByIdAndUpdate(
                req.params.id,
                { title, images },
                { new: true, runValidators: true }
            );

            if (!updatedCategory) {
                return next(new ErrorHandler("Category not found", 404));
            }

            res.status(200).json({
                success: true,
                updatedCategory,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);


// Delete category by ID
router.delete(
    "/delete-category/:id",

    catchAsyncErrors(async (req, res, next) => {
        try {
            const category = await Category.findById(req.params.id);

            if (!category) {
                return next(new ErrorHandler("Category not found", 404));
            }

            await category.remove();

            res.status(200).json({
                success: true,
                message: "Category deleted successfully",
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

module.exports = router;
