import React, {useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import Add from "./Add";
import Edit from "./Edit";
import {
    BackTo,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Icon,
    PreviewCard,
    ReactDataTable, toastError, toastSuccess
} from "../../../components";
import {
    Badge,
    Button,
    ButtonGroup,
    Spinner
} from "reactstrap";
import {useSetting} from "../../../layout/provider/Setting";
import {useInstitution} from "../../../layout/provider/Institution";
import {get as getYears} from "../../../utils/api/master/year";
import {get as getPrograms, destroy as destroyProgram} from "../../../utils/api/master/program";
import YearBlockHead from "../../../components/partials/YearBlockHead";

const Program = () => {
    const institution = useInstitution();
    const setting = useSetting();
    const [yearSelected, setYearSelected] = useState([]);
    const [years, setYears] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [program, setProgram] = useState([]);
    const [loadData, setLoadData] = useState(false);
    const [modal, setModal] = useState('');
    const [loading, setLoading] = useState(false);
    const Columns = [
        {
            name: "Nama Program",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "Singkatan",
            selector: (row) => row.alias,
            sortable: false,
        },
        {
            name: "Boarding",
            selector: (row) => row.boarding,
            sortable: false,
            cell: (row) => {
                return row.boarding === '1' ? <Badge color="success" pill>Boarding</Badge> :
                    <Badge color="warning" pill>Opsional</Badge>;
            }
        },
        {
            name: "Aksi",
            selector: (row) => row.id,
            sortable: false,
            hide: "sm",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button
                        color="outline-warning"
                        onClick={() => {
                            setProgram(row);
                            setModal('edit')
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            setLoading(row.id)
                            destroyProgram(row.id).then(resp => {
                                toastSuccess(resp.data.message);
                                setLoadData(true);
                                setLoading(false);
                            }).catch(err => {
                                toastError(err);
                                setLoading(false);
                            });
                        }}
                        disabled={row.id === loading}>
                        {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ]

    useEffect(() => {
        getYears({institution_id: institution.id, order: 'DESC', limit: 5}).then(resp => {
            const years = resp.data.result;
            const active = years.filter((year) => {
                return year.id === setting.year_id;
            })
            setYears(years);
            setYearSelected(active[0]);
            setLoadData(true);
        })
    }, []);

    useEffect(() => {
        loadData && yearSelected.id !== undefined && getPrograms({
            institution_id: institution.id,
            year_id: yearSelected.id
        }).then(resp => {
            setPrograms(resp.data.result);
            setLoadData(false);
        }).catch(err => {
            toastError(err);
            setLoadData(false);
        });
    }, [loadData]);

    return (
        <>
            <Head title="Data Program"/>
            <Content page="component">
                <BlockHead size="lg" wide="sm">
                    <BlockHeadContent>
                        <BackTo link="/" icon="arrow-left">
                            DASHBOARD
                        </BackTo>
                    </BlockHeadContent>
                </BlockHead>
                <BlockHead>
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h4">Data Program</BlockTitle>
                            <p>
                                Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for
                                react dashlite.
                            </p>
                        </BlockHeadContent>
                        <YearBlockHead yearSelected={yearSelected} setYearSelected={setYearSelected} years={years} setModal={setModal} setLoadData={setLoadData} />
                    </BlockBetween>
                </BlockHead>
                <PreviewCard>
                    <ReactDataTable data={programs} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
                <Add modal={modal} setModal={setModal} setLoadData={setLoadData} />
                <Edit modal={modal} setModal={setModal} setLoadData={setLoadData} program={program}/>
            </Content>
        </>
    )
}
export default Program;