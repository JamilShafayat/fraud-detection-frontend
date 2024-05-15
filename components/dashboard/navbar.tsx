"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
import { useRouter } from "next/navigation";

export const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const token = localStorage.getItem('token') || '';

    if (!token) {
        router.push('/auth/login')
    }

    return (
        <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className="flex gap-x-2">
                <Button asChild variant={pathname === '/dashboard/fraud-check' ? "default" : "outline"}>
                    <Link href="/dashboard/fraud-check">
                        Fraud Check
                    </Link>         
                </Button>
                <Button asChild variant={pathname === '/dashboard/check-list' ? "default" : "outline"}>
                    <Link href="/dashboard/check-list">
                        History
                    </Link>         
                </Button>
                <Button asChild variant={pathname === '/dashboard/profile' ? "default" : "outline"}>
                    <Link href="/dashboard/profile">
                        Profile
                    </Link>         
                </Button>
                <Button asChild variant={pathname === '/dashboard/user' ? "default" : "outline"}>
                    <Link href="/dashboard/user">
                        Users List
                    </Link>         
                </Button>
            </div>
            <UserButton />
        </nav>
    )
}