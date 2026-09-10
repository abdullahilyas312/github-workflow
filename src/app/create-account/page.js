import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { CreateAccountForm } from "@/components/ui/create-account-form"

export default function Page() {
  return (
      // <main className="min-h-screen grid place-items-center p-4">
    <section className="w-full mx-auto pt-40 py-20 px-6 flex flex-col items-center gap-10 font-poppins">
      <Card className="w-full max-w-sm rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Account</CardTitle>
          <CardDescription className="text-pretty">
            {"Enter your email and password to create an account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateAccountForm />
        </CardContent>
      </Card>
    </section>
    // </main>
  )
}
