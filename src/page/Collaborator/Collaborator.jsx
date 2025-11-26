import { useEffect, useState } from "react";
import { ConfigProvider, Table, Form, Input, DatePicker } from "antd";
import moment from "moment";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoInfo } from "react-icons/go";
import { useGetAllCollectorsQuery } from "../../redux/features/user/userApi";

const { Item } = Form;

const Collaborator = () => {
  const { data, isFetching, isError, error } = useGetAllCollectorsQuery({
    from: 0,
    to: 10,
  });

  console.log("Fetched Data:", data?.data?.attributes);

  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState([]); // ✅ Store filtered data

  const allUsers = data?.data?.attributes;

  // ✅ **Update `dataSource` when API call completes**
  useEffect(() => {
    if (allUsers) {
      const formattedUsers = allUsers.map((user, index) => ({
        id: user.id || user._id, // Ensure ID exists
        si: index + 1,
        fullName: user.fullName,
        accountID: user.accountID,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address_line1: user.address_line1,
        createdAt: user.createdAt,
        imageUrl: user.image?.url,
        status: user.status,
        gender: user.gender,
      }));
      setDataSource(formattedUsers);
    }
  }, [allUsers]);

  // ✅ **Search Filter**
  useEffect(() => {
    if (searchText.trim() === "") {
      setDataSource(allUsers || []);
    } else {
      setDataSource(
        allUsers?.filter(
          (user) =>
            user.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
            String(user.phone)?.includes(searchText)
        ) || []
      );
    }
  }, [searchText, allUsers]);

  // ✅ **Date Filter**
  useEffect(() => {
    if (!selectedDate) {
      setDataSource(allUsers || []);
    } else {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      setDataSource(
        allUsers?.filter((user) => moment(user.createdAt).format("YYYY-MM-DD") === formattedDate) || []
      );
    }
  }, [selectedDate, allUsers]);

  const columns = [
    {
      title: "#SI", dataIndex: "si", key: "si",
      render: (text, record, index) => {
        return <span>{index + 1}</span>;
      }

    },
    // { title: "Account ID", dataIndex: "accountID", key: "accountID" },
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
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
        <Link to={`/collaborator/${record.id}`}>
          <GoInfo className="text-2xl" />
        </Link>
      ),
    },
  ];

  return (
    <section>
      <div className="md:flex justify-between items-center py-6 mb-4">
        <Link to={"/collaborator"} className="text-2xl flex items-center">
          <FaAngleLeft /> Collaborator List
        </Link>
        <Form layout="inline" className="flex space-x-4">
          <Item name="date">
            <DatePicker
              className="rounded-md border border-[#92b8c0]"
              onChange={(date) => setSelectedDate(date)}
              placeholder="Select Date"
            />
          </Item>
          <Item name="username">
            <Input
              className="rounded-md w-[70%] md:w-full border border-[#92b8c0]"
              placeholder="User Name"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Item>
          <Item>
            <button className="size-8 rounded-full flex justify-center items-center bg-[#92b8c0] text-black">
              <IoIosSearch className="size-5" />
            </button>
          </Item>
        </Form>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#92b8c0",
              headerColor: "#000",
              headerBorderRadius: 5,
            },
          },
        }}
      >
        <Table
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            onChange: setCurrentPage,
          }}
          scroll={{ x: "max-content" }}
          responsive={true}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          loading={isFetching}
        />
      </ConfigProvider>
    </section>
  );
};

export default Collaborator;
