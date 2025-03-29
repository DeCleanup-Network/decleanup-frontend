import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Decleanup Journey!</h1>
      <p className="text-lg mb-8">Complete all levels and share your achievement!</p>
      <Link href="/game">
        <a className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
          Go to Game Completion
        </a>
      </Link>
    </div>
  );
}
