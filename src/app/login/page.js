import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { LoginForm } from "@/components/ui/login-form"

export default function Page() {
  return (
      // <main className="min-h-screen grid place-items-center p-4">
    <section className="w-full mx-auto pt-40 py-20 px-6 flex flex-col items-center gap-10 font-poppins">
      <Card className="w-full max-w-sm rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription className="text-pretty">
            {"Enter your email and password to login"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </section>
    // </main>
  )
}
