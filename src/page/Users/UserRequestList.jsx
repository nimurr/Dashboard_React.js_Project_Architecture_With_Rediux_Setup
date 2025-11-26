/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ConfigProvider, Table, Form, Input, DatePicker, Button } from "antd";
import moment from "moment";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoInfo } from "react-icons/go";

const { Item } = Form;

const UserRequestList = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // Items per page

  const [allUsers, setAllUsers] = useState([
    {
      id: 1,
      accountID: 2010,
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      address_line1: "123 Main St, Springfield",
      image: { url: "https://randomuser.me/api/portraits/men/1.jpg" },
      phone: "123-456-7890",
      createdAt: "2024-01-01T10:00:00",
      status: "Only Registered",
    },
    {
      id: 2,
      accountID: 2010,
      firstName: "Jane",
      lastName: "Smith",
      gender: "Male",
      email: "janesmith@example.com",
      address_line1: "456 Oak Ave, Springfield",
      image: { url: "https://randomuser.me/api/portraits/women/1.jpg" },
      phone: "234-567-8901",
      createdAt: "2024-02-01T11:00:00",
      status: "Subscribers",
    },
  ]);

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearchText = `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesDate = selectedDate
      ? moment(user.createdAt).isSame(selectedDate, "day")
      : true;

    return matchesSearchText && matchesDate;
  });

  const dataSource = filteredUsers
    .slice((currentPage - 1) * pageSize, currentPage * pageSize)
    .map((user, index) => ({
      id: user.id,
      si: index + 1 + (currentPage - 1) * pageSize,
      firstName: user?.firstName,
      lastName: user?.lastName,
      accountID: user?.accountID,
      email: user?.email,
      phone: user?.phone,
      address_line1: user?.address_line1,
      createdAt: user?.createdAt,
      imageUrl: user?.image?.url,
      status: user?.status,
      gender: user?.gender,
    }));

  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
    },
    {
      title: "Account ID",
      dataIndex: "accountID",
      key: "accountID",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Joined Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Link to={`/user-request/user-list/${record.id}`}>
            <GoInfo className="text-2xl" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <section>
      <div className="md:flex justify-between items-center py-6 mb-4">
        <h1 className="text-2xl flex items-center">
          <FaAngleLeft /> All Users
        </h1>
        <Form layout="inline" className="flex space-x-4">
          <Item name="date">
            <DatePicker
              className="rounded-md border border-[#f1bd19]"
              onChange={(date) => setSelectedDate(date)}
              placeholder="Select Date"
            />
          </Item>
          <Item name="username">
            <Input
              className="rounded-md w-[70%] md:w-full border border-[#f1bd19]"
              placeholder="User Name"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Item>
          <Item>
            <Button
              className="rounded-full bg-[#f1bd19] text-black"
              onClick={() => setCurrentPage(1)} // Reset to first page
            >
              <IoIosSearch />
            </Button>
          </Item>
        </Form>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#f1bd19",
              headerColor: "#000",
              headerBorderRadius: 5,
            },
          },
        }}
      >
        <Table
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredUsers.length,
            onChange: setCurrentPage,
          }}
          scroll={{ x: "max-content" }}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
        />
      </ConfigProvider>
    </section>
  );
};

export default UserRequestList;
