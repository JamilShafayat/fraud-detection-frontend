
"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import React, { useEffect, useState } from 'react';
import jsonwebtoken from 'jsonwebtoken';
import jwt_decode from "jwt-decode";


interface ProfileInfoProps {
    label: string;
}

interface ProfileProps {
    _id: string;
    name: string;
    email: string;
}

export const ProfileInfo = ({label}: ProfileInfoProps) => {
    const [data, setData] = useState<ProfileProps>({} as ProfileProps);
    const [userId, setUserId] = useState("");
    const token = localStorage.getItem('token') || '';

    const getDecodedJwt: any = async () => {
        return jsonwebtoken.decode(token)
    };

    async function processDecodedJwt() {
        try {
          const decodedJwt = await getDecodedJwt();
          setUserId(() => decodedJwt?.id)
        } catch (error) {
          console.error('Error:', error);
        }
      }
    
      
      useEffect(() => {
          const fetchData = async () => {
            try {
                await processDecodedJwt();
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
      }, [userId]);

    return (
        <Card className="w-[600px] h-full max-h-[500px] shadow-md"> 
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    {label}
                </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Id
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {data?._id}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Name
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {data.name}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Email
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {data.email}
                    </p>
                </div>
            </CardContent>
            
        </Card>
    )
}