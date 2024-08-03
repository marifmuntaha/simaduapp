export const rootMenu = [
    {
        icon: "monitor",
        text: "Dashboard",
        link: "/administrator",
    },
    {
        icon: "archived",
        text: "Master",
        active: false,
        subMenu: [
            {
                text: "Jenjang",
                link: "/administrator/master/jenjang",
            },
            {
                text: "Tingkatan",
                link: "/master/tingkatan",
            },
            {
                text: "Jurusan",
                link: "/master/jurusan",
            },
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
        link: "/administrator/institusi",
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
        icon: "users",
        text: "Siswa",
        active: false,
        subMenu: [
            {
                text: "Data Siswa",
                link: "/siswa/data",
            },
            {
                text: "Riwayat Siswa",
                link: "/siswa/riwayat",
            },
            {
                text: "Pindah Kelas",
                link: "/siswa/pindah-kelas",
            },
            {
                text: "Naik Kelas",
                link: "/siswa/naik-kelas",
            },
            {
                text: "Alumni",
                link: "/siswa/alumni",
            },
        ],
    },
    {
        icon: "users",
        text: "Data Pengguna",
        active: "false",
        link: "/administrator/pengguna",
    },

    {
        icon: "setting-alt",
        text: "Pengaturan",
        active: "false",
        link: "/pengaturan",
    },
];
