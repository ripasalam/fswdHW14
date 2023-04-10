import { prisma } from "@/utils/prisma";
import multer from "multer";
import { verifyToken } from "@/middlewares/auth";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
});



export default async function handler(req, res) {

  const {id} = req.query
  
  
    try {
    switch (req.method) {
      case "GET":
            try {
                
                const books = await prisma.book.findUnique({where:{id: Number(id)}})
                res.json({books})
            } catch (error) {
                console.log(err)
            }
        break;
      case "PUT":
        verifyToken(req, res, async()=>{
          upload.single("image")(req, res, async function (err) {
                if (err) {
                    res.status(400).json({ message: err.message });
                    return;
                }
              
                try {
                   const { title, author, publisher, year, pages } = req.body;
                   console.log(req.body)
                    const updatedBook = await prisma.book.update({
                    where: { id: Number(id) },
                    data: {
                        title,
                        author,
                        publisher,
                        year: parseInt(year),
                        pages: parseInt(pages),
                        },
                    });
                   res.json({ book: updatedBook });
                   
                } catch (err) {
                    console.log(err)
                    res.status(400).json({ message: "Something went wrong" });
                }
            });

        })
            
        break;
        case "DELETE":
          verifyToken (req,res, async()=>{
            try {             
                const books = await prisma.book.delete({
                    where:{id: Number(id)},
                });
                res.json({books})
            } catch (err) {
                console.log(err)
                res.status(400).json({ message: "Something went wrong" });
            }
          })
        break;
      default:
        res.status(400).json({ message: "Invalid request method" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong" });
  }
    
    
    
}

export const config = {
  api: {
    bodyParser: false,
  },
};

