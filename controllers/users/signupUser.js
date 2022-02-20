const createError = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { User } = require("../../models");
const createToken = require("../../tokenService/createToken");
const { sendMail } = require("../../helpers");

const signupUser = async (req, res, next) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, "`Email in use`");
  }
  const avatarURL = gravatar.url(email);

  const verificationToken = v4();

  const newUser = await new User({
    name,
    email,
    avatarURL,
    verificationToken,
    subscription,
  });
  await newUser.setPassword(password);
  await newUser.save();

  const token = await createToken(newUser._id);
  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<a target="_blank" href='http://localhost:3000/api/users/${verificationToken}'>Нажмите чтобы подтвердить свой email</a>`,
  };
  await sendMail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
      },
      token,
    },
  });
};

module.exports = signupUser;
