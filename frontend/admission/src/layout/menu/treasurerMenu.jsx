export const treasurerMenu = [
    {
        icon: "monitor",
        text: "Dashboard",
        link: "/bendahara",
    },
    {
        icon: "archived",
        text: "Master",
        active: false,
        subMenu: [
            {
                text: "Item Pembayaran",
                link: "/bendahara/master/item-pembayaran",
            },
        ],
    },
    {
        icon: "users",
        text: "Data Pendaftar",
        link: "/bendahara/pendaftar",
    },
    {
        icon: "cart",
        text: "Data Tagihan",
        active: "false",
        link: "/bendahara/tagihan",
    },
    {
        icon: "scissor",
        text: "Potongan",
        active: "false",
        link: "/bendahara/potongan",
    },
    {
        icon: "cc-alt",
        text: "Pembayaran",
        active: "false",
        link: "/bendahara/pembayaran",
    },
    {
        icon: "file-text",
        text: "Laporan",
        active: "false",
        link: "/bendahara/laporan",
    },
]
