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

export const FraudCheckForm = () => {
    const [isPending, setTransition] = useTransition();
    const [isFraudPredictionFlag, setIsFraudPredictionFlag] = useState(0);
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof FraudCheckSchema>>({
        resolver: zodResolver(FraudCheckSchema),
        defaultValues: {
            cc_num: '000000',
            amt: '00000',
            unix_time: '12.00',
            merch_lat: '0.00',
            merch_long: '0.00',
        }
    });

    const onSubmit = async (values: z.infer<typeof FraudCheckSchema>) => {
        setSuccess("");
        setError("");

        const data = {
            cc_num: parseFloat(values.cc_num),
            amt: parseFloat(values.amt),
            unix_time: parseFloat(values.unix_time),
            merch_lat: parseFloat(values.merch_lat),
            merch_long: parseFloat(values.merch_long)
        }


        try {
            const firstResponse  = await fetch(`http://localhost:9021/prediction?x=${data.cc_num},${data.amt},${data.unix_time},${data.merch_lat},${data.merch_long}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
            });
      
            if (!firstResponse.ok) {
              setError('Something went wrong!');
              return;
            }
      
            const firstJsonData = await firstResponse.json();
            setIsFraudPredictionFlag(() => firstJsonData[0]);

            const secondResponse  = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/fraud-check`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ ...data, isFraud: isFraudPredictionFlag })
            });
        
            if (!secondResponse.ok) {
                setError('Something went wrong!');
                return;
            }
        
            const jsonData = await secondResponse.json();
            const fraudInWord = isFraudPredictionFlag ? 'Transaction was fraud' : 'Transaction was legal';
            setSuccess(`Check successfuly and ${fraudInWord}!`);
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <CardWrapper title="🔐 Fraud Detection" headerLabel="Fraud Detection Check" backButtonLabel="Remove form" backButtonHref="/dashboard">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[900px]">
                    <div className="space-y-4">
                        <FormField
                            control={form.control} 
                            name="cc_num"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Card Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Provide your card number" type="number" disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control} 
                            name="amt"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Amount of Transaction</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Provide amount of transaction" type="number" disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control} 
                            name="unix_time"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Time of Transaction</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Provide time of transaction" type="number" disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control} 
                            name="merch_lat"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Location Latitude</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Provide location latitude" type="number" disabled={isPending}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control} 
                            name="merch_long"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Location Longitude</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Provide location longitude" type="number" disabled={isPending}/>
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