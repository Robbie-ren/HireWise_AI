/*export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to HireWise AI</h1>
      <p className="text-lg text-gray-700 mb-6">
        Smart Job Matching Platform using AI
      </p>

      <div className="flex space-x-4">
        <a
          href="/admin"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Admin Login
        </a>
        <a
          href="/candidate"
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Candidate Login
        </a>
      </div>
    </main>
  );
}*/
'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to HireWise AI</h1>
      <p className="text-lg text-gray-700 mb-6">
        Smart Job Matching Platform using AI
      </p>

      <div className="flex space-x-4">
        <Link
          href="/admin"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Admin Login
        </Link>
        <Link
          href="/candidate"
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Candidate Login
        </Link>
      </div>
    </main>
  );
}

