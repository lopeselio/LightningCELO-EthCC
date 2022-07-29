// import transakSDK from '@transak/transak-sdk'

// const useTransak = (windowProp: Window, apiKey: string) => {
//     let transak = new transakSDK({
//         apiKey: apiKey,  // Your API Key (Required)
//         environment: 'STAGING', // STAGING/PRODUCTION (Required)
//         defaultCryptoCurrency: 'ETH',
//         walletAddress: '', // Your customer wallet address
//         themeColor: 'ffffff', // App theme color in hex
//         email: '', // Your customer email address (Optional)
//         redirectURL: '',
//         hostURL: windowProp.location.origin, // Required field
//         widgetHeight: '550px',
//         widgetWidth: '450px'
//     });
    
//     transak.init();
    
//     // This will trigger when the user closed the widget
//     transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (orderData: any) => {
//         transak.close();
//     });
    
//     // This will trigger when the user marks payment is made.
//     transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData: any) => {
//         transak.close();
//     });
//     return transak;
// }

// export default useTransak;