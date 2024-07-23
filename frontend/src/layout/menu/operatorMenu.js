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
                link: "/operator/master/tahun-pelajaran",
            },
            {
                text: "Program",
                link: "/operator/master/program",
            },
            {
                text: "Rombel",
                link: "/operator/master/rombel",
            },
        ],
    },
    {
        icon: "building",
        text: "Data Institusi",
        active: "false",
        link: "/operator/institusi",
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
