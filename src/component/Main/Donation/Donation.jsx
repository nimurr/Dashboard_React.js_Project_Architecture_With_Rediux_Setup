/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Table, Modal, Input, DatePicker, ConfigProvider, Form } from "antd";
import { IoIosSearch } from "react-icons/io";
import moment from "moment";
import { AiFillEye } from "react-icons/ai";
import { FaAngleLeft } from "react-icons/fa";

const { Item } = Form;

const Donation = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const mockData = [
    {
        id: "TRX001",
        fullName: "John Doe",
        accountID: 2010,
        gender: "Male",
        phonNumber:4567-7894,
        email:"info@gmail.com",
        createdAt: "2022-01-01T00:00:00Z",
        amount: 100,
        paymentType: "Credit Card",
    },
    {
        id: "TRX002",
        fullName: "Jane Smith",
        accountID: 2011,
        gender: "Female",
        phonNumber:4567-7894,
        email:"info@gmail.com",
        createdAt: "2022-01-02T00:00:00Z",
        amount: 150,
        paymentType: "Debit Card",
    },
    {
        id: "TRX003",
        fullName: "Michael Johnson",
        accountID: 2012,
        gender: "Male",
        phonNumber:4567-7894,
        email:"info@gmail.com",
        createdAt: "2022-01-03T00:00:00Z",
        amount: 200,
        paymentType: "Bank Transfer",
    },
    {
        id: "TRX004",
        fullName: "Emily Davis",
        accountID: 2013,
        gender: "Female",
        phonNumber:4567-7894,
        email:"info@gmail.com",
        createdAt: "2022-01-04T00:00:00Z",
        amount: 250,
        paymentType: "Credit Card",
    },
    {
        id: "TRX005",
        fullName: "Chris Brown",
        accountID: 2014,
        gender: "Male",
        phonNumber:4567-7894,
        email:"info@gmail.com",
        createdAt: "2022-01-05T00:00:00Z",
        amount: 300,
        paymentType: "PayPal",
    },
    {
        id: "TRX006",
        fullName: "Jessica Wilson",
        accountID: 2015,
        gender: "Female",
        phonNumber:4567-7894,
        email:"info@gmail.com",
        createdAt: "2022-01-06T00:00:00Z",
        amount: 350,
        paymentType: "Debit Card",
    },
    {
        id: "TRX007",
        fullName: "David Lee",
        accountID: 2016,
        gender: "Male",
        phonNumber:4567-7894,
        email:"info@gmail.com",
        createdAt: "2022-01-07T00:00:00Z",
        amount: 400,
        paymentType: "Bank Transfer",
    },
    {
        id: "TRX008",
        fullName: "Sophia Martinez",
        accountID: 2017,
        gender: "Female",
        phonNumber:4567-7894,
        email:"info@gmail.com",
        createdAt: "2022-01-08T00:00:00Z",
        amount: 450,
        paymentType: "Credit Card",
    },
    {
        id: "TRX009",
        fullName: "Daniel Anderson",
        accountID: 2018,
        gender: "Male",
        phonNumber:4567-7894,
        email:"info@gmail.com",
        createdAt: "2022-01-09T00:00:00Z",
        amount: 500,
        paymentType: "PayPal",
    },
    {
        id: "TRX010",
        fullName: "Olivia Garcia",
        accountID: 2019,
        gender: "Female",
        phonNumber:4567-7894,
        email:"info@gmail.com",
        createdAt: "2022-01-10T00:00:00Z",
        amount: 550,
        paymentType: "Debit Card",
    }
];


  const dataSource = mockData.map((record, index) => ({
    id: index + 1,
    trxId: record.id,
    fullName: record.fullName,
    accountID: record.accountID,
    createdAt: record.createdAt,
    email: record.email,
    phonNumber: record.phonNumber,
    amount: `$${record.amount}`,
    paymentType: record.paymentType || "N/A",
    date: moment(record.createdAt).format("DD MMM, YYYY"),
    avatarUrl: `https://i.pravatar.cc/50?img=${index + 1}`,
    gender: record.gender
  }));

  const columns = [
    {
      title: "#Trx ID",
      dataIndex: "trxId",
      key: "trxId",
    },
    {
      title: "User Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full mr-2"
            src={record.avatarUrl}
            alt="avatar"
          />
          {text}
        </div>
      ),
    },
    {
      title: "Account ID",
      dataIndex: "accountID",
      key: "accountID",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Donation Date Time",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <AiFillEye
            onClick={() => showModal(record)}
            style={{ fontSize: "18px", cursor: "pointer" }}
            className="text-[#85594B]"
          />
      ),
    },
  ];

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <section>
      <div className="bg-white rounded-lg">
        <div className="md:flex justify-between items-center py-5">
        <h1 className="text-2xl font-semibold flex items-center"><FaAngleLeft /> Donation list</h1>
          <Form layout="inline" className="flex space-x-4">
            <Item name="date">
              <DatePicker
                className="rounded-md"
                onChange={(date) => setSelectedDate(date)}
                placeholder="Select Date"
              />
            </Item>
            <Item name="searchText">
              <Input
                className="rounded-md w-[70%] md:w-full"
                placeholder="Search"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Item>
            <Item>
              <button className="size-8 rounded-full flex justify-center items-center bg-[#4C7E95] text-white">
                <IoIosSearch className="size-5" />
              </button>
            </Item>
          </Form>
        </div>
        <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#85594B",
              headerColor: "#FFFFFF",
              headerBorderRadius: 5,
            },
          },
        }}
        >
          <Table
            className="shadow-sm"
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 10, position: ["bottomCenter"] }}
            scroll={{ x: "max-content" }}
            responsive={true}
          />
        </ConfigProvider>
      </div>

      {/* Modal */}
      <Modal
        open={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div className="text-black">
          <div className="p-5">
            <div className="flex  items-center">
              <img
                className="size-28  rounded-full"
                src={`${selectedRecord?.avatarUrll || 'https://i.ibb.co.com/hX6p47G/Ellipse-62.png'}`}
                alt="Profile"
              />
              <h1 className="text-center text-2xl font-semibold my-2 ml-2">
              User details
              </h1>
            </div>
            {selectedRecord && (
              <>
                <div className="flex justify-between py-3 border-b">
                  <p>Transaction ID : </p>
                  <p>{selectedRecord.trxId}</p>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <p>Account ID:</p>
                  <p>{selectedRecord.accountID}</p>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <p>User Name:</p>
                  <p>{selectedRecord.fullName}</p>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <p>Email:</p>
                  <p>{selectedRecord.email}</p>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <p>Phone Number:</p>
                  <p>{selectedRecord.phonNumber}</p>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <p>Donation Amount:</p>
                  <p>{selectedRecord.amount}</p>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <p>Payment Type:</p>
                  <p>{selectedRecord.paymentType}</p>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <p>Gender:</p>
                  <p>{selectedRecord.gender}</p>
                </div>
                <div className="flex justify-between py-3">
                  <p> Date:</p>
                  <p>{selectedRecord.date}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Donation