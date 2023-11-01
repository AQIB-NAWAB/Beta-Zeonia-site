const ErrorHander = require("../utilis/errorHander");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utilis/jwtToken");
const sendEmail = require('../utilis/sendEmail');
const crypto = require("crypto");
 


// register a user

exports.registerUser = catchAsyncError(async (req, res, next) => {


  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });

 
  await sendEmail({
    email: user.email,
    subject:`Congratulation ${user.name} you are registered succesfully`,
    message:"Welcome to Zeonia family we are glad to have you here and we hope you will enjoy our services and we will try our best to provide you the best services. \n\n Thank you for joining us. \n\n Regards: \n Zeonia Team \n\n For any query please contact us at our site   \n ",
  });

  sendToken(user, 201, res);
 
});

// login user

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has entered email and pass both
  if (!email || !password) {
    return next(new ErrorHander("please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email. or password", 401));
  }

  const isPasswordMatched =await user.comparePassword(password);

  // console.log(isPasswordMatched);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password.", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out",
  });
});

// Forgot password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not Found", 404));
  }

  // Get ResetPassword Token From UserMOdel
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/reset/password/${resetToken}`;
  // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your Password reset token is    :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it  \n\n Regards: \n Zeonia Team \n\n For any query please contact us at our site   \n `;

  try {
      await sendEmail({
        email: user.email,
        subject:`Zeonia password recovery`,
        message,
      });
      res.status(200).json({
          success: true,
          message: `Email sent to ${user.email} succesfully`,
      })
      
  } catch (error) {
      user.getResetPasswordToken = undefined;
      user.resetPasswordUrl = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorHander(error.message, 500))
  }
});


// Reset password

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await  User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if(!user){
      return next(new ErrorHander("Reset password token is invalid or has been expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHander("Passowrd does not match confirm passowrd", 400));
    }

    user.password = req.body.password;
    user.getResetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

});




// UPDATE user password

exports.updatePassowrd = catchAsyncError(async (req,res,next) => {

  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  
  if(req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("Passowrd does not match confirm passowrd", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user,200,res);

  
});





// get user details 
exports.getUserDetails = catchAsyncError(async (req,res,next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});