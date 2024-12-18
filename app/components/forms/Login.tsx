"use client";
import React from 'react'
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
import { login } from '@/app/actions/auth';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

const loginSchema = z.object({
    email : z.string().email({message : "Please enter a valid email"}) ,
    password : z.string().min(8 , {message :"Password must be at least 8 characters"}),
})

const Login = () => {
    const form = useForm< z.infer<typeof loginSchema> >({
        resolver : zodResolver(loginSchema) , 
        defaultValues : {
            email: "" , 
            password: ""  ,
        }
    }) ; 

    const onSubmit = async (data : z.infer<typeof loginSchema>)=>{
        const res = await login(data) ;
        console.log(res);
        if(res.success){
            toast.success(res.success)
            redirect("/")
        }else{
            toast.error(res.error) ;
        }
    }


  return (
    <MotionItem animate={{opacity : 1 , y : 0 }} initial={{opacity:0 , y:50 }} >
        <MaxWidthWrapper customPadding="py-14" className='bg-black/60 rounded-2xl border border-input flex flex-col items-center w-full'>
        <Logo/>
            <Form {...form}>
                <form  onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-8">
                    {/* username  */}
                    <FormInput name="email" lable="Email" type="text"/>

                    {/* password */}
                    <FormInput name="password" lable="password" type="password"/>


                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            <div className='flex items-center gap-2'>
                <p className='text-gray-50 text-base font-semibold'>Do not have an account ? </p>
                <Link  href={"/signup"}  className='text-rose-500 text-base font-semibold hover:underline  '>sign up !</Link>
            </div>
        </MaxWidthWrapper>
    </MotionItem>
  )
}

export default Login
