import { ReactNode } from 'react';
import Profile from '../Profile';
import Footer from '../Footer';

type PageWrapperProps = {
    children: ReactNode;
};
function PageWrapper({ children }: PageWrapperProps) {
    return (
        <div className="relative min-h-screen bg-gray-900 text-white flex flex-col justify-between">
            <header className="flex justify-between items-center p-4 border-b border-gray-800 w-full">
                <h1 className="text-3xl font-bold">RemoteCTR</h1>
                <Profile />
            </header>
            <main className="flex flex-col justify-center items-center">
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default PageWrapper;