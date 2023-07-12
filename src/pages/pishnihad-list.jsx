import React, { useRef, useState, useEffect } from "react";
import { Divider, Input, Space, Table, Button, message } from "antd";
import Sidebar from "../components/Sidebar";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Header from "../components/header";
import Footer from "../components/footer";
import { BsTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import "./pages.css";
import axios from "axios";

const PishnihadList = () => {
  const storedUserData = localStorage.getItem("user");
  const [userData, setUserData] = useState(JSON.parse(storedUserData));
  // console.log("Decoded values", userData);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [listItems, setListItems] = useState({});
  const [backgroundVisibility, setBackgroundVisibility] = useState(false);
  const [itemId, setItemId] = useState();
  const [deletePishnihad, setDeletePishnihad] = useState(false);

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

  const columns = [
    {
      title: "ګڼه/ شماره",
      dataIndex: "PishnihadNo",
      key: "PishnihadNo",
      width: "20%",
      ...getColumnSearchProps("PishnihadNo"),
      sorter: (a, b) => parseInt(a.PishnihadNo) - parseInt(b.PishnihadNo),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "مخاطب",
      dataIndex: "Recipent",
      key: "recipent",
      width: "30%",
      ...getColumnSearchProps("Recipent"),
    },
    {
      title: "موضوع",
      dataIndex: "Subject",
      key: "Subject",
      ...getColumnSearchProps("Subject"),
      width: "30%",
      render: (text, record) => (
        <a href={`/pishnihad/${record.PishnihadNo}`}>{text}</a>
      ),
    },
    {
      title: "نیټه/ تاریخ",
      dataIndex: "PishnihadDate",
      key: "PishnihadDate",
      ...getColumnSearchProps("PishnihadDate"),
      width: "20%",
    },
    {
      title: "تغیر/حذف",
      dataIndex: "operation",
      key: "opeation",
      width: "30%",
      render: (_, record) => (
        <div className="d-flex">
          <Divider type="vertical" />
          <a href={`/pishnihad/${record._id}`}>
            {" "}
            <BsPencilSquare />{" "}
          </a>

          <Divider type="vertical" />
          <a
            onClick={() => openDeleteConfirmation(record.PishnihadNo)}
            className="link  p-0"
            activeclassName="active"
          >
            <BsTrashFill id="deleteIcon" outline />
          </a>
        </div>
      ),
    },
  ];

  const gettingPishnihads = () => {
    axios
      .post("/api/pishnihad/pishnihads", {
        data: {
          userId: userData.userId,
          presidencyName: userData.presidencyName,
        },
      })
      .then((res) => {
        console.log("response is: ", res.data);
        setListItems(res.data.pishnihadsList);
      })
      .catch((err) => {
        console.log("Axios Request Error After Calling API", err.response);
      });
  };

  useEffect(() => {
    gettingPishnihads();
  }, []);

  // Deleting the pishnihads
  const handleDelete = () => {
    setDeletePishnihad(false);
    setBackgroundVisibility(false);
    axios
      .delete("/api/pishnihad/delete", {
        data: {
          pishnihadId: itemId,
          userId: userData.userId,
        },
      })
      .then((res) => {
        console.log("response is: ", res.data);
        message.success({
          content: "پیشنهاد په بریالیتوب سره پاک شو/ پیشنهاد موفقانه حذف گردید",
          className: "success_custom_message",
        });

        gettingPishnihads();
      })
      .catch((err) => {
        console.log("Axios Request Error After Calling API", err.response);
      });
  };

  const openDeleteConfirmation = (recordNo) => {
    setItemId(recordNo);
    setBackgroundVisibility(true);
    setDeletePishnihad(true);
    console.log("");
  };
  const handleDeleteCancelation = () => {
    setDeletePishnihad(false);
    setBackgroundVisibility(false);
  };

  const listItemsArray = Object.values(listItems);

  const sortedListItemsArray = listItemsArray.sort(
    (a, b) => parseInt(b.PishnihadNo) - parseInt(a.PishnihadNo)
  );
  return (
    <Sidebar>
      <Header />
      <div
        className={
          backgroundVisibility
            ? "main-container_darkbackround text-right"
            : "main-container text-right"
        }
      >
        <h1>د پیشنهادونو لست</h1>
        <Divider />
        <Table
          columns={columns}
          dataSource={sortedListItemsArray.filter((record) =>
            columns.some(
              (column) =>
                column.hasOwnProperty("onFilter") &&
                record.hasOwnProperty(column.dataIndex) &&
                column.onFilter(searchText, record)
            )
          )}
        />
      </div>
      {deletePishnihad && (
        <div className="confirmation-modal">
          <p className="">
            آیا تاسې غواړۍ پیشنهاد پاک کړئ / آیا شما میخواهید پیشنهاد را حذف
            کنید؟
          </p>

          <div className="button-container ">
            <button
              className="cancel-button bg-primary mx-5 px-5"
              onClick={handleDeleteCancelation}
            >
              نه/نخیر
            </button>
            <button
              className="confirm-button bg-primary mx-5 px-5"
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

export default PishnihadList;
