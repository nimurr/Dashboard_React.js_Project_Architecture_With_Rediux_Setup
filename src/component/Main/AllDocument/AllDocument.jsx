import React, { useState } from "react";
import { Form, Input, DatePicker, Modal, Button, message, Spin } from "antd";
import { IoIosSearch } from "react-icons/io";
import moment from "moment";
import { useApproveDocumentMutation, useGetAllDocumentQuery } from "../../../redux/features/Document/document";
import Url from "../../../redux/baseApi/forImageUrl";
import Swal from "sweetalert2";

const { Item } = Form;

const AllDocument = () => {
    const [searchText, setSearchText] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    // Fetch documents from API
    const { data: documentData, isLoading } = useGetAllDocumentQuery();
    console.log(documentData?.data);

    // Sample static data if API is empty


    // Use API data if available, otherwise fallback to static data
    const dataSource = documentData?.data;

    // ** Open Modal with Selected Record Information **
    const handleViewInfo = (record) => {
        setSelectedRecord(record);
        setModalVisible(true);
    };

    // ** Handle Close Modal **
    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedRecord(null);
    };

    // ** Handle Download Action **
    const handleDownload = (fileUrl) => {

        if (!fileUrl) {
            console.error("No file URL provided.");
            return;
        }

        // Create a temporary <a> element
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", fileUrl); // Set a default file name
        link.setAttribute("target", "_blank"); // Open in a new tab if needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    };


    const [approvedDocument] = useApproveDocumentMutation()
    // ** Handle Approve Action **
    const handleApprove = async (item) => {

        const data = {
            userId: item?.userId,
            action: "approve"
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to approve this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, approve it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await approvedDocument(data).unwrap();
                    console.log(res);
                    if (res?.success) {
                        message.success(res?.message);
                        setModalVisible(false);
                    }

                } catch (error) {
                    console.log(error);
                    message.error(error?.data?.message);
                }
            }
        });


        // try {

        //     const res = await approvedDocument(data).unwrap();
        //     console.log(res);
        //     if (res?.success) {
        //         message.success(res?.message);
        //         setModalVisible(false);
        //     }

        // } catch (error) {
        //     console.log(error);
        // }



        console.log("Document approved!");
        // setModalVisible(false);
    };

    // ** Filter Data Based on Search and Date **
    const filteredData = dataSource?.filter((item) => {
        const matchesSearch = item?.fullName?.toLowerCase().includes(searchText.toLowerCase()) || item?.email?.toLowerCase().includes(searchText.toLowerCase());
        const matchesDate = selectedDate ? moment(item.joinedDate).isSame(selectedDate, "day") : true;
        return matchesSearch && matchesDate;
    });

    // ** Pagination Settings **
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
    const paginatedData = filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <section className="container p-4">
            <div className="md:flex justify-between items-center py-6 mb-4">
                <div className="text-2xl flex items-center">All Document List</div>
                <Form layout="inline" className="flex space-x-4">

                    <Item name="username">
                        <Input
                            className="rounded-md w-[70%] md:w-full border border-[#92b8c0]"
                            placeholder="Search by Name or Email"
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

            {/* Raw HTML Table */}
            <div className="overflow-x-auto">
                {
                    isLoading ? (
                        <div className="my-20">
                            <h2 className="text-3xl font-semibold text-center text-blue-600">Loading ...</h2>
                        </div>
                    ) :
                        <table className="min-w-full border border-gray-300">
                            <thead className="bg-[#92b8c0] text-black">
                                <tr>
                                    <th className="p-2 border">#SI</th>
                                    <th className="p-2 border">Name</th>
                                    <th className="p-2 border">Email</th>
                                    <th className="p-2 border">Status</th>
                                    <th className="p-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {paginatedData?.length > 0 ? (
                                    paginatedData?.map((record, index) => (
                                        <tr key={record.id} className="text-center border-b">
                                            <td className="p-2 border">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td className="p-2 border">{record.fullName}</td>
                                            <td className="p-2 border">{record.email}</td>
                                            <td className="p-2 border">{record.authCardImageApprovalStatus}</td>
                                            <td className="p-2 border">
                                                <button
                                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                                    onClick={() => handleViewInfo(record)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="p-2 border text-center">
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                }

            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button
                    className={`px-4 py-2 mx-1 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    className={`px-4 py-2 mx-1 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            {/* Modal for Viewing Document Info */}
            <Modal
                title="Document Details"
                visible={modalVisible}
                onCancel={handleCloseModal}
                footer={null}
            >
                {selectedRecord && (
                    <div>
                        <p className="flex items-center justify-between my-5"><strong>Name:</strong> {selectedRecord.fullName}</p>
                        <p className="flex items-center justify-between my-5"><strong>Email:</strong> {selectedRecord.email}</p>

                        <img src={Url + selectedRecord?.authCardImageSrc} alt="" />
                        <div className="flex justify-center space-x-4 mt-4">
                            <Button onClick={() => handleDownload(selectedRecord?.authCardImageSrc)}>
                                Download
                            </Button>
                            <Button onClick={() => handleApprove(selectedRecord)} className="bg-blue-500 text-white">
                                Approve
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
};

export default AllDocument;
