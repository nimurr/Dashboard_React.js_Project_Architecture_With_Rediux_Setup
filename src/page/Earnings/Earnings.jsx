import React, { useState, useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { Modal, Pagination } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { jsPDF } from "jspdf";
import { useGetEarningsQuery } from "../../redux/features/earnings/earningsApi";

const Earnings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // ✅ Fetch earnings data
  const { data: earningsData, isLoading } = useGetEarningsQuery({
    from: (currentPage - 1) * pageSize,
    to: currentPage * pageSize,
  });

  console.log("Fetched Earnings Data:", earningsData);

  // ✅ Store API data in state for filtering
  const [filteredEarnings, setFilteredEarnings] = useState([]);
  useEffect(() => {
    setFilteredEarnings(earningsData || []);
  }, [earningsData]);

  // ✅ Handle Search
  useEffect(() => {
    let filteredData = earningsData || [];

    // Filter by Name
    if (searchText.trim() !== "") {
      filteredData = filteredData.filter((row) =>
        row.userName?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by Date
    if (searchDate.trim() !== "") {
      filteredData = filteredData.filter(
        (row) => new Date(row.updatedAt).toISOString().split("T")[0] === searchDate
      );
    }

    setFilteredEarnings(filteredData);
  }, [searchText, searchDate, earningsData]);

  const showModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    if (selectedTransaction) {
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Transaction Details", 14, 20);
      doc.setFontSize(12);

      const leftMargin = 10;
      const detailsStartY = 30;

      doc.rect(leftMargin, detailsStartY, 190, 90);
      doc.text(`Transaction ID: #${selectedTransaction.id}`, leftMargin + 6, detailsStartY + 10);
      doc.text(`User Name: ${selectedTransaction.userName}`, leftMargin + 6, detailsStartY + 20);
      doc.text(`Location: ${selectedTransaction.location}`, leftMargin + 6, detailsStartY + 30);
      doc.text(`Date: ${selectedTransaction.date}`, leftMargin + 6, detailsStartY + 40);
      doc.text(`Withdraw Amount: $${selectedTransaction.amount}`, leftMargin + 6, detailsStartY + 50);

      doc.save("transaction-details.pdf");
    }
  };

  console.log(selectedTransaction);

  return (
    <div className="w-full p-5 overflow-x-auto">
      <div className="w-full md:flex justify-between items-center py-6">
        <h1 className="text-2xl flex items-center">
          <FaAngleLeft /> Earnings
        </h1>
        <div className="flex items-center gap-2">
          {/* ✅ Date Search */}
          <input
            type="date"
            className="border border-gray-300 px-4 py-2 rounded-md mr-2"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />

          {/* ✅ Transaction ID Search */}
          <input
            type="text"
            name="UserName"
            className="border border-gray-300 px-4 py-2 rounded-md mr-2"
            placeholder="Search by Transaction ID"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="bg-[#038c6d] text-white w-10 h-10 flex items-center justify-center rounded-md ml-2">
            <IoSearchOutline />
          </button>
        </div>
      </div>

      <div className="">
        <table className="w-full border-collapse border-[#92b8c0] min-w-[1000px]">
          <thead className="bg-[#92b8c0]">
            <tr>
              <th className="border-gray-300 px-4 py-2 text-left">Transaction ID</th>
              {/* <th className="border-gray-300 px-4 py-2 text-left">Card Brand</th> */}
              <th className="border-gray-300 px-4 py-2 text-left">Currency</th>
              <th className="border-gray-300 px-4 py-2 text-left">Amount</th>
              <th className="border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border-gray-300 px-4 py-2 text-left">Payment Method</th>
              <th className="border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEarnings.map((row, index) => (
              <tr key={row?.id} className="hover:bg-gray-50">
                <td className="border-gray-300 px-4 py-2">{row?.transactionId}</td>
                {/* <td className="border-gray-300 px-4 py-2">{row?.cardBrand}</td> */}
                <td className="border-gray-300 px-4 py-2">{row?.currency}</td>
                <td className="border-gray-300 px-4 py-2">{row?.amount}</td>
                <td className="border-gray-300 px-4 py-2">Success</td>
                <td className="border-gray-300 px-4 py-2">{row?.status}</td>
                <td className="border-gray-300 px-4 py-2">{new Date(row?.updatedAt).toLocaleDateString()}</td>
                <td className="border-gray-300 px-4 py-2">
                  <div onClick={() => showModal(row)} className="cursor-pointer">
                    <HiOutlineDotsHorizontal className="text-2xl font-semibold" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={earningsData?.total || 0}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      </div>

      {/* ✅ Modal for Transaction Details */}
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null} width={600}>
        {selectedTransaction && (
          <div className="text-black">
            <h2 className="text-2xl font-semibold mb-4 text-center">Transaction Details</h2>

            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Transaction ID:</p>
              <p>{selectedTransaction?.transactionId}</p>
            </div>

            {/* <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Card Brand:</p>
              <p>{selectedTransaction?.cardBrand}</p>
            </div> */}

            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Currency:</p>
              <p>{selectedTransaction?.currency}</p>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Amount:</p>
              <p>{selectedTransaction?.amount}</p>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Status:</p>
              <p>Success</p>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Payment Method:</p>
              <p>{selectedTransaction?.status}</p>
            </div>

            <button onClick={downloadPDF} className="border border-[#92b8c0] w-full px-4 py-2 rounded text-black font-semibold mt-4">
              Download PDF
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Earnings;
