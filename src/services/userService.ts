import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt"


const prisma = new PrismaClient();
const saltRounds = 10;
    
export const createUser = async (data: { name: string; email: string; password: string; role?: Role; adress?: string }) => {
    try {
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  
      return await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          role: data.role ?? Role.STUDENT,
          adress: data.adress,
        },
      });
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error;
    }
  };
  

export const getUserById = async (id : number) => {
    return await prisma.user.findUnique({
        where : {id},
    })
}   

export const updateUser = async(id: number, data : { name? : string, email? : string, password? : string, role? : Role, adress? : string}) => {
    let updatedData = {...data};

    if(data.password) {
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        updatedData.password = hashedPassword;
    }
    
    return await prisma.user.update({
        where : {id},
        data : updatedData
    })
}

export const deleteUser = async (id : number) => {
    return prisma.user.delete({
        where : {id},
    })
}
