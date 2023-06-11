import { Label } from "reactstrap";
import {
  FaBars,
  FaUserAlt,
  FaSignOutAlt,
  FaBookOpen,
  FaThList,
} from "react-icons/fa";


export const presidencies = [
  {
    value: "A",
    label: "ریاست دفتر",
  },
  {
    value: "B",
    label: "ریاست مالی",
  },
  {
    value: "C",
    label: "ریاست تدارکات",
  },
  {
    value: "D",
    label: "ریاست منابع بشری",
  },
  {
    id: "5",
    value: "E",
    label: "ریاست تعلیمی",
  },
  {
    value: "F",
    label: "ریاست تفتیش",
  },

  {
    value: "G",
    label: "ریاست پلان",
  },
  {
    value: "H",
    label: "ریاست امور متعلمین",
  },
  {
    value: "I",
    label: "ریاست حرفه",
  },

  {
    value: "J",
    label: "1ریاست منابع بشری",
  },
  {
    value: "K",
    label: "1ریاست تعلیمی",
  },
  {
    value: "L",
    label: "1ریاست تفتیش",
  },

  {
    value: "M",
    label: "1ریاست پلان",
  },
  {
    value: "N",
    label: "2ریاست امور متعلمین",
  },
  {
    value: "O",
    label: "2ریاست حرفه",
  },
  {
    value: "P",
    label: "3ریاست پلان",
  },
  {
    value: "Q",
    label: "3ریاست امور متعلمین",
  },
  {
    value: "R",
    label: "3ریاست حرفه",
  },
];

export const maktobs = [
  {
    key: "1",
    maktobNo: 32,
    recipent: "ریاست دفتر",
    subject: "Avvvvv",
    date: "1444/3/12",
  },
  {
    key: "2",
    maktobNo: 13,
    recipent: "ریاست نصاب",
    subject: "Avvbvvv",
    date: "1444/3/12",
  },
  {
    key: "3",
    maktobNo: 14,
    recipent: "ریاست دفتر",
    subject: "Avvvvv",
    date: "1444/3/12",
  },
  {
    key: "4",
    maktobNo: 15,
    recipent: "ریاست امور تعلیمی و تحصیلی",
    subject: "Avvbvvv",
    date: "1444/3/12",
  },
  {
    key: "5",
    maktobNo: 16,
    recipent: "ریاست پلان",
    subject: "Avvvvv",
    date: "1444/3/12",
  },
  {
    key: "6",
    maktobNo: 17,
    recipent: "ریاست تفتیش",
    subject: "Avvvvv",
    date: "1444/3/12",
  },
];

export const pishnihads = [
  {
    key: "1",
    pishnihadNo: 32,
    recipent: "ریاست دفتر",
    subject: "Avvvvv",
    date: "1444/3/12",
  },
  {
    key: "2",
    pishnihadNo: 13,
    recipent: "ریاست نصاب",
    subject: "Avvbvvv",
    date: "1444/3/12",
  },
  {
    key: "3",
    pishnihadNo: 14,
    recipent: "ریاست دفتر",
    subject: "Avvvvv",
    date: "1444/3/12",
  },
  {
    key: "4",
    pishnihadNo: 15,
    recipent: "ریاست امور تعلیمی و تحصیلی",
    subject: "Avvbvvv",
    date: "1444/3/12",
  },
  {
    key: "5",
    pishnihadNo: 16,
    recipent: "ریاست پلان",
    subject: "Avvvvv",
    date: "1444/3/12",
  },
  {
    key: "6",
    pishnihadNo: 17,
    recipent: "ریاست تفتیش",
    subject: "Avvvvv",
    date: "1444/3/12",
  },
];

export const sidebarMenuItem = [
  {
    path: "/main",
    name: "مکتوب",
    icon: <FaBookOpen />,
  },
  {
    path: "/maktoblist",
    name: "د مکتوبونو ټولګه",
    icon: <FaThList />,
  },
  {
    path: "/pishnihad",
    name: "پیشنهاد",
    icon: <FaBookOpen />,
  },
  {
    path: "/pishnihadlist",
    name: "د پیشنهادونو ټولګه",
    icon: <FaThList />,
  },
  {
    path: "/profile",
    name: "پروفایل",
    icon: <FaUserAlt />,
  },
  {
    path: "/logout",
    name: "وتل",
    icon: <FaSignOutAlt />,
  },
  {
    path: "/login",
    name: "login",
    icon: <FaSignOutAlt />,
  },
  {
    path: "/maktobview",
    name: "maktobFormat",
    icon: "M_F",
  },
  {
    path: "/pishnihadview",
    name: "PishnihadFormat",
    icon: "P_F",
  },
];
