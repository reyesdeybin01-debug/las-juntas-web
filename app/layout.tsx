import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "Las Juntas Bar Restaurante | San Luis, Heredia - Costa Rica",
    description:
        "Restaurante de cocina costarricense con influencias latinas e internacionales. Carnes a la leña, mariscos frescos, y la mejor experiencia gastronómica en Santo Domingo de Heredia.",
    openGraph: {
        title: "Las Juntas Bar Restaurante",
        description:
            "Donde el sabor se encuentra con la naturaleza. Cocina auténtica costarricense con alma internacional.",
        type: "website",
        locale: "es_CR",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className={poppins.variable}>
            <body className="font-sans">
                <CartProvider>{children}</CartProvider>
            </body>
        </html>
    );
}
