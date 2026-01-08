import "./globals.css";

export const metadata = {
  title: "AnkismaikT Enterprise Intelligence",
  description: "AI-powered enterprise decision intelligence platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
