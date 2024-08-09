import axios from 'axios';
import { User } from '../utils';

export const fetchUsers = async (page: number = 1): Promise<User[]> => {
    const response = await axios.get(`https://randomuser.me/api/?page=${page}&results=10&seed=abc`);
    return response.data.results as User[];
};

export const fetchUserById = async (id: string): Promise<User | null> => {
    const response = await axios.get(`https://randomuser.me/api/?results=100&seed=abc`);
    const user = response.data.results.find((user: User) => user.login.uuid === id);
    return user || null;
};
