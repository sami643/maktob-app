const Yup = require("yup");

// Maktob validation
export const maktobValidationSchema = Yup.object().shape({
  maktobNo: Yup.number().required(
    "د مکتوب ګڼه اړینه ده / شماره مکتوب ضروری است"
  ),

  maktobDate: Yup.string().required(
    "د مکتوب نیټه اړینه ده/ تاریخ مکتوب ضروری است"
  ),
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
