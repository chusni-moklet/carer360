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
    Bell,
    CheckCircle,
    Clock,
    MapPin,
    Download,
    Edit,
    ChevronRight,
    Star,
    Users,
    BarChart3,
    X,
    Mail,
    Phone,
    Globe,
    Shield,
    HelpCircle,
    MessageSquare
} from "lucide-react"
import Link from "next/link"
import { doc, getDoc } from "firebase/firestore"

export default function DashboardSiswaPage() {
    const [user, setUser] = useState<any>(null)
    const [userData, setUserData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [showNotifications, setShowNotifications] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const currentUser = auth.currentUser
                if (!currentUser) {
                    router.push("/login")
                    return
                }

                const userDoc = await getDoc(doc(db, "users", currentUser.uid))

                if (!userDoc.exists()) {
                    router.push("/daftar")
                    return
                }

                const userData = userDoc.data()

                if (userData.userType !== "siswa") {
                    router.push("/dashboard/mitra")
                    return
                }

                setUser(currentUser)
                setUserData(userData)

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

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            
            // Close notifications dropdown
            if (!target.closest('#notification-dropdown') && !target.closest('#notification-button')) {
                setShowNotifications(false)
            }
            
            // Close profile dropdown
            if (!target.closest('#profile-dropdown') && !target.closest('#profile-button')) {
                setShowProfile(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

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

    // Fungsi untuk navigasi ke halaman edit profil
    const handleEditProfile = () => {
        router.push('/dashboard/siswa/edit-profile')
    }

    // Helper function untuk mendapatkan data sekolah dari berbagai kemungkinan field
    const getSchoolInfo = () => {
        if (!userData) return "-"
        
        // Cek berbagai kemungkinan field untuk data sekolah
        return userData?.studentInfo?.school || 
               userData?.school || 
               userData?.institution || 
               userData?.personalInfo?.school ||
               userData?.education?.school ||
               "Sekolah belum diisi"
    }

    // Helper function untuk mendapatkan data jurusan
    const getMajorInfo = () => {
        if (!userData) return "-"
        
        return userData?.studentInfo?.jurusan || 
               userData?.jurusan || 
               userData?.major || 
               userData?.personalInfo?.jurusan ||
               "Jurusan belum diisi"
    }

    // Helper function untuk mendapatkan data angkatan
    const getBatchInfo = () => {
        if (!userData) return "2024"
        
        return userData?.studentInfo?.angkatan || 
               userData?.angkatan || 
               userData?.batch || 
               userData?.personalInfo?.angkatan ||
               "2024"
    }

    // Helper function untuk mendapatkan nama lengkap
    const getFullName = () => {
        if (!userData) return user?.displayName || "Siswa"
        
        const firstName = userData?.personalInfo?.firstName || ""
        const lastName = userData?.personalInfo?.lastName || ""
        
        if (firstName || lastName) {
            return `${firstName} ${lastName}`.trim()
        }
        
        return user?.displayName || "Siswa"
    }

    // Helper function untuk mendapatkan email
    const getEmail = () => {
        return user?.email || userData?.personalInfo?.email || userData?.email || "Email tidak tersedia"
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/20">
                <div className="text-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
                    <p className="mt-4 text-lg text-muted-foreground">Memuat dashboard...</p>
                </div>
            </div>
        )
    }

    const stats = [
        { 
            label: "Kesiapan Kerja", 
            value: "68%", 
            icon: Target, 
            color: "from-green-500 to-emerald-500",
            change: "+12%" 
        },
        { 
            label: "Proyek Selesai", 
            value: "3", 
            icon: FileText, 
            color: "from-blue-500 to-cyan-500",
            change: "+1" 
        },
        { 
            label: "Sertifikat", 
            value: "5", 
            icon: Award, 
            color: "from-amber-500 to-orange-500",
            change: "+2" 
        },
        { 
            label: "Peluang", 
            value: "24", 
            icon: Briefcase, 
            color: "from-purple-500 to-pink-500",
            change: "Baru" 
        },
    ]

    const profileProgress = [
        { label: "Informasi Pribadi", progress: 80, color: "from-green-500 to-emerald-500" },
        { label: "Portofolio Digital", progress: 40, color: "from-yellow-500 to-amber-500" },
        { label: "Keterampilan Teknis", progress: 60, color: "from-blue-500 to-cyan-500" },
        { label: "Sertifikasi", progress: 25, color: "from-purple-500 to-pink-500" },
    ]

    const learningModules = [
        { title: "CV & Portofolio Digital", progress: 65, color: "from-blue-500 to-cyan-500" },
        { title: "Wawancara Kerja", progress: 30, color: "from-purple-500 to-pink-500" },
        { title: "Komunikasi Profesional", progress: 45, color: "from-green-500 to-emerald-500" },
    ]

    const opportunities = [
        { 
            title: "Frontend Developer Intern", 
            company: "TechStart Inc", 
            location: "Jakarta", 
            type: "Magang", 
            match: 95,
            salary: "Rp 3-5 JT"
        },
        { 
            title: "Network Technician", 
            company: "NetCorp Indonesia", 
            location: "Bandung", 
            type: "Full-time", 
            match: 88,
            salary: "Rp 4-6 JT"
        },
        { 
            title: "Digital Marketing", 
            company: "GrowthLab", 
            location: "Remote", 
            type: "Part-time", 
            match: 82,
            salary: "Rp 2-3 JT"
        },
    ]

    const upcomingEvents = [
        { 
            title: "Mock Interview", 
            time: "Besok, 14:00 WIB", 
            icon: Calendar, 
            color: "bg-gradient-to-br from-blue-500 to-blue-600",
            participants: "15 peserta"
        },
        { 
            title: "Career Fair", 
            time: "Jumat, 10:00 WIB", 
            icon: Briefcase, 
            color: "bg-gradient-to-br from-purple-500 to-purple-600",
            participants: "50+ perusahaan"
        },
        { 
            title: "Workshop CV", 
            time: "Senin, 13:00 WIB", 
            icon: BookOpen, 
            color: "bg-gradient-to-br from-green-500 to-green-600",
            participants: "25 peserta"
        },
    ]

    const notifications = [
        { 
            id: 1,
            title: "Peluang kerja baru tersedia", 
            description: "Frontend Developer Intern di TechStart",
            time: "2 jam yang lalu",
            icon: Briefcase,
            iconColor: "text-blue-600",
            bgColor: "bg-blue-100",
            read: false
        },
        { 
            id: 2,
            title: "Proyek Anda telah diverifikasi", 
            description: "Website E-commerce untuk tugas akhir",
            time: "1 hari yang lalu",
            icon: CheckCircle,
            iconColor: "text-green-600",
            bgColor: "bg-green-100",
            read: false
        },
        { 
            id: 3,
            title: "Acara mendatang: Mock Interview", 
            description: "Besok pukul 14:00 WIB",
            time: "2 hari yang lalu",
            icon: Calendar,
            iconColor: "text-purple-600",
            bgColor: "bg-purple-100",
            read: false
        },
        { 
            id: 4,
            title: "Skor kesiapan kerja meningkat", 
            description: "Naik 12% menjadi 68%",
            time: "3 hari yang lalu",
            icon: Award,
            iconColor: "text-gray-600",
            bgColor: "bg-gray-100",
            read: true
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/10">
            <header className="sticky top-0 z-50 border-b border-border bg-background">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    {/* Logo/Brand */}
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="h-9 w-9 overflow-hidden rounded-lg">
                                <img 
                                    src="/smktelkom.png" 
                                    alt="CareerReady360 Logo" 
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.parentElement!.innerHTML = `
                                            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-primary-foreground">
                                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                                </svg>
                                            </div>
                                        `;
                                    }}
                                />
                            </div>
                            <div>
                                <span className="text-xl font-bold text-foreground">CareerReady360</span>
                                <span className="ml-2 text-sm text-muted-foreground">Dashboard</span>
                            </div>
                        </Link>
                    </div>

                    {/* Right Side - Notifications & Profile */}
                    <div className="flex items-center gap-3">
                        {/* Notification Dropdown */}
                        <div className="relative">
                            <Button 
                                id="notification-button"
                                variant="ghost" 
                                size="sm" 
                                className="relative h-10 w-10 rounded-full hover:bg-accent/50"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setShowNotifications(!showNotifications)
                                    setShowProfile(false)
                                }}
                            >
                                <Bell className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                                    {notifications.filter(n => !n.read).length}
                                </span>
                            </Button>

                            {/* Notification Dropdown Menu */}
                            {showNotifications && (
                                <div 
                                    id="notification-dropdown"
                                    className="absolute right-0 top-12 w-80 rounded-lg border border-border bg-background shadow-lg z-50"
                                >
                                    <div className="p-4">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="font-semibold text-foreground">Notifikasi</h3>
                                            <div className="flex items-center gap-2">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="text-xs hover:bg-accent/50"
                                                >
                                                    Tandai semua terbaca
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    className="h-6 w-6 p-0 hover:bg-accent/50"
                                                    onClick={() => setShowNotifications(false)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3 max-h-96 overflow-y-auto">
                                            {notifications.map((notification) => (
                                                <div 
                                                    key={notification.id}
                                                    className={`flex items-start gap-3 rounded-lg p-3 hover:bg-accent/50 cursor-pointer border border-transparent hover:border-border ${notification.read ? 'opacity-60' : ''}`}
                                                    onClick={() => {
                                                        // Handle notification click
                                                        console.log("Notification clicked:", notification.id)
                                                    }}
                                                >
                                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${notification.bgColor}`}>
                                                        <notification.icon className={`h-4 w-4 ${notification.iconColor}`} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className={`text-sm font-medium ${notification.read ? 'text-foreground' : 'text-foreground'}`}>
                                                            {notification.title}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {notification.description}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-border">
                                            <Link href="/notifikasi">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="w-full hover:bg-accent/50"
                                                    onClick={() => setShowNotifications(false)}
                                                >
                                                    Lihat semua notifikasi
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <Button 
                                id="profile-button"
                                variant="ghost" 
                                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent/50"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setShowProfile(!showProfile)
                                    setShowNotifications(false)
                                }}
                            >
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full border-2 border-primary/20"
                                    />
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                                        <User className="h-4 w-4 text-primary-foreground" />
                                    </div>
                                )}
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-medium text-foreground">
                                        {getFullName()}
                                    </p>
                                    <p className="text-xs text-muted-foreground">Siswa</p>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground hidden md:block" />
                            </Button>

                            {/* Profile Dropdown Menu */}
                            {showProfile && (
                                <div 
                                    id="profile-dropdown"
                                    className="absolute right-0 top-12 w-64 rounded-lg border border-border bg-background shadow-lg z-50"
                                >
                                    <div className="p-4">
                                        <div className="mb-4 flex items-center gap-3">
                                            {user?.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt="Profile"
                                                    className="h-10 w-10 rounded-full border-2 border-primary/20"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                                                    <User className="h-5 w-5 text-primary-foreground" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    {getFullName()}
                                                </p>
                                                <p className="text-xs text-muted-foreground">{getEmail()}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Link href="/dashboard/siswa/profile">
                                                <Button 
                                                    variant="ghost" 
                                                    className="w-full justify-start gap-2 hover:bg-accent/50"
                                                    onClick={() => setShowProfile(false)}
                                                >
                                                    <User className="h-4 w-4" />
                                                    Profil Saya
                                                </Button>
                                            </Link>
                                            
                                            <Link href="/dashboard/siswa/settings">
                                                <Button 
                                                    variant="ghost" 
                                                    className="w-full justify-start gap-2 hover:bg-accent/50"
                                                    onClick={() => setShowProfile(false)}
                                                >
                                                    <Award className="h-4 w-4" />
                                                    Pengaturan
                                                </Button>
                                            </Link>

                                            <Link href="/bantuan">
                                                <Button 
                                                    variant="ghost" 
                                                    className="w-full justify-start gap-2 hover:bg-accent/50"
                                                    onClick={() => setShowProfile(false)}
                                                >
                                                    <BookOpen className="h-4 w-4" />
                                                    Bantuan
                                                </Button>
                                            </Link>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-border">
                                            <Button 
                                                variant="outline" 
                                                className="w-full gap-2 hover:bg-accent/50"
                                                onClick={handleLogout}
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Keluar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-4 py-8">
                {/* Welcome Section */}
                <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-accent/5 p-6 border border-border/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                Selamat datang, {getFullName()}! 👋
                            </h1>
                            <p className="mt-2 text-muted-foreground">
                                Pantau perkembangan dan kesiapan karier Anda
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary/80 px-4 py-2 text-primary-foreground">
                                <Award className="h-4 w-4" />
                                <span className="text-sm font-medium">Paket {userData?.package || "Starter"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <Card key={index} className="group border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`rounded-lg p-3 bg-gradient-to-br ${stat.color}`}>
                                        <stat.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                        {stat.change}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Progress Card */}
                        <Card className="border-border/50">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl font-bold">Profil Kesiapan Karier</CardTitle>
                                        <CardDescription>
                                            Lengkapi profil untuk meningkatkan kesiapan kerja
                                        </CardDescription>
                                    </div>
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="gap-2"
                                        onClick={handleEditProfile}
                                    >
                                        <Edit className="h-4 w-4" />
                                        Edit
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {profileProgress.map((item, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="font-medium text-foreground">{item.label}</span>
                                                <span className="text-sm font-bold">{item.progress}%</span>
                                            </div>
                                            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                                                    style={{ width: `${item.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <div className="flex gap-3 pt-4">
                                        <Button className="flex-1 gap-2">
                                            <FileText className="h-4 w-4" />
                                            Tambah Proyek
                                        </Button>
                                        <Button variant="outline" className="flex-1 gap-2">
                                            <Download className="h-4 w-4" />
                                            Unduh CV
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Opportunities Card */}
                        <Card className="border-border/50">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl font-bold">Peluang Terbaru</CardTitle>
                                        <CardDescription>
                                            Lowongan yang cocok dengan profil Anda
                                        </CardDescription>
                                    </div>
                                    <Link href="/peluang">
                                        <Button variant="ghost" size="sm" className="gap-1">
                                            Lihat Semua
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {opportunities.map((job, index) => (
                                        <div 
                                            key={index} 
                                            className="group rounded-xl border border-border/50 p-5 hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-300"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                                                        <Building className="h-7 w-7 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-foreground text-lg">{job.title}</h4>
                                                        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="h-3 w-3" />
                                                                {job.company}
                                                            </span>
                                                            <span>•</span>
                                                            <span>{job.location}</span>
                                                            <span>•</span>
                                                            <span className="font-medium text-foreground">{job.salary}</span>
                                                        </div>
                                                        <div className="mt-3 flex items-center gap-3">
                                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                                                {job.type}
                                                            </span>
                                                            <span className="flex items-center gap-1 text-sm">
                                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                                {job.match}% Match
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button 
                                                    size="sm" 
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    Lamar
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* User Profile Card */}
                        <Card className="border-border/50">
                            <CardHeader className="text-center pb-4">
                                <div className="flex flex-col items-center">
                                    <div className="mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-1">
                                        <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                                            <User className="h-12 w-12 text-primary" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl font-bold">
                                        {getFullName()}
                                    </CardTitle>
                                    <CardDescription className="text-muted-foreground">
                                        {getEmail()}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-xl border border-border/50 p-3">
                                            <p className="text-sm text-muted-foreground mb-1">Sekolah</p>
                                            <p className="font-medium text-foreground">{getSchoolInfo()}</p>
                                        </div>
                                        <div className="rounded-xl border border-border/50 p-3">
                                            <p className="text-sm text-muted-foreground mb-1">Jurusan</p>
                                            <p className="font-medium text-foreground">{getMajorInfo()}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="rounded-xl border border-border/50 p-4 bg-gradient-to-br from-primary/5 to-transparent">
                                        <p className="text-sm text-muted-foreground mb-2">Angkatan</p>
                                        <p className="text-2xl font-bold text-foreground">
                                            {getBatchInfo()}
                                        </p>
                                    </div>

                                    <Button 
                                        variant="outline" 
                                        className="w-full gap-2"
                                        onClick={handleEditProfile}
                                    >
                                        <Edit className="h-4 w-4" />
                                        Edit Profil Lengkap
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Learning Progress Card */}
                        <Card className="border-border/50">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">Progress Pembelajaran</CardTitle>
                                <CardDescription>Modul yang sedang dipelajari</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {learningModules.map((module, index) => (
                                        <div key={index}>
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="font-medium text-foreground">{module.title}</span>
                                                <span className="text-sm font-bold">{module.progress}%</span>
                                            </div>
                                            <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full bg-gradient-to-r ${module.color}`}
                                                    style={{ width: `${module.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <Link href="/belajar">
                                        <Button className="w-full gap-2 mt-4">
                                            <BookOpen className="h-4 w-4" />
                                            Lanjutkan Belajar
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Upcoming Events Card */}
                        <Card className="border-border/50">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">Acara Mendatang</CardTitle>
                                <CardDescription>Sesi penting untuk karier Anda</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {upcomingEvents.map((event, index) => (
                                        <div 
                                            key={index} 
                                            className="flex items-center gap-3 rounded-xl border border-border/50 p-4 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all"
                                        >
                                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${event.color} text-white`}>
                                                <event.icon className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-foreground">{event.title}</h4>
                                                <p className="text-sm text-muted-foreground mt-1">{event.time}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{event.participants}</p>
                                            </div>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Clock className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        
                        
                    </div>
                </div>
            </main>

            {/* Footer Profesional */}
            <footer className="mt-16 border-t border-border/50 bg-gradient-to-b from-background to-muted/5">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid gap-8 lg:grid-cols-4">
                        {/* Company Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 overflow-hidden rounded-lg">
                                    <img 
                                        src="/smktelkom.png" 
                                        alt="CareerReady360 Logo" 
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <span className="text-xl font-bold text-foreground">CareerReady360</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Platform kesiapan karier #1 untuk siswa SMK. Mempersiapkan generasi muda Indonesia untuk dunia kerja yang kompetitif.
                            </p>
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Globe className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MessageSquare className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Users className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-foreground">Navigasi Cepat</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/peluang" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        Peluang Karir
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/belajar" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        Pembelajaran
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/portofolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        Portofolio
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-foreground">Sumber Daya</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/bantuan" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                                        <HelpCircle className="h-4 w-4" />
                                        Pusat Bantuan
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        Blog & Artikel
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/kontak" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                        Hubungi Kami
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact & Legal */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-foreground">Kontak & Legal</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span>support@careerready360.id</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <span>(021) 1234-5678</span>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-border/50">
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
                                        Kebijakan Privasi
                                    </Link>
                                    <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">
                                        Syarat & Ketentuan
                                    </Link>
                                    <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground">
                                        Kebijakan Cookie
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copyright Section */}
                    <div className="mt-12 pt-8 border-t border-border/50">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="text-center md:text-left">
                                <p className="text-sm text-muted-foreground">
                                    © {new Date().getFullYear()} CareerReady360. Hak Cipta Dilindungi.
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Platform kesiapan karier terdepan untuk pendidikan vokasi di Indonesia.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-green-500" />
                                    <span className="text-xs text-muted-foreground">Sistem Terenkripsi</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-amber-500" />
                                    <span className="text-xs text-muted-foreground">Partner Resmi Kemendikbud</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}