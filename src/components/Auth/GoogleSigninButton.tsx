"use client";

import { GoogleIcon } from "@/assets/icons";
import { useRouter } from "next/navigation";

export default function GoogleSigninButton({ text }: { text: string }) {
  const router = useRouter();

  const handleGoogleSignin = () => {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
    router.push(`${apiUrl}/auth/google`);
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignin}
      className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray-2 p-[15px] font-medium hover:bg-opacity-50 dark:border-dark-3 dark:bg-dark-2 dark:hover:bg-opacity-50"
    >
      <GoogleIcon />
      {text} with Google
    </button>
  );
}
