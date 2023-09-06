import { ForbiddenException, Injectable } from "@nestjs/common";
import { Users, Notes } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import  *  as argon  from "argon2";
@Injectable({})
export class AuthService{
    constructor( private prismaService: PrismaService){

    }
    async register(input: AuthDto  ){
        const hashPW = await argon.hash(Buffer.from(input.passWord))
        try{
            const user = await this.prismaService.users.create({
                data:{
                    email : input.email,
                    hashedPassword: hashPW,
                    firstName: "Phuoc1",
                    lastName: "cao"
                },
                select:
                {
                    id: true,
                    firstName: true,
                    lastName: true,
                    createdAt: true
                }
            })
            return user
        }catch (error){
            if(error.code === 'P2002')
                throw new ForbiddenException("Email is exists")
        }
       
 
    }
    async login(input: AuthDto){
        const user = await this.prismaService
                        .users.findUnique({
                            where:{
                                email: input.email
                            }
                        } )
        if(!user){
            throw new ForbiddenException(
                "User not Found"
            )
        }
        const checkPass = await argon.verify(
            user.hashedPassword,
            input.passWord
        )
        if(!checkPass){
            throw new ForbiddenException(
                "Password not correct"
            )
        }
        delete user.hashedPassword
        return user
 
    }
}