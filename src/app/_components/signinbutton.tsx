import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { SignInForm } from "./signinform";
import { cookies } from "next/headers";

export function SignInButton() {
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
  );
}
