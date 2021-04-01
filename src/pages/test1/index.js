import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Row, Col, Button, Input, Form, Space, message, Card } from 'antd';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from '../../config/TodoList';
import { TodoTable } from './table';
const Test = () => {
  const [Account, setAccount] = useState('');
  const [taskCount, setTaskCount] = useState(0);
  const [taskList, setTaskList] = useState([]);
  const [todoContract, setTodoContract] = useState([]);
  let web3 = '';
  let ethereum = window.ethereum;

  const [form] = Form.useForm();

  const fetchTask = async contract => {
    setTaskList([]);
    const count = await contract.methods.taskCount().call();
    setTaskCount(count);
    for (var i = 1; i <= count; i++) {
      const task = await contract.methods.tasks(i).call();
      console.log('Task', i, task);
      setTaskList(prev => [...prev, task]);
    }
  };

  const addTask = async values => {
    try {
      const result = await todoContract.methods
        .createTask(values.content)
        .send({ from: Account });
      console.log(result);
      message.success('Task added successfully');
      if (result?.events?.TaskCreated?.returnValues)
        setTaskList(prev => [
          ...prev,
          result?.events?.TaskCreated?.returnValues,
        ]);
      const count = await todoContract.methods.taskCount().call();
      setTaskCount(count);
      form.resetFields();
    } catch (err) {
      console.log(err);
    }
  };
  const loadWeb3 = async () => {
    try {
      const check = true;
      if (check) {
        if (ethereum) {
          console.log('Metamask');
          web3 = new Web3(ethereum);
          ethereum.on('accountsChanged', result => {
            setAccount(result[0]);
          });
          ethereum.request({ method: 'eth_requestAccounts' }, (err, result) => {
            console.log(err);
          });
          //   await ethereum.enable();
        } else if (window.web3) {
          console.log('Web3');
          web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
        } else {
          alert('Install ethereum enabled wallet');
          return 0;
        }
      }
      //   web3 = new Web3('http://localhost:7545');
      const add = (await web3.eth.getAccounts())[0];
      setAccount(add);
      const contract = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
      setTodoContract(contract);
      await fetchTask(contract);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Card
        headStyle={{
          // backgroundColor: '#2ABCAA',
          backgroundColor: '#1890FF',
          color: 'white',
        }}
        title={`Your Ethereum Address: ${Account}`}
      ></Card>
      <Row>
        <Col span={10}>
          <Card
            title='Create TODO'
            headStyle={{
              backgroundColor: '#1890FF',
              color: 'white',
            }}
          >
            <Form
              onFinish={addTask}
              style={{
                display: 'flex',

                flexDirection: 'column',
              }}
              form={form}
            >
              <Form.Item
                label='Content'
                name='content'
                rules={[{ required: true, message: 'Please enter content' }]}
              >
                <Input name='content' placeholder='Enter content'></Input>
              </Form.Item>
              <Button
                style={{ alignSelf: 'center' }}
                type='primary'
                htmlType='submit'
              >
                Create TODO
              </Button>
            </Form>
          </Card>
        </Col>
        <Col span={2}></Col>
        <Col span={11}>
          <Card
            headStyle={{
              backgroundColor: '#1890FF',
              color: 'white',
            }}
            title={'Contract name:TodoList'}
          >
            <h5 style={{ fontSize: 20 }}>Total:{taskCount}</h5>

            <TodoTable  data={taskList}></TodoTable>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Test;
