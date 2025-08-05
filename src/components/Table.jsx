import { useState } from "react";
import { AiFillFileExcel } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";

function Table() {
  const details = useSelector((state) => state.details.contacts);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "";
      key = "";
    }
    setSortConfig({ key, direction });
  };

  const renderSortArrow = (key) => {
    if (sortConfig.key !== key) return "↕";
    if (sortConfig.direction === "ascending") return "↑";
    if (sortConfig.direction === "descending") return "↓";
    return "↕";
  };

  const filteredContacts = details.filter((contact) =>
    Object.values(contact).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (sortConfig.key === "") return 0;

    const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
    const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContacts = sortedContacts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedContacts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    XLSX.writeFile(workbook, "Contacts_List.xlsx");
  };

  return (
    <div className="table">
      <div className="table-headings">
        <div>
          <h3>Contact List</h3>
          <p>Here is a List of Contact</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            className="excel"
            style={{ cursor: "pointer" }}
            onClick={handleDownloadExcel}
          >
            <AiFillFileExcel size={20} color="green" />
          </div>
          <div className="view">
            <VscSettings size={14} />
            <p>View</p>
          </div>
          <div className="search-input">
            <CiSearch size={20} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      <table className="main-table">
        <thead>
          <tr>
            <th>
              <div>Edit</div>
            </th>
            <th onClick={() => handleSort("contactOwner")}>
              <div>
                <p>Contact Owner {renderSortArrow("contactOwner")}</p>
              </div>
            </th>
            <th onClick={() => handleSort("accountName")}>
              <div>
                <p>Account Name {renderSortArrow("accountName")}</p>
              </div>
            </th>
            <th onClick={() => handleSort("name")}>
              <div>
                <p>Name {renderSortArrow("name")}</p>
              </div>
            </th>
            <th onClick={() => handleSort("email")}>
              <div>
                <p>Email {renderSortArrow("email")}</p>
              </div>
            </th>
            <th onClick={() => handleSort("phone")}>
              <div>
                <p>Phone {renderSortArrow("phone")}</p>
              </div>
            </th>
            <th onClick={() => handleSort("createdDate")}>
              <div>
                <p>Created Date {renderSortArrow("createdDate")}</p>
              </div>
            </th>
            <th onClick={() => handleSort("contactLog")}>
              <div>
                <p>Contact Log {renderSortArrow("contactLog")}</p>
              </div>
            </th>
            <th onClick={() => handleSort("contactSource")}>
              <div>
                <p>Contact Source {renderSortArrow("contactSource")}</p>
              </div>
            </th>
            <th onClick={() => handleSort("contactStatus")}>
              <div>
                <p>Contact Status {renderSortArrow("contactStatus")}</p>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedContacts.map((contact) => (
            <tr key={contact.id} style={{ height: 40 }}>
              <td>
                <FaEdit style={{ cursor: "pointer", paddingLeft: 10 }} />
              </td>
              <td>{contact.contactOwner}</td>
              <td>{contact.accountName}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.createdDate}</td>
              <td>{contact.contactLog}</td>
              <td>{contact.contactSource}</td>
              <td>{contact.contactStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="pagination-button"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Table;
