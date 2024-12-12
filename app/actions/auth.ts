"use server";

import { cookies } from "next/headers";
import User from "../models/user";
import connect from "./connect";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const JWT_EXPIRES = 90 * 60 ; 

const generateToken = async ({id} : {id : any})=>{
    return jwt.sign({id} , process.env.JWT!! , {
        expiresIn : JWT_EXPIRES ,
    }) ;
}


export const signup = async (data : any)=>{
    try{
        
        await connect() ;
        
        const hashedPassword = await bcrypt.hash(data.password , 10) ;
        
        console.log("intry333");

        console.log(data);

        const newUser = await User.create({ ...data , password : hashedPassword }) ;
        
        console.log("intry444");

        return {message : "User created successfully" }
    }
    catch(error : any){
        console.error(error)
        return({ message : "user creation failed !", error : error.message})
    }
}

export const login = async ( data : {email : string ; password : string } ) => {
    try{
        await connect() ; 
        const cookie = await cookies() ; 
        const user = await User.findOne({email:data.email}).select("+password") ;
        
        if(!user){

        }
        const isPasswordMatch = await bcrypt.compare(data.password , user.password) ;
        if(!isPasswordMatch){
            return {error : "Incorrect email or password !"} ;
        }
        const userObj = JSON.parse(JSON.stringify(user)) ;
        const token = await generateToken({id : user._id}) ; 
        
        cookie.set("token" , token ,{
            httpOnly : true , 
            maxAge : JWT_EXPIRES , 
            sameSite : "strict" ,
            path : "/",
        });

        return {success : "login successful " , data : userObj};
    }
    catch(error : any){
        console.log(error);
        return{error : "Login failed" , details : error.message} ;
    }
}

export const protect = async () => {
    const cookie = await cookies() ; 

    const token = cookie.get("token")?.value ;
    
    if(!token){
        return {error : "you ate not authoraized to preform this action"}; 
    }
    let decode ; 
    decode = jwt.verify(token, process.env.JWT!!) ;
    if(!decode){
        return{error : "you ate not authoraized to preform this action"}
    }
    return {decode}
}

export const getUser = async () =>{
    
    try {
        connect() ; 
        const {decode} = await protect() ;  
        const user = await User.findById((decode as any).id) ;
        if(!user){
            return {error : "you ate not authoraized to preform this action"}
        }
        const userObj = JSON.parse(JSON.stringify(user));
        return{data : userObj}
    }catch (error){
        return {error : "you ate not authoraized to preform this action"}
    }
}
export const logout = async ()=>{
    
    (await cookies()).delete("token");
    
    return {success : "logout successful"} ;
}