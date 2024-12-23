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
                text: "Berkas",
                link: "/operator/master/berkas",
            },
        ],
    },
    {
        icon: "users",
        text: "Data Pendaftar",
        link: "/operator/pendaftar",
    },
    {
        icon: "file-check-fill",
        text: "Verifikasi",
        active: "false",
        link: "/operator/verifikasi",
    },
    {
        icon: "file-text",
        text: "Laporan",
        active: "false",
        link: "/operator/laporan",
    },
    {
        icon: "user",
        text: "Pengguna",
        link: "/operator/pengguna",
    },
    {
        icon: "setting-alt",
        text: "Pengaturan",
        active: "false",
        link: "/operator/pengaturan",
    },
]
