import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { SignInForm } from "./signinform"
import { cookies } from "next/headers"

export function SignInButton() {
  const userCookie = cookies().get("userUuid")

  if (userCookie?.value) {
    const user = userCookie.value;
    return (<div className="flex items-center space-x-2">
      <span className="text-white">Signed in as {user}</span>
      <button onClick={() => cookies().delete("userUuid")} className="text-white">Sign Out</button>
    </div>)
  }
  return (
    <Dialog>
      <DialogTrigger className="px-4">Sign In</DialogTrigger>
      <DialogContent className="bg-gray-800 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <SignInForm />
      </DialogContent>
    </Dialog>
  )
}
