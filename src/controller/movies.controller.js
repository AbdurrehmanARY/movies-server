import prisma from "../db/db.config.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


export const handleImageUpload = async (req, res) => {
   
    try {
      console.log("file",req.file)
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      
      const url = "data:" + req.file.mimetype + ";base64," + b64;
      const resultUrl = await uploadOnCloudinary(url);
      if(!resultUrl) {
        return res.json({
          success: false,
          message: "Image upload failed",
          resultUrl
        });
      }
    const result=resultUrl?.secure_url
    console.log(result)
      res.json({
        success: true,
        result,
      });
    } 
    catch (error) {
      res.json({
        success: false,
        message: "Error occured",
       
      });
    }
  };


// add product
  export const addMovie = async (req, res) => {     
    try {
       const {title,date,movieImage}=req.body
      if (
        !title ||!date ||!movieImage 
      ) {
        return res.status(400).json({
          success: false,
          message: "All required fields must be provided.",
        });
      }
      const newMovie=await prisma.movie.create({
        data:{
        title,date,movieImage
        }
        
        })
        if(!newMovie){
          return res.status(400).json({
            success: false,
            message:'movie addition failed',
          });
        }
        return res.status(201).json({
            success: true,
            message:'movie added  successfully ',
            data: newMovie,
          })
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
  };
  
  //edit a product
   export const editMovie = async (req, res) => {
      const {title,date,image}=req.body
    try {
      const {id} = req.params;
      const findMovie=await prisma.movie.findUnique({
        where:{
             id:Number(id)
        }
      })
      if (!findMovie)
        return res.status(404).json({
          success: false,
          message: "movie not found",
        });
const updatedMovie = await prisma.movie.update({
  where: {
    id:Number(id)
  },
  data:{
    title,date,movieImage:image
  }
})

      if(updatedMovie){
        return res.status(200).json({
        success: true,
        message: "movie updated successfully",
        data: updatedMovie,
      });
      }
      else {
        return res.status(500).json({
          success:'false',
          message:'error while updating product'
        })
      }

    } 
    catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
  };

  //delete a product
//   export const deleteProduct = async (req, res) => {
    
//     try {
//       const { id } = req.params;
     
//     const productId = parseInt(id, 10);
 

//     if(!productId){
//       res.json({
//         message:"product id not found"
//       })
//     }

//       const product = await prisma.products.findUnique({
//         where: {
//           id: productId,
//         },
//       })
      
  
//       if (!product)
//         return res.status(404).json({
//           success: false,
//           message: "Product not found",
//         });
//       const response= await prisma.products.delete({
//           where: {
//             id: productId,
//           },
//         });
  
//       res.status(200).json({
//         success: true,
//         message: "Product delete successfully",
//       });
//     } catch (e) {
//       console.log(e);
//       res.status(500).json({
//         success: false,
//         message: "Error occured",
//       });
//     }
//   }

  // //fetch all products
  
  export const fetchAllMovies = async (req, res) => {
    let { page  } = req.query;
    let limit=8
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    const skip =(page - 1) * limit;

        try {
      const listOfMovies = await prisma.movie.findMany({
         skip:Number(skip),
      take: limit,
      orderBy: { createdAt: "desc" }, // optional: newest first

      }
      )
      const total = await prisma.movie.count({
    });
      res.status(200).json({
        success: true,
        message: "movies fetched successfully",
        data: listOfMovies,
        total,
      page,
      totalPages: Math.ceil(total / limit),
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
  }


//   export const getProductDetail=async(req,res)=>{
//     try{
// if(!req.params){
//   res.json({
//     message:'product id not found'
//   })
// }
// const product= await prisma.products.findUnique({
//   where:{
//     id:parseInt(req.params.id)
//   }
// })
//       if(product){
//         res.json({
//           message :"product get successfully",
//           product
//         })
//       }
//       else{
//         res.json({
//           message :"product not found",
//         })
//       }
//     }
//     catch(e){
//       console.log(e)

//     }
//   }