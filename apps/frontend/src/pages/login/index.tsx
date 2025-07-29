import React, { useState } from "react";
import { useRouter } from "next/router";
import { loginUser } from "../../utils/auth";
import { Header } from "../../components/Header";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        // Trigger a storage event to update Header authentication state
        window.dispatchEvent(new Event('storage'));
        router.push("/");
      } else {
        setError(result.error || "Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80 p-6 border rounded-xl shadow bg-card">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
          
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="text-blue-600 hover:underline"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

// Disable static optimization for this page
export async function getServerSideProps() {
  return {
    props: {},
  };
}
