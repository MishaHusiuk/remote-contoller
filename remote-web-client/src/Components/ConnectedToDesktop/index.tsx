import { Connection } from "../../types";

type ConnectedToDesktopProps = {
    connection: Connection
};

function ConnectedToDesktop({ connection }: ConnectedToDesktopProps) {
    return (
        <h2 className="inline-flex items-center text-xl font-semibold mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17h6m-6 0v1a1 1 0 001 1h4a1 1 0 001-1v-1m-6 0h6m3-5.5V5a2 2 0 00-2-2H6a2 2 0 00-2 2v6.5a2 2 0 002 2h12a2 2 0 002-2z" />
            </svg>
            { connection.controlledDesktopName }
        </h2>
    );
}

export default ConnectedToDesktop;