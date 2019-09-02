import React, { Component } from 'react';
import { Router, Stack, Scene} from 'react-native-router-flux';


import Selections from '../pages/selection.js';
import Login from '../pages/login.js';
import Scanner from '../components/qrScanner.js';
import Dashboard from '../pages/dashboard.js';
import Send from '../pages/send.js';
import Confirmation from '../pages/confirmation.js';
import Createmnemonic from '../pages/createMnemonic.js';
import Verifymnemonic from '../pages/verifyMnemonic.js';
import Credentials from '../pages/credentials.js';
import QRcode from '../pages/qrCode.js';


export default class Routes extends Component {
    render() {
        return(
            <Router>
                <Stack key="root" hideNavBar={true}>
                    <Scene key="selection" component={Selections} title="Selection"   />
                    <Scene key="login" component={Login} title="Login" />
                    <Scene key="scanner" component={Scanner} title="Scanner" />
                    <Scene key="dashboard" component={Dashboard} title="Dashboard" />
                    <Scene key="send" component={Send} title="Send"   />
                    <Scene key="confirmation" component={Confirmation} title="Confirmation"/>
                    <Scene key="createmnemonic" component={Createmnemonic} title="Createmnemonic"  />
                    <Scene key="verifymnemonic" component={Verifymnemonic} title="Verifymnemonic" initial={true}/>
                    <Scene key="credentials" component={Credentials} title="Credentials" />
                    <Scene key="qrcode" component={QRcode} title="QRcode" />
                </Stack>
            </Router>
        );
    }
}