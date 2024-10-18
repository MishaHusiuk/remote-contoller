import Footer from '../Footer';
import Profile from '../Profile';

const url = "https://remote-control-assets.s3.amazonaws.com/remote-control/win32/x64/%D0%B4%D0%B8%D1%81%D1%82%D0%B0%D0%BD%D1%86%D1%96%D0%B9%D0%BD%D0%B8%D0%B9-%D0%B7%D0%B2%D1%8F%D0%B7%D0%BE%D0%BA.exe"
function HomePage() {
  const handleDownload = () => {
    const fileUrl = url;
    const fileName = '%D0%B4%D0%B8%D1%81%D1%82%D0%B0%D0%BD%D1%86%D1%96%D0%B9%D0%BD%D0%B8%D0%B9-%D0%B7%D0%B2%D1%8F%D0%B7%D0%BE%D0%BA.exe';  // The name to save the file as

    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
};
  return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Дистанційний Зв'язок</h2>
          <p className="text-lg italic mb-2">Лише кілька кнопок — безмежні можливості для комунікації з вашою аудиторією!</p>
        </section>

        {/* Download Buttons */}
        <section className="flex flex-col items-center space-y-8 mb-12">
          <div className="flex space-x-8">
            {/* MacOS Download */}
            {/* <div className="flex flex-col items-center">
              <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg">
                Завантажити для MacOS
              </button>
              <div className="mt-2">
                <label className="block text-sm mb-1">Виберіть архітектуру процесору:</label>
                <select className="bg-gray-800 border border-gray-600 text-white py-1 px-2 rounded-lg">
                  <option value="intel">Intel</option>
                  <option value="arm">Apple Silicon (M1/M2)</option>
                </select>
              </div>
            </div> */}

            {/* Windows Download */}
            <div className="flex flex-col items-center">
              <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg" onClick={handleDownload}>
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
      </div>
  );
}

export default HomePage;
