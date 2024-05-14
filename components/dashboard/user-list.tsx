
"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import React, { useEffect, useState } from 'react';


interface UserListProps {
    label: string;
}

interface UserProps {
    name: string;
    email: string;
}

export const UserList = ({label}: UserListProps) => {
    const [data, setData] = useState<UserProps[]>([{
        name: "",
        email: "",
    }]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`);
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
            
            {!!data?.length && data?.map((singleData: UserProps, index: number) => {
                return (
                    <CardContent className="space-y-4" key={index}>
                        <div className="flex rounded-lg border p-2 shadow-sm h-[70px]">
                            <div className="flex-none w-64">
                                <p className="text-sm font-medium">
                                    Name
                                </p>
                                <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                                    {singleData?.name}
                                </p>
                            </div>

                            <div className="flex-1 w-32">
                                <p className="text-sm font-medium mt-1">
                                    Email
                                </p>
                                <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                                    {singleData?.email}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                )
            })}
        </Card>
    )
}