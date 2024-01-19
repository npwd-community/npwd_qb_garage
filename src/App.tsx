import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from "@emotion/styled";
import {Header} from './styles/header.styles';
import {IPhoneSettings} from '@project-error/npwd-types';
import {i18n} from 'i18next';
import {IconButton, Theme, StyledEngineProvider, Typography} from '@mui/material';
import {ArrowBack} from '@mui/icons-material';
import {GarageItem} from './types/garage';
import {MockGarage} from './utils/constants';
import {buildRespObj} from './utils/misc';
import {VehicleList} from './components/VehicleList';
import fetchNui from './utils/fetchNui';
import {ServerPromiseResp} from './types/common';
import {RecoilEnv, RecoilRoot} from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const Container = styled.div<{ isDarkMode: any }>`
    flex: 1;
    padding: 1.5rem;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    overflow: auto;
    max-height: 100%;
    background-color: #fafafa;
    ${({isDarkMode}) =>
            isDarkMode &&
            `
    background-color: #212121;
  `}
`;

interface AppProps {
    theme: Theme;
    i18n: i18n;
    settings: IPhoneSettings;
}

const App = (props: AppProps) => {
    const history = useHistory();
    const [vehicles, setVehicles] = useState<GarageItem[] | undefined>([]);
    const [mappedVeh, setMappedVeh] = useState<any>(null);

    const isDarkMode = 'dark'

    useEffect(() => {
        fetchNui<ServerPromiseResp<GarageItem[]>>(
            'npwd:qb-garage:getVehicles',
            null,
            buildRespObj(MockGarage)
        ).then((resp) => {
            setVehicles(resp.data);
        });
    }, []);


    useEffect(() => {
        if (vehicles) {
            const mappedVehicles = vehicles?.reduce((vehs: any, vehicle: any) => {
                if (!vehs[vehicle.type]) vehs[vehicle.type] = [];
                vehs[vehicle.type].push(vehicle);
                return vehs;
            }, {});

            setMappedVeh(mappedVehicles);
        }
    }, [vehicles]);

    return (
        <StyledEngineProvider injectFirst>
            <Container isDarkMode={isDarkMode}>
                <Header>
                    <IconButton color="primary" onClick={() => history.goBack()}>
                        <ArrowBack/>
                    </IconButton>
                    <Typography fontSize={24} color="primary" fontWeight="bold">
                        Garage
                    </Typography>
                </Header>
                {mappedVeh && <VehicleList isDarkMode={true} vehicles={mappedVeh}/>}
            </Container>
        </StyledEngineProvider>
    );
};

const WithProviders: React.FC<AppProps> = (props) => (
    <RecoilRoot override key="npwd_qb_garage">
        <App {...props} />
    </RecoilRoot>
);

export default WithProviders;
