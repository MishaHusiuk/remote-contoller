const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-900 text-white p-4">
            <svg
                className="animate-spin h-10 w-10 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="opacity-25"
                />
                <path
                    d="M12 2v4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="opacity-75"
                />
            </svg>
            <h2 className="text-xl">Завантаження...</h2>
        </div>
    );
};

export default Loading;