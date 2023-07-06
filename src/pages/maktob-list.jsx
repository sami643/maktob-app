import React, { useEffect, useRef, useState } from "react";
import { Divider, Input, Space, Table, Button } from "antd";
import Sidebar from "../components/Sidebar";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Header from "../components/header";
import Footer from "../components/footer";
import { maktobs } from "../assets/data/data.js";
import { BsTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./pages.css";
import axios from "axios";

const MaktobList = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [searchInputValue, setSearchInputValue] = useState("");
  const handleSearch = (selectedKeys, dataIndex) => {
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = () => {
    setSearchText("");
    setSearchedColumn("");
    if (searchInput.current && searchInput.current.input) {
      searchInput.current.input.value = ""; // Clear the input value
      searchInput.current.focus(); // Set focus back to the input field
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={
            () => handleSearch(selectedKeys, dataIndex) // Call handleSearch when pressing Enter
          }
          style={{ marginBottom: 8, display: "block" }}
        />

        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, dataIndex)} // Call handleSearch when clicking Search
            icon={<SearchOutlined />}
            size="medium"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={handleReset} // Call handleReset when clicking Reset
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [listItems, setListItems] = useState({});
  // Retrieving data from the LocalStorage
  const storedUserData = localStorage.getItem("user");
  const [userData, setUserData] = useState(JSON.parse(storedUserData));
  console.log("Decoded values", userData);
  
  const gettingMakbtobs = () => {
    axios
      .post("/api/maktob/maktobs", {
        data: {
          userId: userData.userId,
          presidencyName: userData.presidencyName,
        },
      })
      .then((res) => {
        console.log("response is: ", res.data);
        setListItems(res.data.Maktobs_List_data);
      })
      .catch((err) => {
        console.log("Axios Request Error After Calling API", err.response);
      });
  };
  // Integration
  useEffect(() => {
    gettingMakbtobs();
  }, []);

  // Deleting the message
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleCancel = () => {
    console.log("Cancelled");
    setShowConfirmation(false);
    setVisibility(false);
  };
  const [visibility, setVisibility] = useState(false);
  const [itemId, setItemId] = useState();
  const openConfirmation = (recordNo) => {
    setItemId(recordNo);
    setVisibility(true);
    setShowConfirmation(true);
  };

  // Deleting the maktob
  const handleDelete = () => {
    setShowConfirmation(false);
    setVisibility(false);
    axios
      .delete("/api/maktob/delete", {
        data: {
          maktobId: itemId,
        },
      })
      .then((res) => {
        console.log("response is: ", res.data);
        gettingMakbtobs();
      })
      .catch((err) => {
        console.log("Axios Request Error After Calling API", err.response);
      });
  };

  const columns = [
    {
      title: "ګڼه/شماره",
      dataIndex: "MaktobNo",
      key: "MaktobNo",
      width: "15%",
      ...getColumnSearchProps("MaktobNo"),
      sorter: (a, b) => parseInt(a.MaktobNo) - parseInt(b.MaktobNo),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "مخاطب",
      dataIndex: "Recipent",
      key: "Recipent",
      width: "30%",
      ...getColumnSearchProps("Recipent"),
    },
    {
      title: "موضوع",
      dataIndex: "Subject",
      key: "subject",
      ...getColumnSearchProps("Subject"),

      width: "30%",
      render: (text, record) => (
        <a href={`/maktob/${record.MaktobNo}`}>{text}</a>
      ),
    },
    {
      title: "نیټه/ تاریخ",
      dataIndex: "MaktobDate",
      key: "MaktobDate",
      ...getColumnSearchProps("MaktobDate"),
      width: "15%",
    },

    {
      title: "تغیر/حذف",
      dataIndex: "operation",
      key: "opeation",
      width: "30%",
      render: (_, record) => (
        <div className="d-flex">
          <Divider type="vertical" />
          <BsPencilSquare />
          <Divider type="vertical" />
          <a
            onClick={() => openConfirmation(record.MaktobNo)}
            className="link  p-0"
            activeclassName="active"
          >
            <BsTrashFill id="deleteIcon" outline />
          </a>
        </div>
      ),
    },
  ];

  const listItemsArray = Object.values(listItems);
  console.log("listItems32423432", listItemsArray);
  return (
    <Sidebar>
      <Header />
      <div
        className={
          visibility
            ? "main-container_darkbackround text-right"
            : "main-container text-right"
        }
      >
        <h1>د مکتوبونو لست</h1>
        <Divider />
        <Table
          columns={columns}
          dataSource={listItemsArray.filter((record) =>
            columns.some(
              (column) =>
                column.hasOwnProperty("onFilter") &&
                record.hasOwnProperty(column.dataIndex) &&
                column.onFilter(searchText, record)
            )
          )}
        />
      </div>
      {showConfirmation && (
        <div className="confirmation-modal">
          <p>وتل/ خروج</p>
          <div className="button-container">
            <button className="cancel-button bg-primary" onClick={handleCancel}>
              نه/نخیر
            </button>
            <button
              className="confirm-button bg-primary"
              onClick={handleDelete}
            >
              هو/ بلی
            </button>
          </div>
        </div>
      )}
      <Footer />
    </Sidebar>
  );
};

export default MaktobList;
