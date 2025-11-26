/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {  Modal } from "antd";
import moment from "moment";
import { useGetAllUsersQuery } from "../../../redux/features/user/userApi";
const ModalView = () => {
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
      accountID:2010,
      firstName: "Jane",
      lastName: "Smith",
      gender:"Male",
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
      firstName: "Alice",
      lastName: "Johnson",
      gender:"Male",
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
      firstName: "Bob",
      lastName: "Brown",
      gender:"Male",
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
      firstName: "Charlie",
      lastName: "Davis",
      gender:"Male",
      email: "charliedavis@example.com",
      address_line1: "202 Birch Rd, Springfield",
      image: { url: "https://randomuser.me/api/portraits/men/3.jpg" },
      phone: "567-890-1234",
      createdAt: "2024-05-01T14:00:00",
      status: "Only Registered",
    },
    {
      id: 6,
      accountID:2010,
      firstName: "Emily",
      lastName: "Evans",
      gender:"Male",
      email: "emilyevans@example.com",
      address_line1: "303 Cedar Ln, Springfield",
      image: { url: "https://randomuser.me/api/portraits/women/3.jpg" },
      phone: "678-901-2345",
      createdAt: "2024-06-01T15:00:00",
      status: "Subscribers",
    },
    {
      id: 7,
      accountID:2010,
      firstName: "Frank",
      lastName: "Garcia",
      gender:"Male",
      email: "frankgarcia@example.com",
      address_line1: "404 Walnut St, Springfield",
      image: { url: "https://randomuser.me/api/portraits/men/4.jpg" },
      phone: "789-012-3456",
      createdAt: "2024-07-01T16:00:00",
      status: "Only Registered",
    },
    {
      id: 8,
      accountID:2010,
      firstName: "Grace",
      lastName: "Harris",
      gender:"Male",
      email: "graceharris@example.com",
      address_line1: "505 Elm St, Springfield",
      image: { url: "https://randomuser.me/api/portraits/women/4.jpg" },
      phone: "890-123-4567",
      createdAt: "2024-08-01T17:00:00",
      status: "Subscribers",
    },
  ]);
  
 
  const dataSource = allUsers?.map((user, index) => ({
    id: user.id,
    si: index + 1,
    firstName: user?.firstName,
    lastName: user?.lastName,
    accountID: user?.accountID,
    email: user?.email,
    phone: user?.phone,
    address_line1:user?.address_line1,
    createdAt: user?.createdAt,
    imageUrl: user?.image?.url,
    status: user?.status,
    gender: user?.gender
  }));

  

  useEffect(() => {
    if (isError && error) {
      setAllUser([]);
    } else if (data) {
      setAllUser(data?.data?.attributes?.user?.results);
    }
  }, [data, isError, error]);

  return (
    <section>
      {/* view modal */}
      <Modal
        open={isModalViewOpen}
        onOk={() => setIsModalViewOpen(false)}
        onCancel={() => setIsModalViewOpen(false)}
        footer={null}
        centered
      >
        <div className="text-black bg-primary">
          <div className="p-5">
          <div className="flex  items-center">
            <img
              className="size-24 rounded-full"
              src={`${user?.imageUrl}`}
              alt="Profile"
            />
            <h1 className="text-center text-2xl font-semibold my-2 ml-5">
              User Details
            </h1>
          </div>
            <div className="flex justify-between py-3 border-b">
              <p>Account ID : </p>
              <p>{user?.accountID || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>First Name : </p>
              <p>{user?.firstName || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Last Name : </p>
              <p>{user?.lastName || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Gender :</p>
              <p>{user?.gender || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Email : </p>
              <p>{user?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Phone Number : </p>
              <p>{user?.phone || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3 border-b">
              <p>Location : </p>
              <p>{user?.address_line1 || "N/A"}</p>
            </div>
            <div className="flex justify-between py-3">
              <p>Joining Date :</p>
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

export default ModalView;
