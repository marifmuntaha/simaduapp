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
        icon: "users",
        text: "Kesiswaan",
        active: false,
        subMenu: [
            {
                text: "Data Siswa",
                link: "/operator/kesiswaan/data-siswa",
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
        icon: "archived",
        text: "PPDB",
        active: false,
        subMenu: [
            {
                text: "Dashboard PPDB",
                link: "/operator/ppdb/",
            },
            {
                text: "Data Program",
                link: "/operator/ppdb/program",
            },
            {
                text: "Data Pendaftaran",
                link: "/operator/data-pendaftar",
            },
            {
                text: "Pengaturan",
                link: "/operator/ppdb/pengaturan",
            },
        ],
    },
    {
        icon: "setting-alt",
        text: "Pengaturan",
        active: "false",
        link: "/pengaturan",
    },
]
