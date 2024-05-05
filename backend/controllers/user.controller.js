import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { checkPassword } from '../utils/utilityFunction.js';
import { newToken } from '../utils/utilityFunction.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Internal server Error',
    });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 8)
  try {
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist === null) {
      await User.create({
        name,
        email,
        password:hash,
      });

      res.status(201).json({
        success: true,
        message: 'User Registered succesfully',
      });
    } else {
      res.json({
        success: false,
        message: 'User is Aleardy Exist',
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: 'Internal server Error',
    });
  }
};

export const signInUser = async (req, res) => {
  const {password, email} = req.body
  // console.log(req.body)
  try {
    const user = await User.findOne({email})
    if (!!!user)
    {
      res.status(400).json({
        success: false,
        message: 'You have to Sign up first !',
      });
    }

    const same = await checkPassword(password, user.password)
    if (same) {
      let token = newToken(user)
      res.status(200).json({success:true,status: 'ok', token})
      return
    }
    res.status(400).json({
      success: false,
      message: 'Invalid Password !',
    });
  } catch (err) {
    console.log('EROR', err);
    res.status(400).json({
      success: false,
      message: 'Internal server error !',
    });
  }
}
