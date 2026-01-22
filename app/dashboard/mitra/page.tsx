"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
    Eye,
    Mail,
    Phone,
    MapPin,
    Settings,
    HelpCircle,
    FileSearch,
    CheckCircle,
    Clock,
    Star,
    ChevronRight,
    Plus,
    MoreVertical,
    BarChart3,
    PieChart,
    TrendingDown,
    TrendingUp as TrendingUpIcon,
    Shield,
    Zap,
    Sparkles
} from "lucide-react"
import Link from "next/link"
import { getDoc, doc } from "firebase/firestore"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardMitraPage() {
    const [user, setUser] = useState<any>(null)
    const [userData, setUserData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("overview")
    const [notifications, setNotifications] = useState(3)
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

    // Ganti stats array dengan ikon yang lebih tepat
    const stats = [
        {
            label: "Total Kandidat",
            value: "1,248",
            change: "+12%",
            trend: "up",
            icon: Users, // Sudah tepat
            color: "bg-blue-500",
            iconColor: "text-blue-600"
        },
        {
            label: "Lowongan Aktif",
            value: "3",
            change: "+1",
            trend: "up",
            icon: Briefcase, // Sudah tepat
            color: "bg-green-500",
            iconColor: "text-green-600"
        },
        {
            label: "Pelamar Baru",
            value: "42",
            change: "+8",
            trend: "up",
            icon: TrendingUp, // Lebih tepat untuk pelamar baru
            color: "bg-purple-500",
            iconColor: "text-purple-600"
        },
        {
            label: "Match Rate",
            value: "92%",
            change: "+5%",
            trend: "up",
            icon: Target, // Sudah tepat
            color: "bg-orange-500",
            iconColor: "text-orange-600"
        },
    ]

    // Kandidat terbaru
    const candidates = [
        {
            id: 1,
            name: "Rina Sari",
            school: "SMKN 1 Jakarta",
            major: "Rekayasa Perangkat Lunak",
            score: "95%",
            skills: ["JavaScript", "React", "UI/UX"],
            status: "top-match",
            lastActive: "2 jam lalu"
        },
        {
            id: 2,
            name: "Budi Santoso",
            school: "SMKN 3 Bandung",
            major: "Teknik Komputer Jaringan",
            score: "92%",
            skills: ["Networking", "Security", "Linux"],
            status: "available",
            lastActive: "5 jam lalu"
        },
        {
            id: 3,
            name: "Sari Dewi",
            school: "SMKN 5 Surabaya",
            major: "Multimedia",
            score: "90%",
            skills: ["Adobe Creative", "3D Modeling", "Video Editing"],
            status: "interviewed",
            lastActive: "1 hari lalu"
        },
        {
            id: 4,
            name: "Ahmad Fauzi",
            school: "SMKN 2 Medan",
            major: "Teknik Mesin",
            score: "88%",
            skills: ["AutoCAD", "CNC", "Maintenance"],
            status: "new",
            lastActive: "2 hari lalu"
        },
    ]

    // Lowongan aktif
    const jobPostings = [
        {
            id: 1,
            title: "Frontend Developer Intern",
            type: "Magang",
            applicants: 24,
            status: "active",
            date: "12 Des 2024",
            location: "Jakarta",
            salary: "Rp 3-4 juta"
        },
        {
            id: 2,
            title: "Network Technician",
            type: "Full-time",
            applicants: 18,
            status: "active",
            date: "10 Des 2024",
            location: "Bandung",
            salary: "Rp 4-6 juta"
        },
        {
            id: 3,
            title: "Digital Marketing Trainee",
            type: "Kontrak",
            applicants: 15,
            status: "draft",
            date: "8 Des 2024",
            location: "Remote",
            salary: "Rp 3-5 juta"
        },
    ]

    // Wawancara mendatang
    const interviews = [
        {
            id: 1,
            name: "Rina Sari",
            position: "Frontend Intern",
            time: "Besok, 10:00 WIB",
            type: "Online",
            status: "confirmed"
        },
        {
            id: 2,
            name: "Budi Santoso",
            position: "Network Tech",
            time: "Jumat, 14:00 WIB",
            type: "Offline",
            status: "pending"
        },
        {
            id: 3,
            name: "Sari Dewi",
            position: "Multimedia Designer",
            time: "Senin, 13:00 WIB",
            type: "Online",
            status: "confirmed"
        },
    ]

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-blue-50/30">
                <div className="text-center space-y-4">
                    <div className="relative">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Building className="h-6 w-6 text-primary animate-pulse" />
                        </div>
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-foreground">Memuat dashboard...</p>
                        <p className="text-sm text-muted-foreground">Menyiapkan semua fitur untuk Anda</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-blue-50/20">
            {/* Header Modern */}
            <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-all duration-300">
                                    <Building className="h-5 w-5 text-primary-foreground" />
                                </div>
                                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-foreground tracking-tight">CareerReady360</span>
                                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full w-fit">Mitra</span>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation Tabs - Modern Alternative */}
                    <div className="hidden md:flex items-center gap-1">
                        {[
                            {
                                id: "overview",
                                label: "Overview",
                                icon: BarChart3,
                                count: null,
                                description: "Ringkasan dashboard"
                            },
                            {
                                id: "kandidat",
                                label: "Kandidat",
                                icon: Users,
                                count: 1248,
                                description: "Kelola kandidat"
                            },
                            {
                                id: "lowongan",
                                label: "Lowongan",
                                icon: Briefcase,
                                count: 3,
                                description: "Lowongan aktif"
                            },
                            {
                                id: "analitik",
                                label: "Analitik",
                                icon: PieChart,
                                count: null,
                                description: "Laporan & analisis"
                            },
                        ].map((tab) => (
                            <div key={tab.id} className="relative">
                                <button
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
          flex flex-col items-start px-5 py-3 rounded-xl text-left transition-all duration-300 min-w-[140px]
          ${activeTab === tab.id
                                            ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 text-primary shadow-sm"
                                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border border-transparent"
                                        }
        `}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`} />
                                        <span className="font-medium">{tab.label}</span>
                                        {tab.count !== null && (
                                            <Badge
                                                variant="secondary"
                                                className="ml-2 h-5 px-1.5 text-xs font-normal"
                                            >
                                                {tab.count}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground/70">{tab.description}</p>

                                    {activeTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center gap-3">
                        {/* Notification Bell */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative">
                                    <Bell className="h-5 w-5" />
                                    {notifications > 0 && (
                                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs font-medium text-white flex items-center justify-center">
                                            {notifications}
                                        </span>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80">
                                <div className="p-2">
                                    <p className="font-semibold">Notifikasi</p>
                                    <p className="text-sm text-muted-foreground">{notifications} notifikasi baru</p>
                                </div>
                                <DropdownMenuSeparator />
                                <div className="max-h-60 overflow-y-auto">
                                    {[1, 2, 3].map((i) => (
                                        <DropdownMenuItem key={i} className="p-3 cursor-pointer hover:bg-accent/50">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                                    <User className="h-4 w-4 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">Pelamar baru untuk Frontend Intern</p>
                                                    <p className="text-xs text-muted-foreground">5 menit lalu</p>
                                                </div>
                                            </div>
                                        </DropdownMenuItem>
                                    ))}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* User Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="gap-2 px-2 hover:bg-accent/50">
                                    <Avatar className="h-8 w-8 border-2 border-primary/20">
                                        {user?.photoURL ? (
                                            <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />
                                        ) : (
                                            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80">
                                                <User className="h-4 w-4 text-primary-foreground" />
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-medium">{userData?.personalInfo?.firstName || "Mitra"}</p>
                                        <p className="text-xs text-muted-foreground">{userData?.companyInfo?.companyName}</p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground hidden md:block" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <div className="p-2">
                                    <p className="font-semibold">{userData?.personalInfo?.firstName} {userData?.personalInfo?.lastName}</p>
                                    <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                                    <Badge variant="outline" className="mt-2">
                                        <Shield className="h-3 w-3 mr-1" />
                                        {userData?.package || "Starter"}
                                    </Badge>
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/mitra/profile" className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        Profil Saya
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard/mitra/settings" className="cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Pengaturan
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/help" className="cursor-pointer">
                                        <HelpCircle className="mr-2 h-4 w-4" />
                                        Bantuan
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Keluar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-4 py-6">
                {/* Welcome Banner */}
                <div className="mb-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-blue-50/50 border border-primary/20 p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                                <Building className="h-7 w-7 text-primary-foreground" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                                    Selamat datang, <span className="text-primary">{userData?.companyInfo?.companyName || "Mitra"}!</span> 👋
                                </h1>
                                <p className="text-muted-foreground mt-1">
                                    Siap menemukan talenta terbaik? {candidates.length} kandidat baru tersedia untuk perusahaan Anda.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="gap-1 px-3 py-1">
                                <Sparkles className="h-3 w-3" />
                                Paket {userData?.package || "Starter"}
                            </Badge>
                            <Button className="gap-2 shadow-md hover:shadow-lg transition-shadow">
                                <Plus className="h-4 w-4" />
                                Buat Lowongan
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid - Enhanced */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {stats.map((stat, index) => (
                        <Card
                            key={index}
                            className="overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group cursor-pointer"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
                                        <div className="flex items-baseline gap-2">
                                            <p className="text-3xl font-bold">{stat.value}</p>
                                            <Badge
                                                variant={stat.trend === "up" ? "default" : "destructive"}
                                                className="gap-1 text-xs"
                                            >
                                                {stat.trend === "up" ? (
                                                    <TrendingUpIcon className="h-3 w-3" />
                                                ) : (
                                                    <TrendingDown className="h-3 w-3" />
                                                )}
                                                {stat.change}
                                            </Badge>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                                <span>Progress</span>
                                                <span>{stat.label === "Match Rate" ? "92%" : "75%"}</span>
                                            </div>
                                            <Progress
                                                value={stat.label === "Match Rate" ? 92 : 75}
                                                className="h-2 bg-muted group-hover:bg-muted/50 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className={`h-14 w-14 rounded-xl flex items-center justify-center ${stat.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                                        <stat.icon className={`h-7 w-7 ${stat.iconColor}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - 2/3 */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>Aksi Cepat</span>
                                    <Zap className="h-5 w-5 text-muted-foreground" />
                                </CardTitle>
                                <CardDescription>Kelola rekrutmen dengan mudah</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <Button className="h-24 flex-col gap-3 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:border-blue-300 hover:shadow-md">
                                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                                            <Search className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="font-medium">Cari Kandidat</span>
                                    </Button>

                                    <Button variant="outline" className="h-24 flex-col gap-3">
                                        <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                                            <FileSearch className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="font-medium">Filter Lanjutan</span>
                                    </Button>

                                    <Button variant="outline" className="h-24 flex-col gap-3">
                                        <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
                                            <Download className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="font-medium">Export Data</span>
                                    </Button>

                                    <Button variant="outline" className="h-24 flex-col gap-3">
                                        <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center">
                                            <Users className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="font-medium">Kelola Tim</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Kandidat Terbaru */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>Kandidat Terbaru</span>
                                    <Link href="/dashboard/mitra/candidates" className="text-sm text-primary hover:underline flex items-center gap-1">
                                        Lihat semua <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </CardTitle>
                                <CardDescription>Siswa dengan profil terbaik untuk perusahaan Anda</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {candidates.map((candidate) => (
                                        <div
                                            key={candidate.id}
                                            className="flex items-center justify-between rounded-xl border p-4 hover:bg-accent/50 hover:border-primary/30 transition-all duration-200 group cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                                                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                                                            <User className="h-6 w-6 text-primary" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {candidate.status === "top-match" && (
                                                        <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-yellow-500 flex items-center justify-center">
                                                            <Star className="h-3 w-3 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold group-hover:text-primary transition-colors">{candidate.name}</h4>
                                                        <Badge variant="outline" className="text-xs">
                                                            {candidate.score} Match
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{candidate.school} • {candidate.major}</p>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {candidate.skills.map((skill, i) => (
                                                            <span key={i} className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" className="gap-1">
                                                    <Mail className="h-3 w-3" />
                                                    Hubungi
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - 1/3 */}
                    <div className="space-y-6">
                        {/* Company Profile */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="h-5 w-5 text-primary" />
                                    Profil Perusahaan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-14 w-14 border-2 border-primary/20">
                                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-lg font-bold">
                                            {userData?.companyInfo?.companyName?.charAt(0) || "C"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-bold text-lg">{userData?.companyInfo?.companyName || "Perusahaan Anda"}</h4>
                                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Mail className="h-3 w-3" />
                                            {userData?.personalInfo?.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-muted-foreground">Status Paket</span>
                                        <Badge variant="secondary">
                                            <Shield className="h-3 w-3 mr-1" />
                                            {userData?.package || "Starter"}
                                        </Badge>

                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-muted-foreground">Bergabung sejak</span>
                                        <span className="text-sm font-medium">
                                            {new Date(userData?.metadata?.registrationDate || Date.now()).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <div className="pt-3">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-muted-foreground">Profil Terisi</span>
                                            <span className="text-sm font-medium">85%</span>
                                        </div>
                                        <Progress value={85} className="h-2" />
                                    </div>
                                </div>

                                <Button variant="outline" className="w-full gap-2">
                                    <Settings className="h-4 w-4" />
                                    Edit Profil
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Wawancara Mendatang */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    Wawancara Mendatang
                                </CardTitle>
                                <CardDescription>{interviews.length} jadwal aktif</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {interviews.map((interview) => (
                                        <div key={interview.id} className="rounded-lg border p-3 hover:border-primary/30 transition-colors">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarFallback className="text-xs">
                                                            {interview.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium text-sm">{interview.name}</p>
                                                        <p className="text-xs text-muted-foreground">{interview.position}</p>
                                                    </div>
                                                </div>
                                                <Badge variant={interview.status === "confirmed" ? "success" : "warning"} className="text-xs">
                                                    {interview.status === "confirmed" ? (
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                    ) : (
                                                        <Clock className="h-3 w-3 mr-1" />
                                                    )}
                                                    {interview.status}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {interview.time}
                                                </span>
                                                <span className="font-medium">{interview.type}</span>
                                            </div>
                                        </div>
                                    ))}

                                    <Button variant="outline" className="w-full gap-2">
                                        <Plus className="h-4 w-4" />
                                        Tambah Wawancara
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Performance Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-primary" />
                                    Performa Rekrutmen
                                </CardTitle>
                                <CardDescription>Bulan ini vs bulan lalu</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-green-500" />
                                            <span className="text-sm">Kualitas Kandidat</span>
                                        </div>
                                        <span className="font-bold">92%</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-blue-500" />
                                            <span className="text-sm">Waktu Proses</span>
                                        </div>
                                        <span className="font-bold">7 hari</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="h-3 w-3 rounded-full bg-purple-500" />
                                            <span className="text-sm">Retensi</span>
                                        </div>
                                        <span className="font-bold">85%</span>
                                    </div>

                                    <Button variant="ghost" className="w-full gap-2 text-primary">
                                        <TrendingUp className="h-4 w-4" />
                                        Lihat Detail Laporan
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Bottom Section - Lowongan Aktif */}
                <div className="mt-8">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Lowongan Aktif</CardTitle>
                                    <CardDescription>Kelola lowongan yang sedang dibuka</CardDescription>
                                </div>
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Buat Lowongan Baru
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="active" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="active">Aktif ({jobPostings.filter(j => j.status === "active").length})</TabsTrigger>
                                    <TabsTrigger value="draft">Draft ({jobPostings.filter(j => j.status === "draft").length})</TabsTrigger>
                                    <TabsTrigger value="closed">Ditutup (0)</TabsTrigger>
                                </TabsList>

                                <TabsContent value="active" className="space-y-3 mt-4">
                                    {jobPostings.filter(j => j.status === "active").map((job) => (
                                        <div key={job.id} className="rounded-xl border p-4 hover:border-primary/30 transition-colors">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <h4 className="font-bold text-lg">{job.title}</h4>
                                                        <Badge variant="default" className="gap-1">
                                                            <TrendingUpIcon className="h-3 w-3" />
                                                            +{job.applicants}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="h-3 w-3" />
                                                            {job.location}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Users className="h-3 w-3" />
                                                            {job.applicants} pelamar
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            Dibuat: {job.date}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm font-medium mt-2">Gaji: {job.salary}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button size="sm" variant="outline">Edit</Button>
                                                    <Button size="sm">Lihat Pelamar</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}