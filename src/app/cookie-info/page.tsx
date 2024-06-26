export default function CookieInfoPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 text-left text-white">
      <h1 className="text-4xl font-bold">Cookie Information</h1>
      <p className="mt-4 text-lg">
        A cookie is a really small text file (under 4kb!) that websites store on your computer. These can be used
        to remember your preferences, logins, and other information.
      </p>
      <p className="mt-4 text-lg">
        Cookies generally get a bad reputation for being used for tracking and
        collecting personal information. However, we exclusively use cookies to
        enhance your experience here.
      </p>
      <p className="mt-4 text-center text-lg">
        The cookies we currently use are as follows:
      </p>
      <div className="grid grid-cols-2 gap-4 p-4 text-center">
        <div className="rounded-xl bg-gray-700 p-4">
          <h3 className="text-lg font-bold">cookie-consent</h3>
          <p>Used to remember if you accepted cookies</p>
        </div>
        <div className="rounded-xl bg-gray-700 p-4">
          <h3 className="text-lg font-bold">user-uuid</h3>
          <p>Your Minecraft UUID that you log in with</p>
        </div>
        <div className="rounded-xl bg-gray-700 p-4">
          <h3 className="text-lg font-bold">placeholder</h3>
          <p>idk</p>
        </div>
        <div className="rounded-xl bg-gray-700 p-4">
          <h3 className="text-lg font-bold">placeholder</h3>
          <p>idk</p>
        </div>
      </div>
    </div>
  )
}
