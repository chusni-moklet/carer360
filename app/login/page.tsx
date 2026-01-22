"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Briefcase,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
} from "lucide-react"
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  // Cek apakah user sudah login
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100))
        const currentUser = auth.currentUser
        if (currentUser) {
          // Cek apakah user sudah terdaftar di database
          const userDoc = await getDoc(doc(db, "users", currentUser.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            // Redirect ke dashboard berdasarkan tipe user
            if (userData.userType === "siswa") {
              router.push("/dashboard/siswa")
            } else {
              router.push("/dashboard/mitra")
            }
          } else {
            // User belum terdaftar lengkap
            router.push("/daftar?mode=complete&type=siswa")
          }
        }
      } catch (error) {
        console.log("Auth check error:", error)
      }
    }

    checkAuth()
  }, [router])

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      // Ambil data user dari Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))

      if (userDoc.exists()) {
        const userData = userDoc.data()

        // Simpan data ke localStorage
        localStorage.setItem('userRegistrationData', JSON.stringify(userData))
        localStorage.setItem('userType', userData.userType)
        localStorage.setItem('selectedPackage', userData.package)
        localStorage.setItem('userId', userCredential.user.uid)

        // Redirect berdasarkan tipe user
        if (userData.userType === "siswa") {
          router.push("/dashboard/siswa")
        } else {
          router.push("/dashboard/mitra")
        }
      } else {
        // User belum terdaftar lengkap
        setError("Akun belum terdaftar lengkap. Silakan daftar ulang.")
        await signOut(auth)
      }
    } catch (error: any) {
      console.error("Login error:", error)
      switch (error.code) {
        case "auth/invalid-email":
          setError("Email tidak valid")
          break
        case "auth/user-disabled":
          setError("Akun ini dinonaktifkan")
          break
        case "auth/user-not-found":
          setError("Akun tidak ditemukan")
          break
        case "auth/wrong-password":
          setError("Password salah")
          break
        case "auth/too-many-requests":
          setError("Terlalu banyak percobaan login. Coba lagi nanti.")
          break
        default:
          setError("Terjadi kesalahan. Silakan coba lagi.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError("")
    setGoogleLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account'
      })

      const result = await signInWithPopup(auth, provider)
      console.log("Google login successful:", result.user)

      // Simpan data user ke session storage untuk digunakan di halaman daftar
      const userData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        provider: "google"
      }
      sessionStorage.setItem('googleUserData', JSON.stringify(userData))

      // Cek apakah user sudah terdaftar lengkap di database
      const userDoc = await getDoc(doc(db, "users", result.user.uid))
      if (userDoc.exists()) {
        router.push("/dashboard")
      } else {
        // User login dengan Google tapi belum daftar lengkap
        // Arahkan ke halaman daftar untuk memilih paket
        router.push("/daftar")
      }
    } catch (error: any) {
      console.error("Google login error:", error)

      // Handle specific Google auth errors
      if (error.code === 'auth/popup-closed-by-user') {
        setError("Popup login ditutup. Silakan coba lagi.")
      } else if (error.code === 'auth/popup-blocked') {
        setError("Popup login diblokir. Izinkan popup untuk melanjutkan.")
      } else if (error.code === 'auth/cancelled-popup-request') {
        setError("Permintaan login dibatalkan.")
      } else if (error.code === 'auth/network-request-failed') {
        setError("Gagal terhubung ke jaringan. Periksa koneksi internet Anda.")
      } else if (error.code === 'auth/unauthorized-domain') {
        setError("Domain ini belum diotorisasi. Silakan hubungi admin.")
      } else {
        setError("Gagal login dengan Google. Silakan coba lagi.")
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  // Google Logo Component
  const GoogleIcon = () => (
    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
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
                        <path d="M12 8v4l2 2"/>
                      </svg>
                    </div>
                  `;
                }}
              />
            </div>
            <span className="text-xl font-bold text-foreground">CareerReady360</span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Link>
          </Button>
        </div>
      </header>
      {/* Main content */}
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md border-border/50 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Selamat Datang Kembali</CardTitle>
            <CardDescription>Masuk ke akun CareerReady360 kamu</CardDescription>
          </CardHeader>

          <CardContent>
            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-md bg-destructive/15 p-3">
                <p className="text-sm text-destructive text-center">{error}</p>
              </div>
            )}

            {/* Google Login Button */}
            <Button
              type="button"
              variant="outline"
              className="h-11 w-full mb-4 border-gray-300 hover:bg-gray-50 hover:text-primary hover:border-gray-400"
              onClick={handleGoogleLogin}
              disabled={googleLoading || loading}
            >
              {googleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              {googleLoading ? "Memproses..." : "Lanjutkan dengan Google"}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">atau dengan email</span>
              </div>
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  className="h-11"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading || googleLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Lupa password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    className="h-11 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    disabled={loading || googleLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    disabled={loading || googleLoading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="h-11 w-full"
                disabled={loading || googleLoading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Masuk"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <Link href="/daftar" className="font-medium text-primary hover:underline">
                Daftar sekarang
              </Link>
            </div>

            {/* Privacy Notice */}
            <div className="mt-4 text-center text-xs text-muted-foreground">
              Dengan melanjutkan, Anda menyetujui{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Syarat Layanan
              </Link>{" "}
              dan{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Kebijakan Privasi
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}