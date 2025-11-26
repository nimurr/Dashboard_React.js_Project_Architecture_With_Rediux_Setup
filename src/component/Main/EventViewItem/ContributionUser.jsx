/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { ConfigProvider, Modal, Space, Table, Form, Input, DatePicker, Dropdown, Menu } from "antd";
import moment from "moment";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft, FaChevronDown, FaLock } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
const { Item } = Form;
const ContributionUser = () => {

  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalViewOpen, setIsModalViewOpen] = useState(false);
  const [params] = useState([]);

  const [allUser, setAllUser] = useState([]);
  const [user, setUser] = useState(null);
  const { data, isFetching, isError, error } = useGetAllUsersQuery(params);

  const handleView = (record) => {
    setUser(record);
    setIsModalViewOpen(true);
  };
  

  const [allUsers, setAllUsers] = useState([
    {
      id: 1,
      accountID:2010,
      displayName: "John",
      email: "johndoe@example.com",
      address_line1: "123 Main St, Springfield",
      image: { url: "https://randomuser.me/api/portraits/men/1.jpg" },
      phone: "123-456-7890",
      createdAt: "2024-01-01T10:00:00",
      status: "Only Registered",
    },
    {
      id: 2,
      accountID:2010,
      displayName: "Jane",
      email: "janesmith@example.com",
      address_line1: "456 Oak Ave, Springfield",
      image: { url: "https://randomuser.me/api/portraits/women/1.jpg" },
      phone: "234-567-8901",
      createdAt: "2024-02-01T11:00:00",
      status: "Subscribers",
    },
    {
      id: 3,
      accountID:2010,
      displayName: "Alice",
      email: "alicejohnson@example.com",
      address_line1: "789 Pine St, Springfield",
      image: { url: "https://randomuser.me/api/portraits/women/2.jpg" },
      phone: "345-678-9012",
      createdAt: "2024-03-01T12:00:00",
      status: "Only Registered",
    },
    {
      id: 4,
      accountID:2010,
      displayName: "Bob",
      email: "bobbrown@example.com",
      address_line1: "101 Maple Dr, Springfield",
      image: { url: "https://randomuser.me/api/portraits/men/2.jpg" },
      phone: "456-789-0123",
      createdAt: "2024-04-01T13:00:00",
      status: "Subscribers",
    },
    {
      id: 5,
      accountID:2010,
      displayName: "Charlie",
      email: "charliedavis@example.com",
      address_line1: "202 Birch Rd, Springfield",
      image: { url: "https://randomuser.me/api/portraits/men/3.jpg" },
      phone: "567-890-1234",
      createdAt: "2024-05-01T14:00:00",
      status: "Only Registered",
    },
  ]);
  
 
  const dataSource = allUsers?.map((user, index) => ({
    id: user.id,
    si: index + 1,
    displayName: user?.displayName,
    accountID: user?.accountID,
    email: user?.email,
    phone: user?.phone,
    address_line1:user?.address_line1,
    createdAt: user?.createdAt,
    imageUrl: user?.image?.url,
    status: user?.status,
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
      render: (_, record) => (
        <div className="flex items-center">
          <img
            src={record.imageUrl}
            alt="Profile"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span>{record.accountID}</span>
        </div>
      ),
    },
    {
      title: "Display Name",
      dataIndex: "displayName",
      key: "displayName",
      
    }, 
    {
      title: "Update Date Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Update Details",
      key: "action",
      render: (_, record) => (
        <AiFillEye
            onClick={() => handleView(record)}
            style={{ fontSize: "18px", cursor: "pointer" }}
            className="text-[#85594B]"
          />
      ),
    }
  ];

  useEffect(() => {
    if (isError && error) {
      setAllUser([]);
    } else if (data) {
      setAllUser(data?.data?.attributes?.user?.results);
    }
  }, [data, isError, error]);

  return (
    <section>
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
          loading={isFetching}
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            onChange: setCurrentPage,
            pageSize: 4,
          }}
          scroll={{ x: "max-content" }}
          responsive={true}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
        />
      </ConfigProvider>
      {/* view modal */}
      <Modal
        open={isModalViewOpen}
        onOk={() => setIsModalViewOpen(false)}
        onCancel={() => setIsModalViewOpen(false)}
        footer={null}
        centered
      >
        <div className="text-black bg-primary">
          
          <h1 className="text-center text-2xl font-semibold my-2">
            Update Details
          </h1>
          <div className="p-5">
            
            <div className="flex justify-between py-3 border-b">
              <p>User Name : </p>
              <p>{user?.displayName || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Location : </p>
              <p>{user?.address_line1 || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p> Date :</p>
              <p>
                {user?.createdAt
                  ? moment(user.createdAt).format("DD MMM YYYY")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default ContributionUser;
