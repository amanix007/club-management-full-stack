import { ReactElement } from 'react'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Alert, Stack } from '@mui/material';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchMemeberList, memberInputHandler, selectMemeber, deleteMemeber, selectedMemeberForUpdate } from '../../feature/member/memberslice';
import { LoadingComponent } from '../../helpers/CommonComponents';
import { CREATE_MEMEBR, DELETE_MEMEBER } from '../../api/api';
import { Member } from '../../helpers/Types';


import { REACT_APP_API_ROOT_URL } from '../../_menifest';


interface Props {

}

export default function CreateMember({ }: Props): ReactElement {
    const [status, setstatus] = React.useState<String>("");
    const { loading, memberList, createNewData, selectedMember, updateMember } = useSelector((state: RootState) => state.member);

    const dispatch = useDispatch();

    const [imageFile, setImageFile] = React.useState<null | File | Blob>(null);

    const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>): void => {

        dispatch(
            memberInputHandler({
                value: e.target.value,
                name: e.target.name
            })
        );
    }

    const submit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        var bodyFormData: FormData = new FormData();


        for (const property in createNewData) {
            if (property !== "fileName" && property !== "avatar") {
                bodyFormData.append(property, createNewData[property as keyof Member])
            }
        }
        if (imageFile) {
            bodyFormData.append("avatar", imageFile);
        }


        let res = await CREATE_MEMEBR(bodyFormData);
        console.log('res:', res)

        if (res) {
            if (res.status === "fail") {
                setstatus("error")
            } else {
                setstatus("success")

            }
            window.scrollTo(0, 0);
            dispatch(fetchMemeberList());
        } else {

        }

    }
    const handleFileUpload = (e: React.SyntheticEvent): void => {

        const target = e.target as HTMLInputElement;
        if (target !== null) {
            const file: any = target.files;

            console.log('file[0]:', file[0])
            setImageFile(file[0]);
        }


    }
    return (
        <div>
            <form action="/"
                onSubmit={submit}
                style={{ marginTop: 50, marginBottom: 50 }}
            >
                <TextField label="Name" fullWidth
                    margin="normal"
                    value={createNewData.name}
                    onChange={handleTextInput}
                    name="name"
                    required

                />
                <TextField label="Age" fullWidth
                    margin="normal"
                    value={createNewData.age}
                    onChange={handleTextInput}
                    name="age"
                    required
                />
                <TextField label="Email" fullWidth
                    margin="normal"
                    value={createNewData.email}
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
                    <Button type="submit" variant="contained" className="mb-xs-8" fullWidth style={{ marginTop: 50, marginBottom: 50 }}>Save Member</Button>
                </div>

            </form>
            <Stack>

                {status === "success" && <Alert severity="success">Success</Alert>}
                {status === "error" && <Alert severity="error">Error</Alert>}
            </Stack>
        </div>
    )
}
