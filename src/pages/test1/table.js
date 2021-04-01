import React from 'react';
import { Table } from 'antd';
import './style.css';
export const TodoTable = props => {
  const { data } = props;
  const columns = [
    {
      title: 'S.N',
      render: (t, r, i) => <span>{i + 1}</span>,
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Completed',
      dataIndex: 'completed',
      key: 'completed',
      render: text => <span>{text.toString()}</span>,
    },
  ];

  return (
    <Table
      pagination={{ position: ['topLeft', 'bottomRight'], defaultPageSize: 5 }}
      className={'antdTable'}
      bordered
      dataSource={data}
      columns={columns}
    ></Table>
  );
};
