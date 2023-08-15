const Yup = require("yup");

// Maktob validation
export const maktobValidationSchema = Yup.object().shape({
  maktobNo: Yup.number().required(
    "د مکتوب ګڼه اړینه ده / شماره مکتوب ضروری است"
  ),

  maktobDate: Yup.string().required(
    "د مکتوب نیټه اړینه ده/ تاریخ مکتوب ضروری است"
  ),
  // maktobType: Yup.string().required("د مکتوب ډول اړین دی/ نوع مکتوب ضروری است"),
  recipent: Yup.string().required("مخاطب اړین دی/ مخاطب ضروری است"),
  subject: Yup.string().required("موضوع اړینه ده/ موضوع ضروری است "),
  context: Yup.string().required("د مکتوب متن اړینه ده/ متن مکتوب ضروری است "),
});

// Pishnihaad validation
export const pishnihaadValidationSchema = Yup.object().shape({
  pishnihadNo: Yup.number().required(
    "د پیشنهاد ګڼه اړینه ده / شماره پیشنهاد ضروری است"
  ),

  pishnihadDate: Yup.string().required(
    "د پیشنهاد نیټه اړینه ده/ تاریخ پیشنهاد ضروری است"
  ),
  recipent: Yup.string().required("مخاطب اړین دی/ مخاطب ضروری است"),
  subject: Yup.string().required("موضوع اړینه ده/ موضوع ضروری است "),
  context: Yup.string().required(
    "د پیشنهاد متن اړینه ده/ متن پیشنهاد ضروری است "
  ),
});

// Istehlaam validation
export const IstehlaamValidationSchema = Yup.object().shape({
  istehlaamNo: Yup.number().required(
    "د استعلام ګڼه اړینه ده / شماره استعلام ضروری است"
  ),

  istehlaamDate: Yup.string().required(
    "د استعلام نیټه اړینه ده/ تاریخ استعلام ضروری است"
  ),
  recipent: Yup.string().required("مخاطب اړین دی/ مخاطب ضروری است"),
  subject: Yup.string().required("موضوع اړینه ده/ موضوع ضروری است "),
  context: Yup.string().required(
    "د استعلام متن اړینه ده/ متن استعلام ضروری است "
  ),
});

// Login validation
export const LoginValidationSchema = Yup.object().shape({
  userId: Yup.string()
    .email("ستاسو ایمیل سم ندی/ لطفا ایمیل آدرس درست را وارد نماید")
    .required("ایمیل آدرس اړین دی/ ایمیل آدرس ضروری است"),
  password: Yup.string().required("پسورډ اړین دی/ پسور د ضروری است"),
  userType: Yup.string().required("د یوزر ډول اړین دی/نوع یوزر د ضروری است"),
});

export const recipentPresidenciesSchema = Yup.object().shape({
  receipentresidencies: Yup.string().required("مخاطب اړین دی/ مخاطب ضروری است"),
});

export const malahizaShodValidationSchema = Yup.object().shape({
  molihizaTitle: Yup.string().required(
    "د ملاحظه عنوان اړین دی/ عنوان ملاحظه ضروری است"
  ),
  molahizaContext: Yup.string().required(
    "د ملاحظه متن اړین دی/ متن ملاحظه ضروری است"
  ),
  molahizaDate: Yup.string().required(
    "د مکتوب نیټه اړینه ده/ تاریخ مکتوب ضروری است"
  ),
  directorate: Yup.string().required(
    "د مکتوب نیټه اړینه ده/ تاریخ مکتوب ضروری است"
  ),
});

export const addingPresidencyValidationSchema = Yup.object().shape({
  higherAuthority: Yup.string().required(
    "د لوړپوری مقام اړین دی/ مقام بلندپایه ضروری است"
  ),
  higherAuthorityPashto: Yup.string().required(
    "لوړپوری مقام اړین دی/ مقام بلندپایه ضروری است"
  ),
  presidencyName: Yup.string().required(
    "د ریاست نوم اړین دی/ نام ریاست ضروری است"
  ),
  presidencyNamePashto: Yup.string().required(
    "د ریاست نوم اړین دی/ نام ریاست ضروری است"
  ),
  positionTitle: Yup.string().required(
    "د رئیس نوم + ریاست اړین دی/ نام رئیس + ریاست ضروری است"
  ),
  positionTitlePashto: Yup.string().required(
    "ریاست + د رئیس نوم اړین دی/ نام ریاست + نام رئیس ضروری است"
  ),
  presidentName: Yup.string().required(
    "د رئیس نوم اړین دی/ نام رئیس ضروری است"
  ),
  phoneNo: Yup.string().required(
    "د اړیکې شمیره اړینه ده/ شماره تماس ضروری است"
  ),

  email: Yup.string()
    .email()
    .required("د ریاست برښنالیک اړین دی/ ایمیل آدرس ضروری است"),

  presidencyId: Yup.string().required(
    "د ریاست آیډی اړینه ده/ آیدی ریاست ضروری است"
  ),
  password: Yup.string().required("پسورد اړین دی/ پسورد ضروری است"),
  userType: Yup.string().required("د یوزر ډول اړین دی/نوع یوزر د ضروری است"),
});

export const addingAmiryatValidationSchema = Yup.object().shape({
  director: Yup.string().required("د آمر نوم اړین د/ نام آمر ضروری است"),

  directorate: Yup.string().required("د آمریت نوم اړین د/ نام آمریت ضروری است"),

  directoratePashto: Yup.string().required(
    "د آمریت نوم اړین ده/ نام آمریت ضروری است"
  ),
  directorateId: Yup.string().required(
    "د آمریت آیډی اړینه ده/ آیدی آمریت ضروری است"
  ),

  presidencyId: Yup.string().required(
    "د ریاست آیډی اړینه ده/ آیدی ریاست ضروری است"
  ),
  password: Yup.string().required("پسورد اړین دی/ پسورد ضروری است"),
  userType: Yup.string().required("د یوزر ډول اړین دی/نوع یوزر د ضروری است"),
});
