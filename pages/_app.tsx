import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);

    return (
        <ConfigProvider>
            <Component {...pageProps} />
        </ConfigProvider>
    );
}

export default MyApp;
