import { useNavigate } from "react-router-dom";
import useAccessToken from "../../Auth/useAccessToken";
import { Command } from "../../types";

type BasicControlsPageProps = {
    connectionId: string;
}

function BasicControlsPage({ connectionId }: BasicControlsPageProps) {
    const accessToken = useAccessToken();
    const navigate = useNavigate();
    const handleClick = async (command: Command) => {
        const response = await fetch(`/api/connections/${connectionId}/commands`, {
            method: 'POST',
            body: JSON.stringify({
                commandName: command
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        });
        if(response.ok) return;
        
        const { error } = await response.json();
        if (response.status === 400 
            && error === 'Cannot send commands via non active connection'
        ) {
            navigate('/invalid-connection');
        }
    };

    return (
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
    );
}

export default BasicControlsPage;