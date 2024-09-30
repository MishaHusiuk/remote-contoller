import useAccessToken from "../../Auth/useAccessToken";
import { Command } from "../../types";

type BasicControlsPageProps = {
    connectionId: string;
}

function BasicControlsPage({ connectionId }: BasicControlsPageProps) {
    const accessToken = useAccessToken();
    const handleClick = async (command: Command) => {
        fetch(`/api/connections/${connectionId}/commands`, {
            method: 'POST',
            body: JSON.stringify({
                commandName: command
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        })
    };

    return (
        <div className="bg-gray-900 text-white flex flex-col justify-center items-center min-h-screen">

            {/* <!-- Title --> */}
            <h1 className="text-2xl font-bold mb-6">Керування ПК</h1>

            {/* <!-- Control Grid --> */}
            <div className="grid grid-cols-3 gap-4 w-64 sm:w-80">

                {/* <!-- ESC Button --> */}
                <button className="bg-gray-700 text-white rounded-lg py-4 font-semibold hover:bg-gray-600 transition-colors"
                    onClick={() => handleClick(Command.ESC)}
                >ESC</button>

                {/* <!-- Enter Button --> */}
                <button className="col-span-2 bg-blue-700 text-white rounded-lg py-4 font-semibold hover:bg-blue-600 transition-colors"
                    onClick={() => handleClick(Command.ENTER)}
                >ENTER</button>

                {/* <!-- Tab Button --> */}
                <button className="bg-gray-700 text-white rounded-lg py-4 font-semibold hover:bg-gray-600 transition-colors"
                    onClick={() => handleClick(Command.TAB)}
                >TAB</button>

                {/* <!-- Arrow Buttons (Now Yellow) --> */}
                <div className="col-span-3 grid grid-cols-3 gap-4">
                    {/* <!-- Up Arrow --> */}
                    {/* <button className="col-span-3 bg-yellow-500 text-white rounded-lg py-4 hover:bg-yellow-400 transition-colors" */}
                    <button className="col-span-3 bg-gray-700 text-white rounded-lg py-4 hover:bg-gray-600 transition-colors"
                        onClick={() => handleClick(Command.UP)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7 7 7" />
                        </svg>
                    </button>

                    {/* <!-- Left Arrow --> */}
                    {/* <button className="bg-yellow-500 text-white rounded-lg py-4 hover:bg-yellow-400 transition-colors" */}
                    <button className="bg-gray-700 text-white rounded-lg py-4 hover:bg-gray-600 transition-colors"
                        onClick={() => handleClick(Command.LEFT)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* <!-- Down Arrow --> */}
                    {/* <button className="bg-yellow-500 text-white rounded-lg py-4 hover:bg-yellow-400 transition-colors" */}
                    <button className="bg-gray-700 text-white rounded-lg py-4 hover:bg-gray-600 transition-colors"
                        onClick={() => handleClick(Command.DOWN)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* <!-- Right Arrow --> */}
                    {/* <button className="bg-yellow-500 text-white rounded-lg py-4 hover:bg-yellow-400 transition-colors" */}
                    <button className="bg-gray-700 text-white rounded-lg py-4 hover:bg-gray-600 transition-colors"
                        onClick={() => handleClick(Command.RIGHT)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* <!-- Space Button --> */}
                <button className="col-span-3 bg-green-700 text-white rounded-lg py-4 font-semibold hover:bg-green-600 transition-colors"
                    onClick={() => handleClick(Command.SPACE)}
                >SPACE</button>

            </div>

            {/* <!-- Footer --> */}
            <footer className="text-gray-400 mt-8 text-sm">
                Розроблено Гузуюком Михайлом
            </footer>

        </div>
    );
}

export default BasicControlsPage;