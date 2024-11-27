import { Authenticator } from '@aws-amplify/ui-react';

export function AdminPage() {
  return (
    <Authenticator hideSignUp={true}>
      {({ signOut }) => (
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <h1 className="text-3xl font-bold p-6">Admin Dashboard</h1>
          </div>
          <button 
            onClick={signOut}
            className="fixed bottom-4 right-4 px-4 py-2 bg-red-600 text-white rounded-md 
                     hover:bg-red-700 transition-colors duration-200 
                     shadow-lg flex items-center gap-2"
          >
            Sign out
          </button>
        </div>
      )}
    </Authenticator>
  );
}