import { Router } from "express";
import { login , register, logout, profile, change, allUsers, verifyToken} from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
const router = Router();

router.post('/register',validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema),login);
router.put('/register', validateSchema(loginSchema),change);
router.post('/logout', logout);
router.get('/verify', verifyToken);
router.get('/profile', authRequired, profile);
router.get('/', allUsers);

export default router;