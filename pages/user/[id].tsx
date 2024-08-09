import { GetServerSideProps } from 'next';
import axios from 'axios';
import { User } from '../../utils';
import Link from 'next/link';
import { Button, Card, Spin } from 'antd';
import { useState, useEffect } from 'react';
import styles from '../../styles/id.module.css';

type UserDetailProps = {
    user: User | null;
};

const UserDetailPage: React.FC<UserDetailProps> = ({ user }) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className={styles.spinnerContainer}>
                <Spin size="large" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className={styles.noDataContainer}>
                <h2>Данные о пользователе недоступны</h2>
                <Link href="/">
                    <Button type="primary">Назад к списку</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.cardContainer}>
            <Card title={`${user.name.first} ${user.name.last}`} style={{ width: 300 }}>
                <p>Age: {user.dob.age}</p>
                <p>ID: {user.login.uuid}</p>
                <p>Gender: {user.gender}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Address: {user.location.street.name}, {user.location.city}, {user.location.state}, {user.location.country}</p>
                <Link href="/">
                    <Button type="primary">Назад к списку</Button>
                </Link>
            </Card>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };

    let user = null;

    try {
        const { data } = await axios.get(`https://randomuser.me/api/?results=100&seed=abc`);
        user = data.results.find((user: User) => user.login.uuid === id) || null;
    } catch (error) {
        console.error(error);
    }

    return {
        props: { user },
    };
};

export default UserDetailPage;
