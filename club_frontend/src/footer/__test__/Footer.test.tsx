import React from 'react';
import { cleanup, render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import { Provider } from 'react-redux';
import axios from 'axios';
import store from '../../store';
import App from '../../App';
import { GET_CHANNEL_LIST } from '../../api/api';
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('Is Footer Channel name changing by clicking on channel', async () => {
    mockedAxios.get.mockResolvedValue({
        data: [
            {
                "name": "Power FM",
                "frequency": "100,0",
                "key": "1",
                "imgPath": "https://via.placeholder.com/225x225?text=Power+FM"
            },
            {
                "name": "Metro FM",
                "frequency": "101,2",
                "key": "2",
                "imgPath": "https://via.placeholder.com/225x225?text=Metro+FM"
            },
            {
                "name": "Fenomen FM",
                "frequency": "99,4",
                "key": "3",
                "imgPath": "https://via.placeholder.com/225x225?text=Fenomen+FM"
            },
            {
                "name": "Joy FM",
                "frequency": "87,1",
                "key": "4",
                "imgPath": "https://via.placeholder.com/225x225?text=Joy+FM"
            },
            {
                "name": "Radio Wales",
                "frequency": "142,2",
                "key": "5",
                "imgPath": "https://via.placeholder.com/225x225?text=Radio+Wales"
            }
        ]
    });
    const res = await GET_CHANNEL_LIST();



    await act(async () => {
        render(<Provider store={store}>
            <App />
        </Provider>)

    });

    let firstItem = screen.getByTestId("ullist").children[0];
    await fireEvent.click(firstItem);
    await waitFor(() => screen.getByTestId("fmnamefooter"))



    expect(screen.getByTestId("fmnamefooter")).toHaveTextContent(res[0].name);

})



