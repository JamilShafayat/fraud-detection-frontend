
"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import React, { useCallback, useEffect, useState } from 'react';
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
    const [state, setState] = useState({
        data: {} as ProfileProps,
        userId: "",
        token: ""
    });

    // Get token and userId once on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('token') || '';

            const decodedJwt = jsonwebtoken.decode(token);

            setState((prevState) => ({
                ...prevState,
                token,
                userId: decodedJwt?.id || ''
            }));
        }
    }, []);

    const fetchData = useCallback(async () => {
        if (state.userId) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${state.userId}`);
                const jsonData = await response.json();
                setState((prevState) => ({
                    ...prevState,
                    data: jsonData
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }, [state.userId]);

    // Fetch user data when userId is set
    useEffect(() => {
        fetchData();
    }, [fetchData]);
      

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
                        {state.data?._id}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Name
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {state.data.name}
                    </p>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Email
                    </p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {state.data.email}
                    </p>
                </div>
            </CardContent>
            
        </Card>
    )
}