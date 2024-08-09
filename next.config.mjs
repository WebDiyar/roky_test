import withTM from 'next-transpile-modules';

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
};

export default withTM([
    'rc-pagination',
    'rc-util',
    'antd',
    '@ant-design/icons',
    'rc-picker',
])(nextConfig);

