const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const mongoose = require('mongoose')

const register = async (req, res) => {
     try {
          const { fullName, email, password, confirmPassword } = req.body
          if (!fullName || !password || !email) {
               return res.status(400).send({
                    success: false,
                    message: "All fields are required."
               })
          }

          const isRegistered = await User.findOne({ email })
          if (isRegistered) {
               return res.status(400).send({
                    success: false,
                    message: "Account already registered. Please login."
               })
          }

          if (password !== confirmPassword) {
               return res.status(400).send({
                    success: false,
                    message: "Password should match."
               })
          }

          const hashPassword = await bcrypt.hash(password, 10)
          const user = await User.create({
               fullName,
               email,
               password: hashPassword
          })

          return res.status(201).send({
               success: true,
               message: "Registered successfully.",
               user
          })

     } catch (error) {
          return res.status(500).send({
               success: false,
               message: "Error in sign up."
          })
     }
}

const login = async (req, res) => {
     try {
          const { email, password } = req.body

          if (!email || !password) {
               return res.status(400).send({
                    success: false,
                    message: "All fields are required."
               })
          }

          const user = await User.findOne({ email })
          if (!user) {
               return res.status(400).send({
                    success: false,
                    message: "Invalid email or password."
               })
          }

          const isPasswordCorrect = await bcrypt.compare(password, user.password)

          if (!isPasswordCorrect) {
               return res.status(400).send({
                    success: false,
                    message: "Invalid email or password."
               })
          }

          delete user.password

          return res.status(200).send({
               success: true,
               message: "Login successfully.",
               user
          })

     } catch (error) {
          return res.status(500).send({
               success: false,
               message: "Error in login."
          })
     }
}

const getAllContacts = async (req, res) => {
     try {
          const id = req.params.id;
          if (!mongoose.Types.ObjectId.isValid(id)) {
               return res.status(400).send({
                    success: false,
                    message: "Invalid user id.",
               })
          }

          const contacts = await User.find({ _id: { $ne: id } })

          if (!contacts) {
               return res.status(404).send({
                    success: false,
                    message: "Contacts not found.",
               })
          }

          return res.status(200).send({
               success: true,
               message: "Contacts fetched successfully.",
               contacts
          })

     } catch (error) {
          console.error(error);
          return res.status(500).send({
               success: false,
               message: "Error fetching contacts."
          })
     }
}

const uploadImage = async (req, res) => {
     try {
          const { id, photo } = req.body;

          const result = await User.updateOne(
               { _id: id },
               { $set: { photo: photo } }
          );

          if (!result) {
               return res.status(400).send({
                    success: false,
                    message: "Image did not upload."
               });
          }

          const user = await User.findOne({ _id: id });
          const image = user.photo;

          return res.status(201).send({
               success: true,
               message: "Image uploaded successfully.",
               photo: image
          });
     } catch (error) {
          console.error(error);
          return res.status(500).send({
               success: false,
               message: "Error in uploading image."
          });
     }
};


const userController = {
     register,
     login,
     getAllContacts,
     uploadImage
}

module.exports = userController