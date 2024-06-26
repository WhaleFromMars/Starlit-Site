"use client"
import { useState } from "react"

export default function CookieBanner({
  cookieConsent,
}: {
  cookieConsent: string | null
}) {
  const [isVisible, setIsVisible] = useState(() => {
    if (cookieConsent) {
      return false
    }
    if (typeof window === "undefined") {
      return false
    }
    const cookiesDeclined = sessionStorage.getItem("cookies-declined")
    return !cookiesDeclined
  })

  const handleAccept = () => {
    // Set a cookie to remember the user's consent
    document.cookie =
      "cookie-consent=true path=/ max-age=" + 60 * 60 * 24 * 365 // 1 year expiration
    setIsVisible(false)
  }

  const handleDecline = () => {
    // Use session storage to remember the user's decline
    sessionStorage.setItem("cookies-declined", "true")
    setIsVisible(false)
  }

  if (!isVisible) {
    return null // Don't render the banner if cookies have already been accepted or declined
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="mx-auto max-w-screen-xl px-4 py-2 text-center text-white">
        <p className="mb-4 text-lg">
          We use cookies to enhance your experience on StarlitMC. You can accept
          or decline our use of cookies.
          <br></br>
          For more information, please visit our{" "}
          <a href="/cookie-info" className="text-blue-500 underline">
            Cookie Information Page
          </a>
          .
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleAccept}
            className="mb-2 rounded-xl bg-white px-4 py-2 text-black hover:bg-gray-200"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="mb-2 rounded-xl bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}
