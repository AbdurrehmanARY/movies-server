import jwt from "jsonwebtoken";
const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({id: user.id,
        email: user.email,
        name: user.name, }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: 'none',
      secure: true // 'None' requires HTTPS + secure

    })
  return  res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message,
    });
};

export default sendCookie;