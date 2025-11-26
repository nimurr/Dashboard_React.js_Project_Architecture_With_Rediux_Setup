import React, { useState } from "react";
import { Table, Modal, Pagination, ConfigProvider, Form, Input, Button, Upload, message } from "antd";
import { FaInfoCircle } from "react-icons/fa";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateLawyerMutation, useDeleteLawyerMutation, useGetAllLawyerQuery } from "../../redux/features/Lawyer/lawyer";
import moment from "moment";
import Url from "../../redux/baseApi/forImageUrl";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const Lawyera = () => {
    // Sample Data
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Handle "View Details" Modal
    const showDetails = (record) => {
        setSelectedUser(record);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setIsModalVisible(false);
    };

    // Handle "Add Lawyer" Modal
    const handleOpenAddModal = () => {
        setIsAddModalVisible(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalVisible(false);
        form.resetFields(); // Reset form fields after closing
    };

    const [image, setImage] = useState(null);

    const handleImageUpload = (info) => {
        console.log(info.file?.originFileObj);
        setImage(info.file?.originFileObj);
    };


    const { data, isLoading, refetch } = useGetAllLawyerQuery();
    console.log(data?.data);

    const [addLawyer] = useCreateLawyerMutation();

    // Handle Form Submission
    const handleAddLawyer = async (values) => {
        const form = new FormData();
        form.append("lawyer_image", image);
        form.append("lawyer_name", values.fullName);
        form.append("lawyer_email", values.email);
        form.append("lawyer_phone_number", Number(values.phone));
        form.append("lawyer_experience_in_year", values.yearOfExpriences);

        try {
            const response = await addLawyer(form).unwrap();
            console.log(response);
            if (response?.success) {
                message.success(response?.message);
                refetch()
                handleCloseAddModal(false);
            }
        } catch (error) {
            console.log(error);
            message.error(error?.data?.message);
        }
    };

    const [deleteLawyer] = useDeleteLawyerMutation();

    const handleDelete = async (item) => {
        const data = { lawyerId: item?.id };

        console.log(data);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteLawyer(data).unwrap();
                    console.log(res);
                    if (res?.success) {
                        message.success(res?.message);
                        refetch();
                    }
                } catch (error) {
                    console.log(error);
                    message.error(error?.data?.message);
                }
            }
        })

    }

    // Table Columns
    const columns = [
        {
            title: "#SI",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Full Name",
            dataIndex: "name",
            key: "name",
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
            dataIndex: "joinedDate",
            key: "joinedDate",
            render: (date) => moment(date).format("DD MMM YYYY"),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <div className="flex gap-3">
                    <FaInfoCircle
                        className="text-xl cursor-pointer hover:text-blue-500"
                        onClick={() => showDetails(record)}
                    />
                    <MdDeleteForever onClick={() => handleDelete(record)} className="text-2xl cursor-pointer text-red-600 hover:text-red-500" />
                </div>
            ),
        },
    ];

    // Paginate Data
    const paginatedData = data?.data?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="py-10 text-base">
            {/* Header with Add Button */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold mb-4">Lawyers List</h2>
                <button onClick={handleOpenAddModal} className="bg-[#038c6d] text-white text-xl py-2 px-8 rounded">
                    Add Lawyer
                </button>
            </div>

            {/* Table with Ant Design ConfigProvider */}
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
                    pagination={false} // Disabled default pagination to use custom
                    scroll={{ x: "max-content" }}
                    columns={columns}
                    dataSource={paginatedData}
                    rowKey="key"
                    bordered
                    className="shadow-md"
                />
            </ConfigProvider>

            {/* Custom Pagination */}
            <div className="flex justify-center mt-5">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={data?.data?.length || 0}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                />
            </div>

            {/* Lawyer Details Modal */}
            <Modal
                open={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
                title="Lawyer Details"
            >
                {selectedUser && (
                    <div className="text-gray-700">
                        <p className="my-5 flex items-center justify-between"><strong>Full Name:</strong> {selectedUser.name}</p>
                        <p className="my-5 flex items-center justify-between"><strong>Email:</strong> {selectedUser.email}</p>
                        <p className="my-5 flex items-center justify-between"><strong>Phone Number:</strong> {selectedUser.phone}</p>
                        <p className="my-5 flex items-center justify-between"><strong>Joined Date:</strong> {moment(selectedUser.createdAt).format("DD MMM YYYY")}</p>
                        <div>
                            <img className="w-2/4 mx-auto" src={Url + selectedUser.imageUrl} alt="" />
                        </div>
                    </div>
                )}
            </Modal>

            {/* Add Lawyer Modal */}
            <Modal
                open={isAddModalVisible}
                onCancel={handleCloseAddModal}
                footer={null}
                title="Add New Lawyer"
            >
                <Form form={form} layout="vertical" onFinish={handleAddLawyer}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: "Please enter full name" }]}
                    >
                        <Input placeholder="Enter full name" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter email" },
                            { type: "email", message: "Enter a valid email" },
                        ]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: "Please enter phone number" }]}
                    >
                        <Input placeholder="Enter phone number" />
                    </Form.Item>

                    {/* Year of experience */}
                    <Form.Item
                        label="Year of Experience"
                        name="yearOfExpriences"
                        type="number"
                        rules={[{ required: true, message: "Please enter year of experience" }]}
                    >
                        <Input placeholder="Enter year of experience" />
                    </Form.Item>

                    {/* Image Upload */}
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: "Please upload an image" }]}
                    >
                        <Upload
                            listType="picture"
                            maxCount={1}
                            onChange={handleImageUpload}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>

                    <div className="flex justify-end mt-4">
                        <Button onClick={handleCloseAddModal} className="mr-3">Cancel</Button>
                        <Button type="primary" htmlType="submit">Add Lawyer</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default Lawyera;
