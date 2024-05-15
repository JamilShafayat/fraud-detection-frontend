
"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import React, { useEffect, useState } from 'react';


interface CheckListProps {
    label: string;
}

interface FraudCheckProps {
    cc_num: number;
    amt: number;
    unix_time: number;
    merch_lat: number;
    merch_long: number;
    isFraud: boolean;
}

export const CheckList = ({label}: CheckListProps) => {
    const [data, setData] = useState<FraudCheckProps[]>([{
        cc_num: 0,
        amt: 0,
        unix_time: 0,
        merch_lat: 0,
        merch_long: 0,
        isFraud: false
    }]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/fraud-check`);
            const jsonData = await response.json();
            setData(jsonData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <Card className="w-[600px] shadow-md h-full max-h-[500px] overflow-y-scroll"> 
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            
            {!!data?.length && data?.map((singleData: FraudCheckProps, index: number) => {
                return (
                    <CardContent className="space-y-4" key={index}>
                        <div className="flex rounded-lg border p-1 shadow-sm h-[110px]">
                            <div className="flex-none w-64">
                                <p className="text-sm font-medium">
                                    Card Number
                                </p>
                                <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                                    {singleData?.cc_num}
                                </p>

                                <p className="text-sm font-medium mt-2">
                                    Is Fraud
                                </p>
                                <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                                    {singleData?.isFraud ? 'True' : 'False' }
                                </p>
                            </div>

                            <div className="flex-none w-32">
                                <p className="text-sm font-medium mt-1">
                                    Amount
                                </p>
                                <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                                    {singleData?.amt}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                )
            })}
        </Card>
    )
}