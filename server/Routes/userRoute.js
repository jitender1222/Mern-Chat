import express from "express";

const router = express.Router();

router.get("/api/v1/register", registerUser);
