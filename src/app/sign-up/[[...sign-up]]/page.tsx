import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            アカウントを作成
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            新しいアカウントを作成して始めましょう
          </p>
        </div>
        <div className="mt-8">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors",
                card: "shadow-lg rounded-lg bg-white p-8",
                headerTitle: "text-2xl font-bold text-gray-900",
                headerSubtitle: "text-gray-600",
                socialButtonsBlockButton:
                  "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-md transition-colors",
                formFieldInput:
                  "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                formFieldLabel: "block text-sm font-medium text-gray-700",
                footerActionLink: "text-blue-600 hover:text-blue-500",
              },
            }}
          />
        </div>

        {/* カスタムログインリンク */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            すでにアカウントをお持ちの方は{" "}
            <Link
              href="/sign-in"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              ログイン
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
