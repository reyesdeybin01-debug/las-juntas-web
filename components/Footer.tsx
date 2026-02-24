export default function Footer() {
    const quickLinks = [
        { href: "#inicio", label: "Inicio" },
        { href: "#destacados", label: "Lo Más Pedido" },
        { href: "#menu", label: "Menú" },
        { href: "#nosotros", label: "Nosotros" },
        { href: "#reservas", label: "Reservas" },
        { href: "#contacto", label: "Contacto" },
    ];

    return (
        <footer className="bg-dark-card border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Logo + tagline */}
                    <div>
                        <a href="#inicio" className="inline-block mb-4 relative group">
                            <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <img
                                src="/images/logo_transparent.png"
                                alt="Las Juntas Logo"
                                className="w-[160px] h-auto object-contain relative z-10 opacity-90 group-hover:opacity-100 transition-all drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                            />
                        </a>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Bar Restaurante — Donde el sabor se encuentra con la naturaleza.
                            San Luis de Santo Domingo de Heredia, Costa Rica.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-4">Links Rápidos</h4>
                        <ul className="space-y-2">
                            {quickLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <a href={href} className="text-gray-500 hover:text-primary transition-colors text-sm">
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-4">Contacto</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li>
                                <a href="https://wa.me/50664111118" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                    📞 +506 6411-1118
                                </a>
                            </li>
                            <li>
                                <a href="mailto:lasjuntasrestaurante@gmail.com" className="hover:text-primary transition-colors">
                                    📧 lasjuntasrestaurante@gmail.com
                                </a>
                            </li>
                            <li>
                                <a href="https://facebook.com/RestauranteLasJuntas" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                    📘 Facebook
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-white/5 text-center">
                    <p className="text-gray-600 text-xs">
                        © 2025 Las Juntas Bar Restaurante. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
