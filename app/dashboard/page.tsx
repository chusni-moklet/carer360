"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"

export default function DashboardIndexPage() {
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const currentUser = auth.currentUser
                if (!currentUser) {
                    router.push("/login")
                    return
                }

                // Cek tipe user dari localStorage
                const savedUserType = localStorage.getItem('userType')

                if (savedUserType === 'siswa') {
                    router.push("/dashboard/siswa")
                } else if (savedUserType === 'mitra') {
                    router.push("/dashboard/mitra")
                } else {
                    // Jika belum daftar, arahkan ke halaman daftar
                    router.push("/daftar?mode=complete&type=siswa")
                }
            } catch (error) {
                console.error("Auth check error:", error)
                router.push("/login")
            }
        }   

        checkAuth()
    }, [router])

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
                <p className="mt-4 text-muted-foreground">Mengarahkan ke dashboard...</p>
            </div>
        </div>
    )
}