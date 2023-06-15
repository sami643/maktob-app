export const maktobValidationSchema = Yup.object().shape({
  name1: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="teacher.NameErr" />),

  fatherName: Yup.string()
    .required(<IntlMessages id="teacher.FatherNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  gender: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.genderErr" />),

  grandFatherName: Yup.string()
    .required(<IntlMessages id="teacher.GrandFatherNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  tazkiraNo: Yup.string().required(<IntlMessages id="teacher.TazkiraNoErr" />),
  phoneNo: Yup.string().required(<IntlMessages id="teacher.PhoneNoErr" />),
  DoB: Yup.date().required(<IntlMessages id="forms.StdDoBErr" />),

  levelOfEducation: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.LevelOfEducationErr" />),

  major: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.LevelOfEducationErr" />),

  tazkiraType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdTazkiraTypeErr" />),

  email: Yup.string()
    .email(<IntlMessages id="teacher.EmailRequiredErr" />)
    .required(<IntlMessages id="teacher.EmailErr" />),
});
