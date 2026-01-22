"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Briefcase, ChevronDown, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userData, setUserData] = useState<any>(null)
  const router = useRouter()

  // Cek status login user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        // Ambil data user dari localStorage
        const savedData = localStorage.getItem('userRegistrationData')
        if (savedData) {
          setUserData(JSON.parse(savedData))
        }
      } else {
        setUser(null)
        setUserData(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('userRegistrationData')
      localStorage.removeItem('userType')
      localStorage.removeItem('selectedPackage')
      localStorage.removeItem('userId')
      setUser(null)
      setUserData(null)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo dengan gambar dari public */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg  overflow-hidden">
            {/* Logo dari folder public */}
            <img
              src="/smktelkom.png"
              alt="CareerReady360 Logo"
              className="h-8 w-8 object-contain"
              onError={(e) => {
                // Fallback ke icon jika gambar tidak ditemukan
                e.currentTarget.style.display = 'none'
                const parent = e.currentTarget.parentElement
                if (parent) {
                  const fallback = document.createElement('div')
                  fallback.className = "flex h-9 w-9 items-center justify-center rounded-lg bg-primary"
                  const icon = document.createElement('div')
                  icon.className = "h-5 w-5 text-primary-foreground"
                  icon.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22V8"></path>
                      <path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
                      <path d="m5 12 7-7 7 7"></path>
                    </svg>
                  `
                  fallback.appendChild(icon)
                  parent.appendChild(fallback)
                }
              }}
            />
          </div>
          <span className="text-xl font-bold text-foreground">CareerReady360</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#fitur" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Fitur
          </Link>
          <Link href="#cara-kerja" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Cara Kerja
          </Link>
          <Link href="#testimoni" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Testimoni
          </Link>
          <Link href="#kontak" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Kontak
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Dropdown untuk user yang sudah login */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      {user.photoURL ? (
                        <AvatarImage src={user.photoURL} alt={user.displayName || user.email || "User"} />
                      ) : userData?.personalInfo?.photoURL ? (
                        <AvatarImage src={userData.personalInfo.photoURL} alt={userData.personalInfo.displayName || "User"} />
                      ) : null}
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">
                      {user.displayName || userData?.personalInfo?.firstName || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email || userData?.personalInfo?.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground capitalize">
                      {userData?.userType === "siswa" ? "Siswa" : "Mitra"} • {userData?.package || "Starter"}
                    </p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href={userData?.userType === "siswa" ? "/dashboard/siswa" : "/dashboard/mitra"} className="w-full cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="w-full cursor-pointer">
                      Profil Saya
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="w-full cursor-pointer">
                      Pengaturan
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="w-full cursor-pointer text-red-600 focus:text-red-600">
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              {/* Tombol untuk user belum login */}
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    Daftar
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/daftar?type=siswa" className="w-full cursor-pointer">
                      Daftar sebagai Siswa
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/daftar?type=mitra" className="w-full cursor-pointer">
                      Daftar sebagai Mitra
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="flex flex-col gap-4 p-4">
            <Link
              href="#fitur"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Fitur
            </Link>
            <Link
              href="#cara-kerja"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Cara Kerja
            </Link>
            <Link
              href="#testimoni"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Testimoni
            </Link>
            <Link
              href="#kontak"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Kontak
            </Link>

            {user ? (
              <div className="flex flex-col gap-2 pt-4">
                <div className="flex items-center gap-3 px-2 py-3">
                  <Avatar className="h-8 w-8">
                    {user.photoURL ? (
                      <AvatarImage src={user.photoURL} alt={user.displayName || user.email || "User"} />
                    ) : userData?.personalInfo?.photoURL ? (
                      <AvatarImage src={userData.personalInfo.photoURL} alt={userData.personalInfo.displayName || "User"} />
                    ) : null}
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">
                      {user.displayName || userData?.personalInfo?.firstName || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {userData?.userType === "siswa" ? "Siswa" : "Mitra"}
                    </p>
                  </div>
                </div>
                <Button variant="outline" asChild className="w-full">
                  <Link href={userData?.userType === "siswa" ? "/dashboard/siswa" : "/dashboard/mitra"} onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/profile" onClick={() => setIsOpen(false)}>
                    Profil Saya
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/settings" onClick={() => setIsOpen(false)}>
                    Pengaturan
                  </Link>
                </Button>
                <Button variant="destructive" onClick={() => {
                  handleLogout()
                  setIsOpen(false)
                }} className="w-full">
                  Keluar
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/daftar?type=siswa" onClick={() => setIsOpen(false)}>
                    Daftar sebagai Siswa
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/daftar?type=mitra" onClick={() => setIsOpen(false)}>
                    Daftar sebagai Mitra
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}