export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow border-b">
      <div>
        <h2 className="text-xl font-semibold">👋 Selamat datang, Esa Fauzi!</h2>
        <p className="text-sm text-gray-500">Kamis, 15 Mei 2025</p>
      </div>
      <img
        src="https://ui-avatars.com/api/?name=Esa+Fauzi"
        className="w-10 h-10 rounded-full"
        alt="avatar"
      />
    </header>
  );
}
