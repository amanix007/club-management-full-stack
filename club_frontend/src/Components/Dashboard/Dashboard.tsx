import { ReactElement } from 'react'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchMemeberList, memberInputHandler, selectMemeber, deleteMemeber, selectedMemeberForUpdate } from '../../feature/member/memberslice';
import { LoadingComponent } from '../../helpers/CommonComponents';
import { CREATE_MEMEBR, DELETE_MEMEBER } from '../../api/api';
import { Member } from '../../helpers/Types';
import { RouteComponentProps, withRouter } from 'react-router';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { REACT_APP_API_ROOT_URL } from '../../_menifest';
import CreateMember from '../CreateMember/CreateMember';


interface Props extends RouteComponentProps {

};
function Dashboard(props: Props): ReactElement {
    const [status, setstatus] = React.useState<String>("");
    const dispatch = useDispatch();
    const { loading, memberList, createNewData, selectedMember, updateMember } = useSelector((state: RootState) => state.member);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (member: Member) => {
        dispatch(
            selectMemeber(member)
        );

        setOpen(true);
    };

    const handleClose = async (status: string) => {
        if (status === "ok") {
            let res = await DELETE_MEMEBER(parseInt(selectedMember.id));
            if (res) {
                dispatch(deleteMemeber(selectedMember))
            }
        }
        setOpen(false);
    };





    React.useEffect(() => {
        dispatch(fetchMemeberList());
    }, []);




    return (
        <div style={{
            width: 800,
            margin: "40px auto"
        }}>

            <CreateMember />
            <h1>Club members</h1>
            {loading === "loading" ? <LoadingComponent /> :
                <TableContainer component={Paper} style={{ marginTop: 50, marginBottom: 50 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Avatar</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Age</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {memberList.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {console.log('`${REACT_APP_API_ROOT_URL}/public/images/${row.fileName}`:', `${REACT_APP_API_ROOT_URL}/public/images/${row.fileName}`)}
                                    <TableCell align="right">
                                        <Avatar src={`${REACT_APP_API_ROOT_URL}/public/images/${row.fileName}`} />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.age}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">
                                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                            <Button
                                                onClick={() => {
                                                    dispatch(selectedMemeberForUpdate(row));
                                                    props.history.push("/update/" + row.id)
                                                }}
                                            >Update</Button>
                                            <Button color="error"
                                                onClick={() => handleClickOpen(row)}

                                            >Delete</Button>

                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure, you want to delete this member ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose("ok")} autoFocus>
                        OK
                    </Button>
                    <Button onClick={() => handleClose("cancel")}>Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* <Button variant="contained" className="mb-xs-8">Add Member</Button> */}



        </div>
    )
}


export default withRouter(Dashboard);