import useAccessToken from "../../Auth/useAccessToken";
import { Command } from "../../types";

function BasicControls() {
    const accessToken = useAccessToken();
    const handleClick = async (command: Command) => {
        fetch('/api/command', {
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
        <div className="h-dvh">
            <div className="p-8 bg-gray-600 flex flex-col justify-between h-full">
                <div className="grid grid-cols-3 grid-rows-3 gap-4">
                    <div className="p-4 bg-teal-500 rounded-md flex items-center justify-center row-start-1 col-start-1">
                        <button onClick={() => handleClick(Command.ESC)}>esc</button>
                    </div>
                    <div className="p-4 bg-teal-500 rounded-md flex items-center justify-center row-start-1 col-start-2 col-span-2">
                        <button onClick={() => handleClick(Command.ENTER)}>Enter</button>
                    </div>
                    <div className="p-4 bg-teal-500 rounded-md flex items-center justify-center row-start-2 col-start-1">
                        <button onClick={() => handleClick(Command.TAB)}>TAB</button>
                    </div>
                </div>
                <div className="grid grid-cols-3 grid-rows-4 gap-4">
                    <div className="p-4 bg-yellow-400 rounded-md flex items-center justify-center row-start-1 col-start-2">
                        <button onClick={() => handleClick(Command.UP)}>↑</button>
                    </div>
                    <div className="p-4 bg-yellow-400 rounded-md flex items-center justify-center row-start-2 col-start-1">
                        <button onClick={() => handleClick(Command.LEFT)}>←</button>
                    </div>
                    <div className="p-4 bg-yellow-400 rounded-md flex items-center justify-center row-start-2 col-start-3">
                        <button onClick={() => handleClick(Command.RIGHT)}>→</button>
                    </div>
                    <div className="p-4 bg-yellow-400 rounded-md flex items-center justify-center row-start-2 col-start-2">
                        <button onClick={() => handleClick(Command.DOWN)}>↓</button>
                    </div>
                    <div className="p-4 bg-teal-500 rounded-md flex items-center justify-center row-start-4 col-start-1 col-span-3">
                        <button onClick={() => handleClick(Command.SPACE)}>space</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicControls;