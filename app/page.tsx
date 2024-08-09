'use client';
import { useEffect, useState } from 'react';
import { Table, Input, Pagination, Spin } from 'antd';
import axios from 'axios';
import { User } from '../utils';
import { useRouter } from 'next/navigation';
import { fetchUsers } from '../services/userService';
import styles from '../styles/homePage.module.css';

const { Search } = Input;

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetchUsers(page).then(users => {
      setUsers(users);
      setLoading(false);
    });
  }, [page]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value) {
      const filteredUsers = users.filter(user =>
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(value.toLowerCase())
      );
      setUsers(filteredUsers);
    } else {
      setLoading(true);
      fetchUsers(page).then(users => {
        setUsers(users);
        setLoading(false);
      });
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setLoading(true);
    fetchUsers(page).then(users => {
      setUsers(users);
      setLoading(false);
    });
  };

  const handleViewDetails = (user: User) => {
    router.push(`/user/${user.login.uuid}`);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name: { first: string; last: string }) => `${name.first} ${name.last}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Details',
      render: (_: any, user: User) => (
        <button className={styles.detailsButton} onClick={() => handleViewDetails(user)}>
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Search
        placeholder="Search by name"
        onSearch={handleSearch}
        onChange={e => handleSearch(e.target.value)}
        value={searchTerm}
        className={styles.search}
      />
      <button className={styles.clearButton} onClick={handleClearSearch}>
        Clear Search
      </button>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={users}
            rowKey={(user: User) => user.login.uuid}
            pagination={false}
            className={styles.table}
          />
          <Pagination
            current={page}
            onChange={setPage}
            total={100}
            pageSize={10}
            className={styles.pagination}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
