import { Label } from "reactstrap";
import {
  FaBars,
  FaUserAlt,
  FaSignOutAlt,
  FaBookOpen,
  FaThList,
  FaDashcube,
} from "react-icons/fa";
// import { AiFillDashboard } from "react-icons/fa/AiFillDashboard";
import { AiFillDashboard, AiFillFile } from "react-icons/ai";
import hrSign from "../img/hr.jpg";
import planSign from "../img/plan.jpg";

export const presidenciesForSelectOptions = [
  {
    optgroup: "مقام اداره",
    options: [
      {
        value: "مشاوریت محترم تخنیکی",
        valuePashto: "تخنیکی محترم مشاوریت",
        label: "مشاوریت محترم تخنیکی",
      },
      {
        value: "مشاوریت محترم حقوقی",
        valuePashto: "حقوقی محترم مشاوریت",
        label: "مشاوریت محترم حقوقی",
      },
      {
        value: "ریاست محترم پلان و هماهنگی ستراتیژیک",
        valuePashto: "د پلان او ستراتیژیکو همغږیو محترم ریاست",
        label: "ریاست محترم پلان و هماهنگی ستراتیژیک",
      },
      {
        value: "ریاست محترم دفتر مقام",
        valuePashto: "ریاست محترم دفتر مقام",
        label: "ریاست محترم دفتر مقام",
      },
      {
        value: "ریاست محترم تفتیش داخلی",
        label: "ریاست محترم تفتیش داخلی",
      },
      {
        value: "آمریت سیستم های تکنالوژی معلوماتی و احصائیه",
        valuePashto: "آمریت سیستم های تکنالوژی معلوماتی و احصائیه",
        label: "آمریت سیستم های تکنالوژی معلوماتی و احصائیه",
      },
    ],
  },
  {
    optgroup: "معاونیت محترم امور مالی و اداری",
    options: [
      {
        value: "معاونیت محترم امور مالی و اداری",
        valuePashto: "معاونیت محترم امور مالی و اداری",
        label: "معاونیت محترم امور مالی و اداری",
      },
      {
        value: "ریاست محترم مالی و حسابی",
        valuePashto: "ریاست محترم مالی و حسابی",
        label: "ریاست محترم مالی و حسابی",
      },
      {
        value: "ریاست محترم خدمات و املاک",
        valuePashto: "ریاست محترم خدمات و املاک",
        label: "ریاست محترم خدمات و املاک",
      },
      {
        value: "ریاست محترم منابع بشری",
        valuePashto: "ریاست محترم منابع بشری",
        label: "ریاست محترم منابع بشری",
      },
      {
        value: "ریاست محترم دعوت و ارشاد",
        valuePashto: "ریاست محترم دعوت و ارشاد",
        label: "ریاست محترم دعوت و ارشاد",
      },
      {
        value: "آمریت محترم تدارکات",
        valuePashto: "آمریت محترم تدارکات",
        label: "آمریت محترم تدارکات",
      },

      {
        value: "آمریت محترم ولایات",
        valuePashto: "آمریت محترم ولایات",
        label: "آمریت محترم ولایات",
      },
    ],
  },

  {
    optgroup: "معاونیت محترم امور تخنیکی و مسلکی",
    options: [
      {
        value: "معاونیت محترم امور تخنیکی و مسلکی",
        valuePashto: "معاونیت محترم امور تخنیکی و مسلکی",
        label: "معاونیت محترم امور تخنیکی و مسلکی",
      },

      {
        value: "ریاست محترم امور تعلیمی و تحصیلی",
        valuePashto: "ریاست محترم امور تعلیمی و تحصیلی",
        label: "ریاست محترم امور تعلیمی و تحصیلی",
      },
      {
        value: "ریاست محترم امور متعلمین و محصلین",
        valuePashto: "ریاست محترم امور متعلمین و محصلین",
        label: "ریاست محترم امور متعلمین و محصلین",
      },
      {
        value: "ریاست محترم نصاب و تربیه معلم",
        valuePashto: "ریاست محترم نصاب و تربیه معلم",
        label: "ریاست محترم نصاب و تربیه معلم",
      },
      {
        value: "ریاست محترم ارزیابی نظارت تعلیمی و تحصیلی",
        valuePashto: "ریاست محترم ارزیابی نظارت تعلیمی و تحصیلی",
        label: "ریاست محترم ارزیابی نظارت تعلیمی و تحصیلی",
      },

      {
        value: "ریاست محترم تنظیم برنامه های حرفوی",
        value: "ریاست محترم تنظیم برنامه های حرفوی",
        label: "ریاست محترم تنظیم برنامه های حرفوی",
      },
      {
        value: "ریاست محترم تحقیق و تضمین کیفیت",
        valuePashto: "ریاست محترم تحقیق و تضمین کیفیت",
        label: "ریاست محترم تحقیق و تضمین کیفیت",
      },
      {
        value: "ریاست محترم ترنم و فرهنگ",
        valuePashto: "ریاست محترم ترنم و فرهنگ",
        label: "ریاست محترم ترنم و فرهنگ",
      },
    ],
  },
];

