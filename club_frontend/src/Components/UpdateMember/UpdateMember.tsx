import { ReactElement } from 'react'
import * as React from 'react';

import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchMemeberList, memberListUpdate, dataUpdate, memberUpdateInputHandler, selectedMemeberForUpdate } from '../../feature/member/memberslice';
import { LoadingComponent } from '../../helpers/CommonComponents';
import { GET_MEMEBER_DETAILS, UPDATE_MEMEBR } from '../../api/api';
import { Member } from '../../helpers/Types';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import { RouterProps, withRouter } from 'react-router';
import { Alert, Stack } from '@mui/material';

interface Props extends RouterProps {
    [x: string]: any;

}

function UpdateMember(props: Props): ReactElement {



    const dispatch = useDispatch();
    const [imageFile, setImageFile] = React.useState<null | File | Blob>(null);
    const [status, setstatus] = React.useState<String>("");


    const { loading, memberList, updateMember } = useSelector((state: RootState) => state.member);
    React.useEffect(() => {
        const getMemberDetails = async () => {
            let { id } = props.match.params;
            let res = await GET_MEMEBER_DETAILS(parseInt(id));
            console.log('res:', res)
            if (res) {
                dispatch(selectedMemeberForUpdate(res as Member));

            }
        };

        getMemberDetails();
    }, []);

    const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>): void => {

        dispatch(
            memberUpdateInputHandler({
                value: e.target.value,
                name: e.target.name
            })
        );
    }

    const submit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        var bodyFormData: FormData = new FormData();


        for (const property in updateMember) {
            if (property !== "fileName") {
                bodyFormData.append(property, updateMember[property as keyof Member])
            }
        }
        if (imageFile) {
            bodyFormData.append("avatar", imageFile);
        }
        console.log('bodyFormData:', bodyFormData)

        let res = await UPDATE_MEMEBR(bodyFormData);

        if (res) {
            setstatus("success")

        } else {
            setstatus("error")

        }

    }
    const handleFileUpload = (e: React.SyntheticEvent): void => {

        const target = e.target as HTMLInputElement;
        if (target !== null) {
            const file: any = target.files;
            // dispatch(
            //     memberInputHandler({
            //         value: file[0],
            //         name: "avatar"
            //     })
            // );

            setImageFile(file[0]);
        }


    }

    return (
        <div style={{
            width: 800,
            margin: "0 auto"
        }}>
            <IconButton color="primary"
                onClick={() => props.history.push("/")}
            >
                <ChevronLeftIcon />
            </IconButton>

            <form action="/"
                onSubmit={submit}
                style={{ marginTop: 50, marginBottom: 50 }}
            >
                <TextField label="Name" fullWidth
                    margin="normal"
                    value={updateMember.name}
                    onChange={handleTextInput}
                    name="name"
                    required

                />
                <TextField label="Age" fullWidth
                    margin="normal"
                    value={updateMember.age}
                    onChange={handleTextInput}
                    name="age"
                    required
                />
                <TextField label="Email" fullWidth
                    margin="normal"
                    value={updateMember.email}
                    onChange={handleTextInput}
                    name="email"
                    required
                />

                <Button
                    variant="contained"
                    component="label"
                >
                    Upload Image
                    <input
                        onChange={handleFileUpload}
                        type="file"
                        hidden
                        name="avatar"
                    />
                </Button>

                <div>
                    <Button type="submit" variant="contained" className="mb-xs-8" fullWidth style={{ marginTop: 50, marginBottom: 50 }}>Update Member</Button>
                </div>

            </form>
            <Stack>

                {status === "success" && <Alert severity="success">Success</Alert>}
                {status === "error" && <Alert severity="error">Error</Alert>}
            </Stack>
        </div>
    );


}
export default withRouter(UpdateMember)