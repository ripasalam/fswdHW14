const bcrypt = require("bcrypt")
import { prisma } from "@/utils/prisma";
const jwt = require("jsonwebtoken")


export default async function handler(req, res) {
    if (req.method === "POST"){
    const { email, password} = req.body
    try {
        const user = await prisma.user.findUnique({where:{email}})
        if(!user){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if(!passwordMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        res.json({ token });
    }catch(err){
        res.status(500).json({ data: err.message });
    }
    } else{
        res.status(405).json({ message: "Method not allowed" });
    }
  
}

 