const InvalidConnectionPage = () => {
  return (
      <div className="flex-1 flex flex-col justify-center items-center">
        {/* SVG for invalid connection */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-16 w-16 text-red-500 mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M12 6.5c-3.59 0-6.5 2.91-6.5 6.5S8.41 19.5 12 19.5s6.5-2.91 6.5-6.5S15.59 6.5 12 6.5z"
          />
        </svg>
        <h1 className="text-xl font-semibold mb-4">Це підключення не дійсне.</h1>
        <p>Будь ласка ініціалізуйте нове підключення.</p>
      </div>
  );
};

export default InvalidConnectionPage;
