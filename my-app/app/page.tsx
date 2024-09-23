
import Image from "next/image"
import { redirect } from "next/navigation"
import { auth, signIn } from "@/lib/auth"
export default async function Page() {
  const session = await auth()
  if (session) return redirect("/dashboard")


  return <div className="flex items-center justify-center h-screen">
    <div className="flex flex-col border-2 border-white rounded-xl text-center px-7 py-9 bg-white">
      <h1 className="text-lg font-semibold text-black">Welcome Back</h1>
      <h2 className="text-gray-700">Please login with google.</h2>
      <form className="flex" action={async () => {
        "use server"
        await signIn("google")
      }}>
        <button type="submit" className="flex w-full border-[1.5px] rounded-xl border-gray-400 px-3 py-2 mt-4 items-center justify-center cursor-pointer hover:bg-gray-200">
          <Image alt="Google" src={"https://i.ibb.co/5rK1NV2/google-removebg-preview.png"} width={18} height={18} />
        </button>
      </form>

    </div>
  </div>
}