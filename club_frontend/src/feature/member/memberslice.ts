import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit'
import { GET_MEMEBER_LIST } from '../../api/api';
import { Member } from '../../helpers/Types';






export const fetchMemeberList = createAsyncThunk('fetchMemeberList', async () => {
    let res = await GET_MEMEBER_LIST();
    return res;

})
const memberlistSlice = createSlice({
    name: 'member',
    initialState: {
        memberList: [] as Member[],
        loading: 'loading',

        createNewData: {
            name: "Aman Ullah",
            age: 30,
            email: "amanullah8225@gmail.com",
            fileName: "",
            avatar: null,
        } as Member,

        selectedMember: {
            id: "",
            name: "Aman Ullah",
            age: 30,
            email: "amanullah8225@gmail.com",
            fileName: "",
            avatar: null,
        } as Member,
        updateMember: {
            id: "",
            name: "Aman Ullah",
            age: 30,
            email: "amanullah8225@gmail.com",
            fileName: "",
            avatar: null,
        } as Member,
    },
    reducers: {
        dataUpdate: (state: any, action: any) => {
            state[action.payload.type] = action.payload.value;
        },
        memberListUpdate: (state: any, action: any) => {
            state.memberList = action.payload;
        },
        memberInputHandler: (state: any, action: {
            type: string,
            payload: {
                name: string,
                value: string,
            }
        }) => {
            state.createNewData[action.payload.name] = action.payload.value;
        },
        memberUpdateInputHandler: (state: any, action: {
            type: string,
            payload: {
                name: string,
                value: string,
            }
        }) => {
            state.updateMember[action.payload.name] = action.payload.value;
        },
        selectMemeber: (state, action) => {
            state.selectedMember = action.payload;
        },
        selectedMemeberForUpdate: (state, action) => {
            state.updateMember = action.payload;
        },
        deleteMemeber: (state, action) => {
            state.memberList = state.memberList.filter((member) => member.id !== state.selectedMember.id)
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchMemeberList.fulfilled, (state, action) => {
            state.loading = "done"
            state.memberList = action.payload;
        })
    },
});

export const { memberListUpdate, dataUpdate, selectMemeber, memberInputHandler, selectedMemeberForUpdate, deleteMemeber, memberUpdateInputHandler } = memberlistSlice.actions;

export default memberlistSlice.reducer;