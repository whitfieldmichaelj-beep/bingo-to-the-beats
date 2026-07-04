export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-8">
      <div className="mx-auto max-w-7xl px-6 flex justify-between items-center">
        <div className="text-gray-500">
          © 2026 Bingo to the Beats™
        </div>

        <div className="flex gap-6 text-gray-400 text-sm">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>
      </div>
    </footer>
  );
}