const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getProductDetails,
  createproductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/product").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAdminProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProducts)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);
  
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createproductReview);

router
  .route("/review")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
