import {Router} from "express";
import {register, verifyEmail, login, logout, reVerifyEmail, refresh, me} from "../controllers/authHandler"
import {forgotPassword, resetPassword} from "../controllers/authPasswordHandler"
import {globalLimiter, loginRateLimiter, registerRateLimiter, refreshRateLimiter} from "../middleware/rateLimiter"
import {validate} from "../middleware/validateSchema"
import {registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema} from "../validators/authSchema"
const router = Router();

router.post("/register", validate(registerSchema), registerRateLimiter, register);
router.get("/verify-email", globalLimiter, verifyEmail);
router.post("/resend-email-confirmation", globalLimiter, reVerifyEmail)
router.post("/login", validate(loginSchema), loginRateLimiter, login)
router.get("/logout", logout)
router.post("/refresh", refreshRateLimiter, refresh)
router.post("/forgot-password", validate(forgotPasswordSchema), globalLimiter, forgotPassword)
router.post("/reset-password", validate(resetPasswordSchema), globalLimiter, resetPassword)
router.get("/me", me)

export default router