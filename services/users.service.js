const { hashString, compareHashes, createError, sendMail, jwt } = require('../helpers');
const {User} = require('../models');
const {Types} = require('mongoose');
const findByEmail = async email => {
  return await User.findOne({ email });
};

const findById = async id => {
  return await User.findById(id);
};

const findByVerificationToken = async token => {
  return await User.findOne({verificationToken: token});
};

const findAll = async () => {
  return await User.find();
};

const updateById = async (id, updatedUser) => {
  return await User.findByIdAndUpdate(id, updatedUser);
};

const register = async user => {
  try {
    const existingUser = await findByEmail(user.email);
    if (existingUser) {
      throw createError(409, 'User already exists');
    }

    const verificationToken = new Types.ObjectId();

    const passwordHash = await hashString(user.password)
    const dbUser = (await User.create({...user, verificationToken, password: passwordHash})).toObject();

    const {password, ...newUser} = dbUser;

    await sendMail({
      to: user.email,
      subject: 'Registration',
      html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Press to verify email</a>`
    })

    return newUser;
  } catch (error) {
    console.log(error);
    throw createError(error.status ?? 400, error.errorMessage ?? error.message);
  }
}

const sendNewVerifyLink = async email => {
  try {
    const existingUser = await findByEmail(email);
    if (!existingUser) {
      throw createError(404, 'User not found');
    }

    const verificationToken = new Types.ObjectId();

    await updateById(existingUser.id, {verificationToken});

    await sendMail({
      to: existingUser.email,
      subject: 'New registration link',
      html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Press to verify email</a>`
    })
  } catch (error) {
    console.log(error);
    throw createError(error.status ?? 400, error.errorMessage ?? error.message);
  }
};

const login = async ({email, password}) => {
  const existingUser = await findByEmail(email);
  if (!existingUser || !(await compareHashes(password, existingUser.password))) {
    throw createError(401, 'Email and/or password do not match');
  }

  if (existingUser.verificationToken) {
    throw createError(401, 'Email is not verified');
  }

  const id = existingUser._id;
  const payload = {
    id,
  }
  const token = jwt.sign(payload);

  await saveToken(id, token);

  return {
    token,
  };
}

const saveToken = async (id, token) => {
  return await updateById(id, { token });
}

const logout = async (id) => {
  const existingUser = await findById(id);
  if (!existingUser) {
    throw createError(404, 'User not found');
  }

  await updateById(id, { token: null });
}

const verify = async (token) => {
  const user = await findByVerificationToken(token);

  if (!user) {
    throw createError(404, 'User not found');
  }

  await updateById(user.id, {verificationToken: null});
}

module.exports = {
  register,
  login,
  findAll,
  findById,
  logout,
  saveToken,
  verify,
  sendNewVerifyLink
};
