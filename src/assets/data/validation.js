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
});

export const recipentPresidenciesSchema = Yup.object().shape({
  receipentresidencies: Yup.string().required("مخاطب اړین دی/ مخاطب ضروری است"),
});
