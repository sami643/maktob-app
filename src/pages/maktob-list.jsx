import React, { useEffect, useRef, useState } from "react";
import { Divider, Input, Space, Table, Button, message } from "antd";
import Sidebar from "../components/Sidebar";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Header from "../components/header";
import Footer from "../components/footer";
import { BsTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { Card } from "antd";
import "./pages.css";
import axios from "axios";
const MaktobList = () => {
  // Retrieving data from the LocalStorage
  const storedUserData = localStorage.getItem("user");
  const [userData, setUserData] = useState(JSON.parse(storedUserData));
  // console.log("Decoded values", userData);
  const [matkobIdForUpdate, setMaktobIdForUpdate] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [backgroundVisibility, setBackgroundVisibility] = useState(false);
  const [itemId, setItemId] = useState();
  const [deleteMaktob, setDeletemaktob] = useState(false);
  const [newMakobListItems, setNewMaktobsListItems] = useState({});
  const [sentMakobListItems, setSentMaktobsListItems] = useState({});
  const [recievedMakobListItems, setRecievedMaktobsListItems] = useState({});
  const [listFinalItems, setListFinalItems] = useState({});
  const [activeList, setActiveList] = useState("newMaktob");
  const [IsMaktobSent, setIsmaktobSent] = useState("No");

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
        <a href={`/maktob/${record.MaktobNo}?isMaktobSent=${IsMaktobSent}`}>
          {text}
        </a>
      ),
    },
    {
      title: "نیټه/ تاریخ",
      dataIndex: "MaktobDate",
      key: "MaktobDate",
      ...getColumnSearchProps("MaktobDate"),
      width: "15%",
    },

    activeList === "newMaktob"
      ? {
          title: "تغیر/حذف",
          dataIndex: "operation",
          key: "opeation",
          width: "30%",
          render: (_, record) => (
            <div className="d-flex">
              <Divider type="vertical" />
              <a href={`/maktob/${record._id}`}>
                {" "}
                <BsPencilSquare />{" "}
              </a>

              <Divider type="vertical" />
              <a
                onClick={() => openDeleteConfirmation(record.MaktobNo)}
                className="link  p-0"
                activeclassName="active"
              >
                <BsTrashFill id="deleteIcon" outline />
              </a>
            </div>
          ),
        }
      : {
          title: "ضمیمه",
          dataIndex: "operation",
          key: "opeation",
          width: "30%",
          render: (_, record) => (
            <div className="d-flex">
              <Divider type="vertical" />
              <a href={`/maktob/${record._id}`}>
                {" "}
                <BsPencilSquare />{" "}
              </a>

              <Divider type="vertical" />
              <a
                onClick={() => openDeleteConfirmation(record.MaktobNo)}
                className="link  p-0"
                activeclassName="active"
              >
                <BsTrashFill id="deleteIcon" outline />
              </a>
            </div>
          ),
        },
  ];

  const gettingNewMakbtobs = () => {
    axios
      .post("/api/maktob/maktobs", {
        data: {
          userId: userData.userId,
          presidencyName: userData.presidencyName,
          userStatus: "owner",
          newMaktob: true,
        },
      })
      .then((res) => {
        console.log("response is1111111111111111: ", res.data);
        setNewMaktobsListItems(res.data.Maktobs_List_data);
        setListFinalItems(res.data.Maktobs_List_data);
      })
      .catch((err) => {
        console.log("Axios Request Error After Calling API", err.response);
      });
  };
  const gettingSentMakbtobs = () => {
    axios
      .post("/api/maktob/maktobs", {
        data: {
          userId: userData.userId,
          presidencyName: userData.presidencyName,
          userStatus: "owner",
          maktobSent: true,
        },
      })
      .then((res) => {
        console.log("response is1111111111111111: ", res.data);
        setSentMaktobsListItems(res.data.Maktobs_List_data);
      })
      .catch((err) => {
        console.log("Axios Request Error After Calling API", err.response);
      });
  };

  const gettingRecievedMakbtobs = () => {
    axios
      .post("/api/maktob/received-maktobs", {
        data: {
          allReceivers: userData.presidencyName,
        },
      })
      .then((res) => {
        console.log("response iswerwerwerwerwe: ", res.data);
        setRecievedMaktobsListItems(res.data.Maktobs_List_data);
      })
      .catch((err) => {
        console.log("Axios Request Error After Calling API", err.response);
      });
  };
  // Integration
  useEffect(() => {
    gettingNewMakbtobs();
    gettingSentMakbtobs();
    gettingRecievedMakbtobs();
  }, []);

  // Deleting the maktob
  const handleDelete = () => {
    setDeletemaktob(false);
    setBackgroundVisibility(false);
    console.log("recievedMakobListItems", recievedMakobListItems);
    axios
      .delete("/api/maktob/delete", {
        data: {
          maktobId: itemId,
          // senderPresidency: recievedMakobListItems[0]?.PresidencyName || "",
          activeList,
          // presidencyName: userData.presidencyName,
        },
      })
      .then((res) => {
        console.log("response is: ", res.data);
        message.success({
          content: "مکتوب په بریالیتوب سره پاک شو/ مکتوب موفقانه حذف گردید",
          className: "success_custom_message",
        });
        gettingNewMakbtobs();
        // gettingSentMakbtobs();
        // gettingRecievedMakbtobs();
      })
      .catch((err) => {
        console.log("Axios Request Error After Calling API", err.response);
        message.error({
          content:
            "استول شوی مکتوب نه کیږي/ شما قابلیت حذف مکتبوب ارسال شده را ندارید!",
          className: "success_custom_message",
        });
      });
  };

  const handleDeleteCancelation = () => {
    console.log("Cancelled");
    setDeletemaktob(false);
    setBackgroundVisibility(false);
  };

  const openDeleteConfirmation = (recordNo) => {
    setItemId(recordNo);
    setBackgroundVisibility(true);
    setDeletemaktob(true);
  };

  const listItemsArray = Object.values(listFinalItems);
  const sortedListItemsArray = listItemsArray.sort(
    (a, b) => parseInt(b.MaktobNo) - parseInt(a.MaktobNo)
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
        <h1>د مکتوبونو لست</h1>
        <br />

        <button
          type="button"
          className={
            activeList == "newMaktob"
              ? "btn btn-primary  px-5 "
              : "btn btn-light  px-5"
          }
          onClick={() => {
            setActiveList("newMaktob");
            setListFinalItems(newMakobListItems);
            setIsmaktobSent("No");
          }}
        >
          نوی مکتوبونه/ مکتبو جدید
        </button>
        <button
          type="button"
          className={
            activeList == "sentMaktobs"
              ? "btn btn-primary  px-5"
              : "btn btn-light  px-5"
          }
          onClick={() => {
            setActiveList("sentMaktobs");
            setListFinalItems(sentMakobListItems);
            setIsmaktobSent("Yes");
          }}
        >
          صادره <span class="badge badge-light">0</span>
          {/* <span className="badge badge-light">0</span> */}
        </button>
        <button
          type="button"
          className={
            activeList == "recievedMaktobs"
              ? "btn btn-primary  px-5 "
              : "btn btn-light  px-5"
          }
          onClick={() => {
            setActiveList("recievedMaktobs");
            setListFinalItems(recievedMakobListItems);
            setIsmaktobSent("ItsReceivedMaktob");
          }}
        >
          وارده <span className="badge badge-light">4</span>
        </button>

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

      {deleteMaktob && (
        <div className="confirmation-modal">
          <p className="">
            آیا تاسې غواړۍ مکتوب پاک کړئ / آیا شما میخواهید مکتوب را حذف کنید؟
          </p>
          <div className="button-container">
            <button
              className="cancel-button bg-primary"
              onClick={handleDeleteCancelation}
            >
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
