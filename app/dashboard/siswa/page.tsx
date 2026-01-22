"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Briefcase,
    GraduationCap,
    LogOut,
    User,
    FileText,
    Building,
    Target,
    TrendingUp,
    Award,
    Calendar,
    BookOpen,
    Bell
} from "lucide-react"
import Link from "next/link"
import { doc, getDoc } from "firebase/firestore"

export default function DashboardSiswaPage() {
    const [user, setUser] = useState<any>(null)
    const [userData, setUserData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const currentUser = auth.currentUser
                if (!currentUser) {
                    router.push("/login")
                    return
                }

                // Ambil data dari Firestore
                const userDoc = await getDoc(doc(db, "users", currentUser.uid))

                if (!userDoc.exists()) {
                    router.push("/daftar")
                    return
                }

                const userData = userDoc.data()

                // Cek apakah tipe user sesuai
                if (userData.userType !== "siswa") {
                    router.push("/dashboard/mitra")
                    return
                }

                setUser(currentUser)
                setUserData(userData)

                // Simpan ke localStorage untuk akses cepat
                localStorage.setItem('userRegistrationData', JSON.stringify(userData))
                localStorage.setItem('userType', userData.userType)
                localStorage.setItem('selectedPackage', userData.package)

            } catch (error) {
                console.error("Auth check error:", error)
                router.push("/login")
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [router])

    const handleLogout = async () => {
        try {
            await signOut(auth)
            localStorage.removeItem('userRegistrationData')
            localStorage.removeItem('userType')
            localStorage.removeItem('selectedPackage')
            router.push("/login")
        } catch (error) {
            console.error("Logout error:", error)
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
                    <p className="mt-4 text-muted-foreground">Memuat dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                            <GraduationCap className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                            <span className="text-xl font-bold text-foreground">CareerReady360</span>
                            <span className="ml-2 text-sm text-muted-foreground">• Dashboard Siswa</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                        </Button>

                        <div className="flex items-center gap-2">
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full"
                                />
                            ) : (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                                    <User className="h-4 w-4 text-primary-foreground" />
                                </div>
                            )}
                            <div className="hidden md:block">
                                <p className="text-sm font-medium">{userData?.personalInfo?.firstName || user?.displayName}</p>
                                <p className="text-xs text-muted-foreground">Siswa</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4" />
                            <span className="ml-2 hidden sm:inline">Keluar</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-4 py-8">
                {/* Welcome Section */}
                <div className="mb-8 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                Selamat datang, {userData?.personalInfo?.firstName || "Siswa"}! 👋
                            </h1>
                            <p className="mt-2 text-muted-foreground">
                                Siap membangun karir impian Anda? Mari kita mulai perjalanan ini bersama.
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <div className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground">
                                <Award className="h-4 w-4" />
                                <span className="text-sm font-medium">Paket {userData?.package || "Starter"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Kesiapan Kerja</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">68%</div>
                            <div className="mt-2 h-2 w-full rounded-full bg-muted">
                                <div className="h-full w-2/3 rounded-full bg-green-500" />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Naik 12% dari bulan lalu</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Portofolio</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground mt-2">Proyek selesai</p>
                            <Button size="sm" className="mt-3 w-full">
                                + Tambah Proyek
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Peluang</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-muted-foreground mt-2">Lowongan sesuai jurusan</p>
                            <Link href="/peluang" className="block">
                                <Button size="sm" variant="outline" className="mt-3 w-full">
                                    Lihat Semua
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Peringkat</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">#42</div>
                            <p className="text-xs text-muted-foreground mt-2">Dari 500+ siswa</p>
                            <div className="mt-2 flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div key={star} className="h-1 w-6 rounded-full bg-yellow-400" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Progress */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Profil Anda</CardTitle>
                                <CardDescription>Lengkapi profil untuk meningkatkan kesiapan kerja</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">Informasi Pribadi</span>
                                            <span className="text-sm text-green-600">80%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-muted">
                                            <div className="h-full w-4/5 rounded-full bg-green-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">Portofolio</span>
                                            <span className="text-sm text-yellow-600">40%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-muted">
                                            <div className="h-full w-2/5 rounded-full bg-yellow-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">Keterampilan</span>
                                            <span className="text-sm text-blue-600">60%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-muted">
                                            <div className="h-full w-3/5 rounded-full bg-blue-500" />
                                        </div>
                                    </div>

                                    <Button className="w-full">Lengkapi Profil</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Opportunities */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Peluang Terbaru</CardTitle>
                                <CardDescription>Lowongan yang cocok dengan profil Anda</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { title: "Frontend Developer Intern", company: "TechStart Inc", location: "Jakarta", type: "Magang", match: "95%" },
                                        { title: "Network Technician", company: "NetCorp Indonesia", location: "Bandung", type: "Full-time", match: "88%" },
                                        { title: "Digital Marketing", company: "GrowthLab", location: "Remote", type: "Part-time", match: "82%" },
                                        { title: "Data Entry Specialist", company: "OfficeWorks", location: "Surabaya", type: "Kontrak", match: "75%" },
                                    ].map((job, index) => (
                                        <div key={index} className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                                    <Building className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">{job.title}</h4>
                                                    <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-green-800" />
                                                    {job.match} Match
                                                </div>
                                                <p className="mt-1 text-sm text-muted-foreground">{job.type}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="mt-6 w-full">
                                    Lihat Semua Peluang
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* User Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Siswa</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <User className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">{userData?.personalInfo?.firstName} {userData?.personalInfo?.lastName}</h4>
                                        <p className="text-sm text-muted-foreground">{userData?.personalInfo?.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Sekolah</p>
                                        <p>{userData?.studentInfo?.school || "Belum diisi"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Jurusan</p>
                                        <p>{userData?.studentInfo?.jurusan || "Belum diisi"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Paket</p>
                                        <p className="capitalize">{userData?.package || "Starter"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Bergabung sejak</p>
                                        <p>{new Date(userData?.registeredAt || Date.now()).toLocaleDateString('id-ID')}</p>
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full">
                                    Edit Profil
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Learning Progress */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Progress Belajar</CardTitle>
                                <CardDescription>Modul yang sedang Anda pelajari</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">CV & Portofolio Digital</span>
                                            <span className="text-sm">65%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-muted">
                                            <div className="h-full w-[65%] rounded-full bg-blue-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">Wawancara Kerja</span>
                                            <span className="text-sm">30%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-muted">
                                            <div className="h-full w-[30%] rounded-full bg-purple-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">Komunikasi Profesional</span>
                                            <span className="text-sm">45%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-muted">
                                            <div className="h-full w-[45%] rounded-full bg-green-500" />
                                        </div>
                                    </div>

                                    <Link href="/belajar">
                                        <Button className="w-full">
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            Lanjutkan Belajar
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Upcoming Events */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Acara Mendatang</CardTitle>
                                <CardDescription>Sesi penting untuk karir Anda</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 rounded-lg border p-3">
                                        <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-blue-100">
                                            <Calendar className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Mock Interview</h4>
                                            <p className="text-sm text-muted-foreground">Besok, 14:00 WIB</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-lg border p-3">
                                        <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-purple-100">
                                            <Briefcase className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Career Fair</h4>
                                            <p className="text-sm text-muted-foreground">Jumat, 10:00 WIB</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-lg border p-3">
                                        <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-green-100">
                                            <BookOpen className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Workshop CV</h4>
                                            <p className="text-sm text-muted-foreground">Senin, 13:00 WIB</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}