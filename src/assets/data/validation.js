const Yup = require("yup");
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
