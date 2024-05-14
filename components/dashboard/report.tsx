"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import React, { useEffect, useState } from 'react';


interface CardWrapperProps {
    children?: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const Dahsboard = ({children, headerLabel, backButtonLabel, backButtonHref, showSocial}: CardWrapperProps) => {
    const [data, setData] = useState(null);

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
        <Card className="w-[400px] shadow-md"> 
            <CardContent>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Two Factor</p>
                </div>
            </CardContent>
        </Card>
    )
}