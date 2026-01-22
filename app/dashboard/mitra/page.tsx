"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Briefcase,
    Building,
    LogOut,
    User,
    Users,
    FileText,
    Target,
    TrendingUp,
    Award,
    Calendar,
    Search,
    Filter,
    Bell,
    Download,
    Eye
} from "lucide-react"
import Link from "next/link"
import { getDoc, doc } from "firebase/firestore"

export default function DashboardMitraPage() {
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
                if (userData.userType !== "mitra") {
                    router.push("/login")
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
                    <p className="mt-4 text-muted-foreground">Memuat dashboard mitra...</p>
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
                            <Building className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                            <span className="text-xl font-bold text-foreground">CareerReady360</span>
                            <span className="ml-2 text-sm text-muted-foreground">• Dashboard Mitra</span>
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
                                <p className="text-xs text-muted-foreground">Mitra</p>
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
                                Selamat datang, {userData?.companyInfo?.companyName || "Mitra"}! 👋
                            </h1>
                            <p className="mt-2 text-muted-foreground">
                                Temukan talenta terbaik SMK untuk berkembang bersama perusahaan Anda.
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
                            <CardTitle className="text-sm font-medium">Total Kandidat</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,248</div>
                            <p className="text-xs text-muted-foreground mt-2">Siswa SMK aktif</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Lowongan Aktif</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground mt-2">Lowongan yang Anda buka</p>
                            <Button size="sm" className="mt-3 w-full">
                                + Buat Lowongan
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Pelamar</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">42</div>
                            <p className="text-xs text-muted-foreground mt-2">Pelamar bulan ini</p>
                            <Link href="/pelamar" className="block">
                                <Button size="sm" variant="outline" className="mt-3 w-full">
                                    Lihat Pelamar
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Match Rate</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">92%</div>
                            <p className="text-xs text-muted-foreground mt-2">Kesesuaian kandidat</p>
                            <div className="mt-2 flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div key={star} className="h-1 w-6 rounded-full bg-green-400" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Recent Candidates */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Kandidat Terbaru</CardTitle>
                                <CardDescription>Siswa dengan profil terbaik untuk perusahaan Anda</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { name: "Rina Sari", school: "SMKN 1 Jakarta", major: "Rekayasa Perangkat Lunak", score: "95%", skills: ["JavaScript", "React", "UI/UX"] },
                                        { name: "Budi Santoso", school: "SMKN 3 Bandung", major: "Teknik Komputer Jaringan", score: "92%", skills: ["Networking", "Security", "Linux"] },
                                        { name: "Sari Dewi", school: "SMKN 5 Surabaya", major: "Multimedia", score: "90%", skills: ["Adobe Creative", "3D Modeling", "Video Editing"] },
                                        { name: "Ahmad Fauzi", school: "SMKN 2 Medan", major: "Teknik Mesin", score: "88%", skills: ["AutoCAD", "CNC", "Maintenance"] },
                                    ].map((candidate, index) => (
                                        <div key={index} className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                                    <User className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">{candidate.name}</h4>
                                                    <p className="text-sm text-muted-foreground">{candidate.school} • {candidate.major}</p>
                                                    <div className="mt-1 flex flex-wrap gap-1">
                                                        {candidate.skills.map((skill, i) => (
                                                            <span key={i} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-green-800" />
                                                    {candidate.score} Match
                                                </div>
                                                <div className="mt-2 flex gap-2">
                                                    <Button size="sm" variant="outline">
                                                        <Eye className="h-3 w-3" />
                                                    </Button>
                                                    <Button size="sm">
                                                        <Briefcase className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="mt-6 w-full">
                                    <Search className="mr-2 h-4 w-4" />
                                    Cari Kandidat Lainnya
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Job Postings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Lowongan Aktif</CardTitle>
                                <CardDescription>Lowongan yang sedang dibuka oleh perusahaan Anda</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { title: "Frontend Developer Intern", type: "Magang", applicants: 24, status: "Active", date: "12 Des 2024" },
                                        { title: "Network Technician", type: "Full-time", applicants: 18, status: "Active", date: "10 Des 2024" },
                                        { title: "Digital Marketing Trainee", type: "Kontrak", applicants: 15, status: "Draft", date: "8 Des 2024" },
                                    ].map((job, index) => (
                                        <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                                            <div>
                                                <h4 className="font-medium">{job.title}</h4>
                                                <div className="mt-2 flex items-center gap-4">
                                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                                        {job.type}
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {job.applicants} pelamar
                                                    </span>
                                                    <span className="text-sm text-muted-foreground">
                                                        Dibuat: {job.date}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${job.status === "Active"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                    }`}>
                                                    {job.status}
                                                </span>
                                                <Button size="sm" variant="outline">
                                                    Edit
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button className="mt-6 w-full">
                                    + Buat Lowongan Baru
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Company Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Perusahaan</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                        <Building className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">{userData?.companyInfo?.companyName || "Belum diisi"}</h4>
                                        <p className="text-sm text-muted-foreground">{userData?.personalInfo?.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Jenis Perusahaan</p>
                                        <p>{userData?.companyInfo?.companyType || "Belum diisi"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Penanggung Jawab</p>
                                        <p>{userData?.personalInfo?.firstName} {userData?.personalInfo?.lastName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Jabatan</p>
                                        <p>{userData?.companyInfo?.position || "Belum diisi"}</p>
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
                                    Edit Profil Perusahaan
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Aksi Cepat</CardTitle>
                                <CardDescription>Kelola dengan mudah</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button className="h-auto flex-col items-center justify-center gap-2 py-4">
                                        <Search className="h-5 w-5" />
                                        <span className="text-xs">Cari Kandidat</span>
                                    </Button>

                                    <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 py-4">
                                        <Filter className="h-5 w-5" />
                                        <span className="text-xs">Filter Lanjutan</span>
                                    </Button>

                                    <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 py-4">
                                        <Download className="h-5 w-5" />
                                        <span className="text-xs">Export Data</span>
                                    </Button>

                                    <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 py-4">
                                        <Users className="h-5 w-5" />
                                        <span className="text-xs">Kelola Tim</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Analytics */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Analitik Rekrutmen</CardTitle>
                                <CardDescription>Performa bulan ini</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">Waktu Proses</span>
                                            <span className="text-sm">7 hari</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-muted">
                                            <div className="h-full w-[70%] rounded-full bg-blue-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">Kualitas Kandidat</span>
                                            <span className="text-sm">92%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-muted">
                                            <div className="h-full w-[92%] rounded-full bg-green-500" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">Retensi</span>
                                            <span className="text-sm">85%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-muted">
                                            <div className="h-full w-[85%] rounded-full bg-purple-500" />
                                        </div>
                                    </div>

                                    <Button variant="outline" className="w-full">
                                        <TrendingUp className="mr-2 h-4 w-4" />
                                        Lihat Laporan Lengkap
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Upcoming Interviews */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Wawancara Mendatang</CardTitle>
                                <CardDescription>Jadwal wawancara Anda</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 rounded-lg border p-3">
                                        <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-blue-100">
                                            <Calendar className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Rina Sari</h4>
                                            <p className="text-sm text-muted-foreground">Frontend Intern • Besok, 10:00 WIB</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-lg border p-3">
                                        <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-purple-100">
                                            <Calendar className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Budi Santoso</h4>
                                            <p className="text-sm text-muted-foreground">Network Tech • Jumat, 14:00 WIB</p>
                                        </div>
                                    </div>

                                    <Button variant="outline" className="w-full">
                                        + Tambah Wawancara
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}