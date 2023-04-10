const bcrypt = require("bcrypt")
import { prisma } from "@/utils/prisma";


export default async function handler(req, res) {
    if (req.method === "POST"){
    const {name, email, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 10);

        try {
            const { password: passwordDB, ...user }  = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            })
            res.json({ user });
        } catch (error) {
            res.status(400).json({ message: "User already exists" });        
        }
    } else{
        res.status(405).json({ message: "Method not allowed" });
    }
  
}

 