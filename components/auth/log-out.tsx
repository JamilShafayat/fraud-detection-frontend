"use client";

import { useRouter } from "next/navigation";

interface LogoutButtonProps {
    children: React.ReactNode;
}

export const LogoutButton = ({children}: LogoutButtonProps) => {
    const router = useRouter();
    const onClick = () => { 
        localStorage.removeItem ('token'),
        router.push("/auth/login") 
    }

    return (
        <span onClick={onClick} className="cursor-pointer"> {children} </span>
    )
}