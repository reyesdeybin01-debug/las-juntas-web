export interface MenuItem {
    id: string;
    name: string;
    price: number;
    description?: string;
}

export interface SubCategory {
    name: string;
    items: MenuItem[];
}

export interface MenuCategory {
    id: string;
    name: string;
    banner: string;
    note?: string;
    subcategories?: SubCategory[];
    items?: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
    {
        id: "entradas",
        name: "Entradas",
        banner: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=1200&q=80",
        subcategories: [
            {
                name: "Cremas",
                items: [
                    { id: "cr1", name: "Crema de ayote", price: 3975 },
                    { id: "cr2", name: "Crema de camarón", price: 4975 },
                    { id: "cr3", name: "Crema de mariscos", price: 4975 },
                    { id: "cr4", name: "Crema de papa", price: 3975 },
                ],
            },
            {
                name: "Gustitos",
                items: [
                    { id: "gu1", name: "Consomé (pollo o res)", price: 3975 },
                    { id: "gu2", name: "Guacamole", price: 3975 },
                    { id: "gu3", name: "Mejillones gratinados", price: 4975 },
                    { id: "gu4", name: "Palitos de queso mozzarella", price: 2975 },
                    { id: "gu5", name: "Palitos de queso y tortilla malinche", price: 2975 },
                ],
            },
            {
                name: "Aros",
                items: [
                    { id: "ar1", name: "Aros de calamar", price: 4575 },
                    { id: "ar2", name: "Aros de cebolla", price: 2975 },
                ],
            },
            {
                name: "Ceviches",
                items: [
                    { id: "ce1", name: "Ceviche de camarón", price: 4875 },
                    { id: "ce2", name: "Ceviche mixto", price: 4675 },
                    { id: "ce3", name: "Ceviche de pescado", price: 3675 },
                    { id: "ce4", name: "Coctel de pianguas", price: 3775 },
                    { id: "ce5", name: "Coctel vuelve a la vida", price: 6875 },
                ],
            },
            {
                name: "Super Bocas",
                items: [
                    { id: "sb1", name: "Causa limeña (pollo o camarón)", price: 4950 },
                    { id: "sb2", name: "Cáscara rellena (pollo, res, camarón o mixta)", price: 4675 },
                    { id: "sb3", name: "Cazuela de quesos", price: 4675 },
                    { id: "sb4", name: "Cazuela de quesos (camarón, mariscos o chorizo)", price: 4975 },
                    { id: "sb5", name: "Costilla BBQ", price: 4975 },
                    { id: "sb6", name: "Chicharrón de falda", price: 4675 },
                    { id: "sb7", name: "Chile relleno (pollo, res o mixto)", price: 4575 },
                    { id: "sb8", name: "Sandwich en pan chapata (pollo o res)", price: 4975 },
                    { id: "sb9", name: "Steak quesadilla", price: 7975 },
                    { id: "sb10", name: "Tacos de lengua", price: 5275 },
                    { id: "sb11", name: "Tacos de pescado", price: 3995 },
                ],
            },
            {
                name: "Ensaladas",
                items: [
                    { id: "en1", name: "Ensalada césar", price: 4475 },
                    { id: "en2", name: "Ensalada de camarón", price: 5375 },
                    { id: "en3", name: "Ensalada de la casa", price: 3750 },
                    { id: "en4", name: "Ensalada de palmito", price: 4275 },
                    { id: "en5", name: "Ensalada de salmón", price: 5675 },
                ],
            },
            {
                name: "Sopas",
                items: [
                    { id: "so1", name: "Sopa azteca", price: 3975 },
                    { id: "so2", name: "Sopa negra", price: 3875 },
                    { id: "so3", name: "Sopa de mariscos", price: 4275 },
                    { id: "so4", name: "Sopa de mariscos en leche", price: 4975 },
                    { id: "so5", name: "Olla de carne pequeña", price: 4475 },
                    { id: "so6", name: "Olla de carne", price: 4975 },
                ],
            },
        ],
    },
    {
        id: "platos-fuertes",
        name: "Platos Fuertes",
        banner: "https://images.unsplash.com/photo-1558030006-450675393462?w=1200&q=80",
        note: "Incluyen 2 acompañamientos a elegir: arroz, ensalada, frijoles molidos, papas fritas, campesinas o asada, patacones, puré, pico de gallo, vegetales, yuca",
        subcategories: [
            {
                name: "Mar",
                items: [
                    { id: "ma1", name: "Camarones al gusto", price: 8775 },
                    { id: "ma2", name: "Filet en salsa de mariscos o aguacate", price: 6775 },
                    { id: "ma3", name: "Mar y tierra 200grs", price: 9975 },
                    { id: "ma4", name: "Mariscada al ajillo o salsa de tomate", price: 6875 },
                    { id: "ma5", name: "Salmón a la parrilla", price: 10675 },
                    { id: "ma6", name: "Salmón en salsa de aguacate", price: 10975 },
                ],
            },
            {
                name: "Pollo",
                items: [
                    { id: "po1", name: "Cordon Bleu Pollo (demi-glace o bechamel)", price: 5575 },
                    { id: "po2", name: "Pechuga al romero", price: 5575 },
                    { id: "po3", name: "Pechuga (demi-glace o bechamel)", price: 5875 },
                    { id: "po4", name: "Pechuga en salsa melocotón", price: 5975 },
                    { id: "po5", name: "Pollo a la naranja", price: 5975 },
                ],
            },
            {
                name: "Res",
                items: [
                    { id: "re1", name: "Cordon Bleu Carne (demi-glace o bechamel)", price: 5575 },
                    { id: "re2", name: "Churrasco 300grs", price: 11875 },
                    { id: "re3", name: "Churrasquito 200grs", price: 7950 },
                    { id: "re4", name: "Entraña 200grs", price: 12950 },
                    { id: "re5", name: "Fajitas de lomo suizo 200grs", price: 8950 },
                    { id: "re6", name: "Fajitas mixtas 300grs", price: 6875 },
                    { id: "re7", name: "Lengua (en salsa o a la parrilla)", price: 6975 },
                    { id: "re8", name: "Lomito a la parrilla 300grs", price: 12275 },
                    { id: "re9", name: "Lomo de la casa 200grs", price: 6950 },
                    { id: "re10", name: "Punta de solomo en salsa jalapeña 200grs", price: 9750 },
                    { id: "re11", name: "Ternero (en salsa o a la parrilla)", price: 5875 },
                ],
            },
            {
                name: "Cerdo",
                items: [
                    { id: "cd1", name: "Canasta de costilla (yuca, bananito, chiles jalapeños)", price: 10875 },
                    { id: "cd2", name: "Canasta de chicharrón (yuca, bananito, chiles jalapeños)", price: 10575 },
                    { id: "cd3", name: "Costilla en salsa agridulce", price: 7775 },
                    { id: "cd4", name: "Costilla San Luis", price: 7975 },
                ],
            },
        ],
    },
    {
        id: "pastas",
        name: "Pastas",
        banner: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&q=80",
        items: [
            { id: "pa1", name: "Spaghetti Alfredo", price: 4975 },
            { id: "pa2", name: "Spaghetti boloñesa", price: 5475 },
            { id: "pa3", name: "Spaghetti camarones", price: 6575 },
            { id: "pa4", name: "Spaghetti pollo", price: 4950 },
            { id: "pa5", name: "Fettuccini Alfredo", price: 5475 },
            { id: "pa6", name: "Fettuccini a la tagliata", price: 8475 },
            { id: "pa7", name: "Fettuccini con camarón (tomate o bechamel)", price: 6975 },
            { id: "pa8", name: "Fettuccini con salmón en salsa bechamel", price: 6975 },
        ],
    },
    {
        id: "arroces",
        name: "Arroces",
        banner: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&q=80",
        note: "Acompañados con ensalada verde y doraditas",
        items: [
            { id: "az1", name: "Calamares", price: 5875 },
            { id: "az2", name: "Camarones", price: 5975 },
            { id: "az3", name: "Camarones con arroz", price: 7475 },
            { id: "az4", name: "Cerdo", price: 4950 },
            { id: "az5", name: "Con palmito", price: 6375 },
            { id: "az6", name: "De la casa", price: 6375 },
            { id: "az7", name: "Marinera", price: 5975 },
            { id: "az8", name: "Pollo", price: 4950 },
        ],
    },
    {
        id: "surtidos",
        name: "Surtidos",
        banner: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80",
        items: [
            { id: "su1", name: "Trío Las Juntas (lomo delmónico, pollo, camarones) para 2", price: 12950 },
            { id: "su2", name: "Mediano para 3 personas", price: 12950 },
            { id: "su3", name: "Familiar para 4/5 personas", price: 19950 },
        ],
    },
    {
        id: "pollo-lena",
        name: "Pollo a la Leña",
        banner: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200&q=80",
        items: [
            { id: "pl1", name: "Porción con 2 tortillas", price: 3275 },
            { id: "pl2", name: "Porción Full (tortillas, frijoles, chips, bananito, jalapeño)", price: 4975 },
            { id: "pl3", name: "½ Pollo para 2", price: 8975 },
            { id: "pl4", name: "1 Pollo para 4", price: 15995 },
            { id: "pl5", name: "1½ Pollo para 6", price: 21995 },
            { id: "pl6", name: "2 Pollos para 8", price: 27575 },
        ],
    },
    {
        id: "casados",
        name: "Casados",
        banner: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
        note: "Incluye arroz, frijoles, ensalada, plátano maduro y picadillo",
        items: [
            { id: "ca1", name: "Casado Sencillo", price: 4875 },
            { id: "ca2", name: "Casado Especial (chile relleno, canelón, pollo asado, costilla, chicharrón)", price: 6875 },
            { id: "ca3", name: "Casado con lengua", price: 7275 },
        ],
    },
    {
        id: "otras-delicias",
        name: "Otras Delicias",
        banner: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80",
        subcategories: [
            {
                name: "Platillos",
                items: [
                    { id: "od1", name: "Alitas empanizadas", price: 3975 },
                    { id: "od2", name: "Alitas BBQ o Buffalo con papas", price: 4575 },
                    { id: "od3", name: "Bistec encebollado", price: 4275 },
                    { id: "od4", name: "Burrito (pollo o res)", price: 4575 },
                    { id: "od5", name: "Canelón (pollo, res o mixto)", price: 4575 },
                    { id: "od6", name: "Carne en salsa", price: 3975 },
                    { id: "od7", name: "Costilla de cerdo", price: 4575 },
                    { id: "od8", name: "Chicharrón", price: 4575 },
                    { id: "od9", name: "Chifrijo", price: 3975 },
                    { id: "od10", name: "Crispy (pollo o pescado)", price: 4275 },
                    { id: "od11", name: "Dados de queso", price: 3575 },
                    { id: "od12", name: "Fajitas con papas y ensalada (pollo o res)", price: 4275 },
                    { id: "od13", name: "Filet de pescado con papas y ensalada", price: 4275 },
                    { id: "od14", name: "Gallos (arracache, chorizo, salchichón)", price: 3275 },
                    { id: "od15", name: "Hígado encebollado", price: 4275 },
                    { id: "od16", name: "Maduro con queso", price: 3275 },
                    { id: "od17", name: "Mondongo en salsa", price: 3775 },
                    { id: "od18", name: "Morcilla", price: 3475 },
                    { id: "od19", name: "Nachos (pollo o res)", price: 4575 },
                    { id: "od20", name: "Nachos mixto", price: 4575 },
                    { id: "od21", name: "Papas a la francesa", price: 2950 },
                    { id: "od22", name: "Papa nacho (pollo o res)", price: 4975 },
                    { id: "od23", name: "Patacones sencillos", price: 3575 },
                    { id: "od24", name: "Patacones especiales", price: 4575 },
                    { id: "od25", name: "Pechuga a la plancha con papas y ensalada", price: 4275 },
                    { id: "od26", name: "Pezuña (arroz y frijoles tiernos)", price: 3975 },
                    { id: "od27", name: "Quesadilla (pollo, res o mixta)", price: 4775 },
                    { id: "od28", name: "Super taco (pollo o res)", price: 3575 },
                    { id: "od29", name: "Taco (pollo o res)", price: 1975 },
                    { id: "od30", name: "Torta huevo con camarón", price: 3950 },
                ],
            },
            {
                name: "Hamburguesas",
                items: [
                    { id: "hb1", name: "Hamburguesa (torta, queso, jamón, pepinillos)", price: 3275 },
                    { id: "hb2", name: "Deluxe (queso blanco, pepinillos, tocineta, aros cebolla, frijoles)", price: 4975 },
                    { id: "hb3", name: "Especial (queso, pepinillos, aros cebolla, hongos)", price: 4975 },
                    { id: "hb4", name: "Premium (torta, queso, pepinillos, tocineta)", price: 4975 },
                    { id: "hb5", name: "Las Juntas (queso emmental, pepinillos, tocineta, chile morrón)", price: 5575 },
                    { id: "hb6", name: "Montecristo (cebolla caramelizada, provolone, jamón, cheddar, pepinillos, chorizo)", price: 6375 },
                    { id: "hb7", name: "Del Chef (huevo frito, jalea tomate, pepinillos, queso suizo, yuca crocante, salsa del chef)", price: 6375 },
                    { id: "hb8", name: "Mini Burgers", price: 5575 },
                ],
            },
        ],
    },
    {
        id: "postres",
        name: "Postres",
        banner: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1200&q=80",
        items: [
            { id: "ps1", name: "Cheesecake Las Juntas (banano, chocolate y caramelo)", price: 3175 },
            { id: "ps2", name: "Cheesecake", price: 3175 },
            { id: "ps3", name: "Churros con helado", price: 3375 },
            { id: "ps4", name: "Churro relleno", price: 2975 },
            { id: "ps5", name: "Copa de helado", price: 2275 },
            { id: "ps6", name: "Crepas con nutella", price: 2950 },
            { id: "ps7", name: "Gelatina con helado", price: 2675 },
            { id: "ps8", name: "Helado con melocotón", price: 2875 },
            { id: "ps9", name: "Pie de limón", price: 3175 },
            { id: "ps10", name: "Praliné con oreo", price: 3775 },
            { id: "ps11", name: "Prestiños", price: 2875 },
            { id: "ps12", name: "Flan de coco", price: 3175 },
            { id: "ps13", name: "Tres leches", price: 2875 },
        ],
    },
    {
        id: "bebidas",
        name: "Bebidas",
        banner: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=1200&q=80",
        subcategories: [
            {
                name: "Frías",
                items: [
                    { id: "bf1", name: "Natural en agua (varios sabores)", price: 1575, description: "Chocolate, Crema, Fresa, Fresa con hierba buena, Guanábana, Horchata, Limonada, Limonada con hierba buena, Mora, Papaya, Piña, Ponche de frutas, Sandía" },
                    { id: "bf2", name: "Natural en leche", price: 1775 },
                    { id: "bf3", name: "Limonadas", price: 1775 },
                    { id: "bf4", name: "Ponche de frutas", price: 1775 },
                    { id: "bf5", name: "Smoothie frutos rojos", price: 2775 },
                ],
            },
            {
                name: "Calientes",
                items: [
                    { id: "bc1", name: "Agua dulce negra", price: 1300 },
                    { id: "bc2", name: "Agua dulce con leche", price: 1475 },
                    { id: "bc3", name: "Capuchino", price: 1900 },
                    { id: "bc4", name: "Capuchino con esencia", price: 1950 },
                    { id: "bc5", name: "Café con leche", price: 1575 },
                    { id: "bc6", name: "Café negro", price: 1300 },
                    { id: "bc7", name: "Chocolate", price: 1575 },
                    { id: "bc8", name: "Expreso", price: 1300 },
                    { id: "bc9", name: "Expreso doble", price: 1975 },
                ],
            },
        ],
    },
    {
        id: "menu-ninos",
        name: "Menú de Niños",
        banner: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80",
        items: [
            { id: "mn1", name: "Deditos de pescado", price: 4275 },
            { id: "mn2", name: "Deditos de pollo", price: 4275 },
            { id: "mn3", name: "Pasta para niños", price: 3675 },
        ],
    },
];

export const featuredDishes = [
    { id: "cd4", name: "Costilla San Luis", price: 7975, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80" },
    { id: "re2", name: "Churrasco 300grs", price: 11875, image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80" },
    { id: "pl4", name: "Pollo Asado a la Leña (1 pollo para 4)", price: 15995, image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&q=80" },
    { id: "hb6", name: "Hamburguesa Montecristo", price: 6375, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80" },
    { id: "ma1", name: "Camarones al gusto", price: 8775, image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=600&q=80" },
    { id: "ps1", name: "Cheesecake Las Juntas", price: 3175, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80" },
];

export function formatPrice(price: number): string {
    return `₡${price.toLocaleString("es-CR")}`;
}
