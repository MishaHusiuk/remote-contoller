import Footer from '../Footer';
import Profile from '../Profile';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Section with Profile Menu */}
      <header className="flex justify-between items-center p-4 border-b border-gray-800">
        <h1 className="text-3xl font-bold">RemoteCTR</h1>
        <Profile /> {/* Profile Menu in the top-right corner */}
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Ласкаво просимо до RemoteCTR</h2>
          <p className="text-lg">Завантажте десктопний клієнт для MacOS або Windows, щоб почати використовувати RemoteCTR.</p>
        </section>

        {/* Download Buttons */}
        <section className="flex flex-col items-center space-y-8 mb-12">
          <div className="flex space-x-8">
            {/* MacOS Download */}
            <div className="flex flex-col items-center">
              <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg">
                Завантажити для MacOS
              </button>
              {/* MacOS Chip Architecture Selection */}
              <div className="mt-2">
                <label className="block text-sm mb-1">Виберіть архітектуру процесору:</label>
                <select className="bg-gray-800 border border-gray-600 text-white py-1 px-2 rounded-lg">
                  <option value="intel">Intel</option>
                  <option value="arm">Apple Silicon (M1/M2)</option>
                </select>
              </div>
            </div>

            {/* Windows Download */}
            <div className="flex flex-col items-center">
              <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg">
                Завантажити для Windows
              </button>
            </div>
          </div>
        </section>

        {/* How to Get Started Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-6">Початок роботи</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Placeholder images */}
            <div>
              <img
                src="https://via.placeholder.com/300x200"
                alt="Screenshot 1"
                className="rounded-lg shadow-md"
              />
              <p className="mt-2 text-lg">Крок 1: Інсталюйте десктопний клієнт</p>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/300x200"
                alt="Screenshot 2"
                className="rounded-lg shadow-md"
              />
              <p className="mt-2 text-lg">Крок 2: Створіть акаунт</p>
            </div>
          </div>
        </section>
      </main>

    <Footer />
    </div>
  );
}

export default HomePage;
