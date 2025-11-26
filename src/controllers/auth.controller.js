import { validationResult } from "express-validator";
import {findUserEmail, create} from "../models/user.model.js";
/**
 * POST /login
 * @summary Login user
 * @description Endpoint untuk login user menggunakan email & password statis.
 * @tags Auth
 * @param {object} request.body.required - Data login
 * @example request - contoh body
 * {
 *   "email": "ari@gmail.com",
 *   "password": "123"
 * }
 * @return {object} 201 - Login success response
 * @example response - Login success
 * {
 *   "success": true,
 *   "message": "Login success"
 * }
 * @return {object} 401 - Login failed response
 * @example response - Login failed
 * {
 *   "success": false,
 *   "message": "Login Failed"
 * }
 */
export async function registerController(req, res) {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json({
        success: false,
        message: "error validate",
        result: result.array()
      });
    }

    const { email, password } = req.body;

    const extUser = await findUserEmail(email);
    if (extUser) {
      return res.status(400).json({
        success: false,
        message: "Email sudah terdaftar"
      });
    }

    const newUser = await create(email, password);

    res.status(201).json({
      success: true,
      message: "Register berhasil",
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Register gagal",
      error: error.message
    });
  }
}

/**
 * POST /register
 * @summary Register user
 * @description Endpoint untuk registrasi user menggunakan email & password.
 * @tags Auth
 * @param {object} request.body.required - Data register
 * @example request - contoh body
 * {
 *   "email": "user@gmail.com",
 *   "password": "abc123"
 * }
 * @return {object} 201 - Register success response
 * @example response
 * {
 *   "success": true,
 *   "message": "Register success"
 * }
 */
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const user = await findUserEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email tidak ditemukan"
      });
    }

    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: "Password salah"
      });
    }

    res.status(200).json({
      success: true,
      message: "Login berhasil",
      data: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login gagal",
      error: error.message
    });
  }
}
