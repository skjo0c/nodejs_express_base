const express = require("express");
const passport = require("passport");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../../swagger.json");
const login = require("../../../controllers/users/login");
const register = require("../../../controllers/users/register");
const userDetail = require("../../../controllers/users/userDetail");
const postItem = require("../../../controllers/items/postItem");
const updateItem = require("../../../controllers/items/updateItem");
const getAllItem = require("../../../controllers/items/getAllItem");
const getItem = require("../../../controllers/items/getItem");
const deleteItem = require("../../../controllers/items/deleteItem");
const getMyItems = require("../../../controllers/items/getMyItems");
const postBid = require("../../../controllers/bids/postBid");
const getItemBids = require("../../../controllers/bids/getItemBids");
const acceptBid = require("../../../controllers/bids/acceptBid");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));
const requireAuth = passport.authenticate("jwt", { session: false });

router.post("/login", login);
router.post("/register", register);
router.get("/userDetail", requireAuth, userDetail);

router.post("/item", requireAuth, postItem);
router.put("/items/:itemId", requireAuth, updateItem);
router.get("/items", getAllItem);
router.get("/items/:itemId", getItem);
router.delete("/items/:itemId", requireAuth, deleteItem);
router.get("/my-items/", requireAuth, getMyItems);

router.post("/items/:itemId/bid", requireAuth, postBid);
router.get("/items/:itemId/bids", requireAuth, getItemBids);
router.post("/items/:itemId/acceptBid", requireAuth, acceptBid);

module.exports = router;
