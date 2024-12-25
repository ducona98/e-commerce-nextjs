"use client";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center p-4 bg-gray-800 text-white">
      <p>&copy; {new Date().getFullYear()} Duc Nguyen. All rights reserved.</p>
    </footer>
  );
}
