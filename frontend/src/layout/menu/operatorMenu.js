export const operatorMenu = [
    {
        icon: "monitor",
        text: "Dashboard",
        link: "/operator",
    },
    {
        icon: "archived",
        text: "Master",
        active: false,
        subMenu: [
            {
                text: "Tahun Pelajaran",
                link: "/master/tahun-pelajaran",
            },
        ],
    },
    {
        icon: "building",
        text: "Data Institusi",
        active: "false",
        link: "/institusi",
    },
    {
        icon: "panel",
        text: "Lembaga",
        active: false,
        subMenu: [
            {
                text: "Program",
                link: "/lembaga/program",
            },
            {
                text: "Rombel",
                link: "/lembaga/rombel",
            },
        ],
    },
    {
        icon: "reports",
        text: "Laporan",
        active: false,
        subMenu: [
            {
                text: "Pembayaran",
                link: "/laporan/pembayaran",
            },
            {
                text: "Tagihan",
                link: "/laporan/tagihan",
            },
        ],
    },
    {
        icon: "money",
        text: "Kas Keuangan",
        active: "false",
        link: "/arus-kas",
    },
    {
        icon: "setting-alt",
        text: "Pengaturan",
        active: "false",
        link: "/pengaturan",
    },
]
