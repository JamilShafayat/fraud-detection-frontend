"use client";

import { CardWrapper } from "@/components/auth/card-wrapper"
import { FraudCheckSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { fraudDetection } from "@/actions/fraud-detection";

export const FraudCheckForm = () => {
    const [isPending, setTransition] = useTransition();
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof FraudCheckSchema>>({
        resolver: zodResolver(FraudCheckSchema),
        defaultValues: {
            title: "",
            cardNumber: "",
            destination: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof FraudCheckSchema>) => {
        setSuccess("");
        setError("");
    
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/fraud-check`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(values)
          });
    
          if (!response.ok) {
            setError('Something went wrong!');
            return;
          }
    
          const jsonData = await response.json();
          setSuccess('Check successfuly!');
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <CardWrapper headerLabel="Fraud Detection Check" backButtonLabel="Remove form" backButtonHref="/dashboard">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control} 
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Title" type="text" disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control} 
                            name="cardNumber"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Card Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Credit Card Number" type="text" disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control} 
                            name="destination"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Transaction Position" type="text" disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} /> 
                    <FormSuccess message={success} /> 
                    <Button disabled={isPending} type="submit" className="w-full">
                        Check
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}