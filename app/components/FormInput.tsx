"use client" ;

import React from 'react' ;
import { Form , FormField , FormLabel , FormDescription, FormMessage ,FormItem , FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

const FormInput = ({name , lable ,type } : {name:string , lable:string , type : string }) => {
    const form = useFormContext() ; 
    return (
    <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{lable}</FormLabel>
              <FormControl>
                <Input className='text-base text-white ' type={type || "text"} placeholder={lable} {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage className='text-red-500 font-semibold text-sm' />
            </FormItem>
          )}
        />
  )
}

export default FormInput
