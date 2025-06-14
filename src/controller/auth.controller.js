import bcrypt from  'bcrypt'
import prisma from "../db/db.config.js";
import sendCookie from "../utils/cookie.js";
//register
export const registerUser = async (req, res) => { 
  const { name, email, password } = req.body;
  try {
    if(!name || !email || !password){
      return res.status(400).json({
        success: false,
        message: "please enter all field",

      })
    }
    const checkUser=await prisma.user.findUnique({
      where:{
        email
      }
    })
    if (checkUser)
      return res.status(409).json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
  data: {
    name,
    email,
    password:hashPassword
  },
});
 res.json({
      message:"working fine"
    })
// sendCookie(user, res, "Register successfully", 202);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
export const loginUser = async (req, res) => {  
const { email, password } = req.body;
  try {





    if( !email || !password){
      return res.json({
        success: false,
        message: "please enter all field",

      })
    }
    
      const user=await prisma.user.findUnique({
        where:{
          email
        }
      })

      res.json({
      success: true,
      email, password,
  
      // user: {
      //   id: user.id,
      //   name: user.name,
      //   email: user.email,
      // },
      message:"working",
    });
    if (!user)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

      res.json({
      success: true,
      email, password,
      user,
      // user: {
      //   id: user.id,
      //   name: user.name,
      //   email: user.email,
      // },
      message:"working",
    });

    // const checkPasswordMatch = await bcrypt.compare(
    //   password,
    //   user.password
    // );
    // if (!checkPasswordMatch)
    //   return res.json({
    //     success: false,
    //     message: "Incorrect password! Please try again",
    //   });
      // sendCookie(user, res, "login successfully", 202);
      
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout

export const logoutUser = (req, res) => {
 return res.clearCookie("token", {
    httpOnly: true,
  sameSite: 'none',
      secure: true // 'None' requires HTTPS + secure
  }).json({
    success: true,
    message: "Logged out successfully!",
  });

};


 
  export const myProfile = async (req, res) => {
  if(!req.user){
return res.status(401).json({
  success: false,
    message: "login please",
    user: req.user,
  });
  }
  res.json({
    success: true,
    message: "my profile",
     user: req.user,
  });
};