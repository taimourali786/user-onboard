export default function NotFoundPage() {
  return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 sm:p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl gap-8 lg:gap-16">
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-600 leading-tight">
                404
              </h1>
              <p className="text-lg sm:text-xl text-gray-600">
                Sorry about that! Please visit our homepage to get where you need to go.
              </p>
              <button className="w-full sm:w-auto px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
                Take me there!
              </button>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <img
                src="/src/assets/not-found.png"
                alt="Group Illustration"
                className="w-full h-auto max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
  );
}