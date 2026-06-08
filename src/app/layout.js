import "./globals.css";

export const metadata = {
  title: "FishEye - Nos photographes",
  description: "Découvrez les photographes freelances de FishEye.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
