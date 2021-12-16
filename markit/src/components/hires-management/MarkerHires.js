import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
    TablePagination, TableFooter
} from '@material-ui/core';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px'
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }

}));

const MarkerHires = () => {
    const classes = useStyles();
    const [rows, setRows] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        let mounted = true;
        const getHires = async () => {
            await Axios.get("/api/hire").then((response) => {
                if (mounted) {
                    setRows(response.data.hires);
                }
            });
            mounted = false
        };
        getHires();
    }, []);

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell}>Banner ID</TableCell>
                        <TableCell className={classes.tableHeaderCell}>First Name</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Last Name</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Email</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.filter(r => {return r.type === "Marker"}).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell>{row.hireId}</TableCell>
                            <TableCell>{row.fname}</TableCell>
                            <TableCell>{row.lname}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>
                                <Typography
                                    className={classes.status}
                                    style={{
                                        backgroundColor:
                                            ((row.status === 'Approved' && 'green') ||
                                                (row.status === 'Pending' && 'yellow') ||
                                                (row.status === 'Rejected' && 'orange') ||
                                                (row.status === 'Created' && 'blue'))
                                    }}
                                >{row.status}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                {rows && rows.length > 0 ? 
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    /> : "" }
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default MarkerHires;