export const presidencies = [
  {
    value: 1,
    label: "معاونیت محترم امور مالی و اداری",
    higherAutority: "maali",
    type: "P",
  },
  {
    value: 2,
    label: "ریاست محترم مالی و حسابی",
    higherAutority: "maali",
    type: "P",
  },
  {
    value: 3,
    label: "ریاست محترم خدمات و املاک",
    higherAutority: "maali",
    type: "P",
  },
  {
    value: 4,
    label: "ریاست محترم منابع بشری",
    higherAutority: "maali",
    type: "P",
  },
  {
    value: 6,
    label: "ریاست محترم دعوت و ارشاد",
    higherAutority: "maali",
    type: "P",
  },
  {
    value: 7,
    label: "آمریت محترم تدارکات",
    higherAutority: "maali",
    type: "P",
  },

  {
    value: 8,
    label: "آمریت محترم ولایات",
    higherAutority: "maali",
    type: "P",
  },
  {
    value: 9,
    label: "معاونیت محترم امور تخنیکی و مسلکی",
    higherAutority: "Technical",
    type: "P",
  },
  {
    value: 10,
    label: "ریاست محترم امور تعلیمی و تحصیلی",
    higherAutority: "Technical",
    type: "P",
  },

  {
    value: 11,
    label: "ریاست محترم امور متعلمین و محصلین",
    higherAutority: "Technical",
    type: "P",
  },
  {
    value: 12,
    label: "ریاست محترم نصاب و تربیه معلم",
    higherAutority: "Technical",
    type: "P",
  },
  {
    value: 13,
    label: "ریاست محترم ارزیابی نظارت تعلیمی و تحصیلی",
    higherAutority: "Technical",
    type: "P",
  },

  {
    value: 14,
    label: "ریاست محترم تنظیم برنامه های حرفوی",
    higherAutority: "Technical",
    type: "P",
  },
  {
    value: 15,
    label: "ریاست محترم ترنم و فرهنگ",
    higherAutority: "Technical",
    type: "P",
  },
  {
    value: 16,
    label: "ریاست محترم تحقیق و تضمین کیفیت",
    higherAutority: "Technical",
    type: "P",
  },

  {
    value: 17,
    label: "مشاوریت محترم تخنیکی",
    higherAutority: "Admin",
    type: "P",
  },
  {
    value: 18,
    label: "مشاوریت محترم حقوقی",
    higherAutority: "Admin",
    type: "P",
  },
  {
    value: 19,
    label: "ریاست محترم ّپلان و هماهنگی ستراتیژیک",
    higherAutority: "Admin",
    type: "P",
  },
  {
    value: 20,
    label: "ریاست محترم دفتر مقام",
    higherAutority: "Admin",
    type: "P",
  },
  {
    value: 21,
    label: "ریاست محترم تفتیش داخلی",
    higherAutority: "Admin",
    type: "P",
  },
  {
    value: 22,
    label: "آمریت سیستم های تکنالوژی معلوماتی و احصائیه",
    higherAutority: "Admin",
    type: "P",
  },
];

export const presidenciesSendingDocumentSelectionOption = [
  {
    value: "F&AD",
    label: "معاونیت محترم امور مالی و اداری",
  },
  {
    value: "F&AP",
    label: "ریاست محترم مالی و حسابی",
  },
  {
    value: "A&KHP",
    label: "ریاست محترم خدمات و املاک",
  },
  {
    value: "HRP",
    label: "ریاست محترم منابع بشری",
  },
  {
    value: "D&IP",
    label: "ریاست محترم دعوت و ارشاد",
  },
  {
    value: "TD",
    label: "آمریت محترم تدارکات",
  },

  {
    value: "PD",
    label: "آمریت محترم ولایات",
  },
  {
    value: "T&PD",
    label: "معاونیت محترم امور تخنیکی و مسلکی",
  },
  {
    value: "T&TP",
    label: "ریاست محترم امور تعلیمی و تحصیلی",
  },

  {
    value: "M&MP",
    label: "ریاست محترم امور متعلمین و محصلین",
  },
  {
    value: "N&TMP",
    label: "ریاست محترم نصاب و تربیه معلم",
  },
  {
    value: "AT&TP",
    label: "ریاست محترم ارزیابی نظارت تعلیمی و تحصیلی",
  },

  {
    value: "BHP",
    label: "ریاست محترم تنظیم برنامه های حرفوی",
  },
  {
    value: "T&FP",
    label: "ریاست محترم ترنم و فرهنگ",
  },
  {
    value: "T&TKP",
    label: "ریاست محترم تحقیق و تضمین کیفیت",
  },

  {
    value: "TA",
    label: "مشاوریت محترم تخنیکی",
  },
  {
    value: "HA",
    label: "مشاوریت محترم حقوقی",
  },
  {
    value: "P&HSP",
    label: "ریاست محترم پلان و هماهنگی ستراتیژیک",
  },
  {
    value: "DMP",
    label: "ریاست محترم دفتر مقام",
  },
  {
    value: "TDP",
    label: "ریاست محترم تفتیش داخلی",
  },
  {
    value: "IT&MIS",
    label: "آمریت سیستم های تکنالوژی معلوماتی و احصائیه",
  },
];

