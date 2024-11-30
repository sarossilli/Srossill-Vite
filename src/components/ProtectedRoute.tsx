import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        try {
            await getCurrentUser();
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)
            setIsAuthenticated(false);
        }
    }

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return <>{children}</>;
}