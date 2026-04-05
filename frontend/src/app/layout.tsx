import "@/styles/globals.css";
import Providers from "@/components/providers";
import { PropsWithChildren } from "react";

export const metadata = {
  title: "Zerodha Lite",
  description: "Paper trading simulator frontend"
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