export const maktobs = [
  {
    key: "1",
    maktobNo: 32,
    recipent: "ریاست دفتر",
    subject: "Avvvvv",
    constext: "makdob",
    maktobDate: "1444/3/12",
  },
  {
    key: "2",
    maktobNo: 13,
    recipent: "ریاست نصاب",
    subject: "Avvbvvv",
    constext: "makdob",
    maktobDate: "1444/3/12",
  },
  {
    key: "3",
    maktobNo: 14,
    recipent: "ریاست دفتر",
    subject: "Avvvvv",
    constext: "makdob",
    maktobDate: "1444/3/12",
  },
  {
    key: "4",
    maktobNo: 15,
    recipent: "ریاست امور تعلیمی و تحصیلی",
    subject: "Avvbvvv",
    constext: "makdob",
    maktobDate: "1444/3/12",
  },
  {
    key: "5",
    maktobNo: 16,
    recipent: "ریاست پلان",
    subject: "Avvvvv",
    constext: "makdob",
    maktobDate: "1444/3/12",
  },
  {
    key: "6",
    maktobNo: 17,
    recipent: "ریاست تفتیش",
    subject: "Avvvvv",
    constext: "makdob",
    maktobDate: "1444/3/12",
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

export const istehlaams = [
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
    path: "/",
    name: "دشبورد",
    icon: <AiFillDashboard />,
  },
  {
    path: "/maktob",
    name: "مکتوب",
    icon: <FaBookOpen />,
  },
  {
    path: "/maktoblist",
    name: "د مکتوبونو لست",
    icon: <FaThList />,
  },
  {
    path: "/pishnihad",
    name: "پیشنهاد",
    icon: <AiFillFile />,
  },
  {
    path: "/pishnihadlist",
    name: "د پیشنهادونو لست",
    icon: <FaThList />,
  },
  {
    path: "/istehlaam",
    name: "استعلام",
    icon: <FaBookOpen />,
  },
  {
    path: "/istehlaamlist",
    name: "د استعلامونو لست",
    icon: <FaThList />,
  },
  {
    path: "/profile",
    name: "پروفایل",
    icon: <FaUserAlt />,
  },
  // {
  //   path: "/logout",
  //   name: "وتل",
  //   icon: <FaSignOutAlt />,
  // },

  // {
  //   path: "/logout",
  //   name: "وتل",
  //   icon: <FaSignOutAlt />,
  // },
  // {
  //   path: "/login",
  //   name: "login",
  //   icon: <FaSignOutAlt />,
  // },
];
export const sidebarMenuAdmin = [
  {
    path: "/",
    name: "دشبورد",
    icon: <AiFillDashboard />,
  },
  {
    path: "/profile",
    name: "پروفایل",
    icon: <FaUserAlt />,
  },

  {
    path: "/add-user",
    name: "اکونت جدید",
    icon: <FaUserAlt />,
  },
  // {
  //   path: "/logout",
  //   name: "وتل",
  //   icon: <FaSignOutAlt />,
  // },

  // {
  //   path: "/logout",
  //   name: "وتل",
  //   icon: <FaSignOutAlt />,
  // },
  // {
  //   path: "/login",
  //   name: "login",
  //   icon: <FaSignOutAlt />,
  // },
];

export const maktobTypeOptions = [
  { value: "عادی", label: "عادی" },
  { value: "عاجل", label: "عاجل" },
  { value: "محرم", label: "محرم" },
];

export const prsidentsSigns = [
  { src: hrSign, name: "رفیع الله ثابت", id: "hr@tveta.gov.af" },
  { src: planSign, name: "نیک محمد نیکمل", id: "plan@tveta.gov.af" },
];

export const higherAuthorityOptions = [
  { value: "مقام محترم اداره", label: "مقام محترم اداره" },
  { value: "معاونیت امور مالی و اداری", label: "معاونیت امور مالی و اداری" },
  {
    value: "معاونیت امور تخنیکی و مسلکی",
    label: "معاونیت امور تخنیکی و مسلکی",
  },
  { value: "ریاست عمومی", label: "ریاست عمومی" },
  { value: "ریاست عمومی", label: "ریاست عمومی" },
];
export const higherAuthorityOptionsPashto = [
  { value: "د ادارې محترم مقام", label: "د ادارې محترم مقام" },
  {
    value: "د مالي او اداري چارو معینیت",
    label: "د مالي او اداري چارو معینیت",
  },
  {
    value: "د تخنیکي او مسلکي چارو معاونیت",
    label: "د تخنیکي او مسلکي چارو معاونیت",
  },
  { value: "ریاست عمومی", label: "ریاست عمومی" },
  { value: "ریاست عمومی", label: "ریاست عمومی" },
];

export const userTypesOptions = [
  { value: "presidency", label: " ریاست" },
  { value: "directorate", label: "آمریت" },
];
