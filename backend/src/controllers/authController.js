import { success } from "zod";
import { userRegister, checkUserIsExist } from "../service/AuthService.js";
import { registerUserSchema, loginSchema } from "../validation/authValidation.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/token.js";

export const registerUserController = async (req, res) => {
  try {
    const parsed = registerUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(401).json({
        success: false,
        message: parsed.error.flatten().fieldErrors,
      });
    }
    const { username, password, email } = parsed.data;
    // Hash password sebelum simpan ke database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await userRegister({
      username,
      password: hashedPassword,
      email,
    });
    return res.status(201).json({
      success: true,
      message: "user baru berhasil ditambah",
      data: user,
    });
  } catch (err) {
    console.error(err);
    if (err.sqlState === '23000') {
      res.status(409).json({
        success: false,
        message: 'username atau email sudah terpakai'
      })
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginController = async(req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(401).json({
        success: false,
        message: parsed.error.flatten().fieldErrors
      });
    }

    const { username, password } = parsed.data;
    const isUserExist = await checkUserIsExist({ username });
    if (!isUserExist) {
      return res.status(401).json({
        success: false,
        message: 'password atau username salah'
      });
    }

    const { password: hashedPassword } = isUserExist;
    const match = bcrypt.compare(password, hashedPassword);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: 'password atau username salah'
      });
    }

    const { id, role, username: usernameUser } = isUserExist;
    const token = generateToken({ id, role });
    return res.status(200).json({
      success: true,
      message: 'login berhasil',
      data: {
        accessToken: token,
        user: { 
          id,
          username: usernameUser,
          role
        }
      }
    })

  } catch(err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}