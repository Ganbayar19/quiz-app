import "./globals.css";

export const metadata = {
  title: "AI Tools",
  description: "AI tools dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <div className="border-b px-6 py-3 font-semibold text-lg">AI tools</div>

        <main className="max-w-5xl mx-auto p-8">{children}</main>
      </body>
    </html>
  );
}
