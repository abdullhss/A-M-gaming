"use client";
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form';
import z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormInput from '../FormInput';
import MotionItem from '../defaults/MotionItme';
import MaxWidthWrapper from '../defaults/MaxWidthWrapper';
import Logo from '../defaults/Logo';
import Link from 'next/link';
import { FileUploadDemo } from '../FileUpload';
import { signup } from '@/app/actions/auth';
import { toast } from 'react-toastify';

const signupSchema = z.object({
    email : z.string().email({message : "Please enter a valid email"}) ,
    password : z.string().min(8 , {message :"Password must be at least 8 characters"}),
    confirmPassword : z.string().min(8 , {message :"Password must be at least 8 characters"}),
    name : z.string().min(5  , {message :"name must be at least 5 characters"}) , 
    avatar : z.any() 
}).refine((data)=>data.password===data.confirmPassword , {message : "passwords dose not match" , path:["confirmPassword"]})

const Signup = () => {

    const [isPending , startTransition] = useTransition() ;

    const form = useForm< z.infer<typeof signupSchema> >({
        resolver : zodResolver(signupSchema) , 
        defaultValues : {
            email: "" , 
            password: "" ,
            confirmPassword:"",
            name : "",
            avatar : "" ,
        }
    }) ; 

    const onSubmit = async (data : z.infer<typeof signupSchema>)=>{
        startTransition(async()=>{
            if(data.avatar){
                const formData = new FormData() ; 
                formData.append("file" , data.avatar[0]) ;
                formData.append("upload_preset" , "gameStore");
                try{
                    const res :any = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL! , {
                        method:"POST",
                        body:formData,
                    })
                    
                    const cloudinaryData = await res.json();
                    data.avatar = {
                        secure_url : cloudinaryData.secure_url , 
                        public_id  : cloudinaryData.public_id , 
                    }
                    
                    const response :any = await signup(data) ;
                    console.log(response);
                    console.log(response.message);
                    
                    if( response.message === "User created successfully"){
                        toast.success(response.message);
                    }else{
                        toast.error(response.error) ;
                    }
                }catch(error){
                    console.log(error);
                }
                
            }
        })
    }


  return (
    <MotionItem animate={{opacity : 1 , y : 0 }} initial={{opacity:0 , y:50 }} >
        <MaxWidthWrapper customPadding="py-14" className='bg-black/80 rounded-2xl border border-input flex flex-col items-center w-full'>
        <Logo/>
            <Form {...form}>
                <form  onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-8">
                    {/* file upload */}
                    <FileUploadDemo name="avatar" />
                    {/* username  */}
                    <FormInput name="email" lable="Email" type="text"/>

                    {/* name */}
                    <FormInput name="name" lable="name" type="name"/>

                    {/* password */}
                    <FormInput name="password" lable="password" type="password"/>


                    {/* confirm password */}
                    <FormInput name="confirmPassword" lable="confirm Password" type="password"/>

                    <Button disabled={isPending} type="submit">Submit</Button>
                </form>
            </Form>
            <div className='flex items-center gap-2'>
                <p className='text-gray-50 text-base font-semibold'>Alrady Have An Account ? </p>
                <Link  href={"/login"}  className='text-rose-500 text-base font-semibold hover:underline  '>log in now !</Link>
            </div>
        </MaxWidthWrapper>
    </MotionItem>
  )
}

export default Signup
