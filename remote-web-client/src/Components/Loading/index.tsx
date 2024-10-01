const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="flex flex-col items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="animate-spin h-12 w-12 text-white"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2 12a10 10 0 1110 10M12 2v10m0 0h10M12 12H2"
                    />
                </svg>
                <p className="mt-4 text-white text-lg">Завантаження...</p>
            </div>
        </div>
    );
};

export default Loading;