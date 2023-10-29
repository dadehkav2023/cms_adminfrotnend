import React, { useContext, useEffect, useState } from "react";
import { Alert, CardBody } from "reactstrap";
import { Formik, Form } from "formik";
import {
  FormDivider,
  SimpleSubmitButton,
  TextInput,
  DropZone,
} from "../../../common/Form";
import { TextArea } from "../../../common/Form";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { SetSettingValidate } from "../../../../core/validations/set-setting.validations";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./SetOptions.module.scss";
import { FieldWrapper } from "../../../common/Form";
import { UseSetSetting } from "../../../../core/services/api/set-setting.api";
import { correctUploadPath } from "../../../../core/utils/image-path-correction";
import { showToast } from "../../../../core/utils";
import { UseGetSetting } from "../../../../core/services/api/get-setting.api";
import { useUserAuth } from "../../../../core/utils/context/AuthenticationContext";

export interface SetOptionsProps {}

const SetOptions: React.FC<SetOptionsProps> = () => {
  const {
    setRoleState,
    setTokenState,
    setUserInfoState,
    setUserClaimState,
    userInfo,
  } = useUserAuth();
  const {
    data: getData,
    isLoading: getIsLoading,
    isSuccess: getIsSuccess,
  } = UseGetSetting();

  const { isLoading: setIsLoading } = UseSetSetting();
  const [shouldBeLoading, setShouldBeLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    aboutUsSummary: "",
    tell: "",
    googleMapLink: "",
    fax: "",
    postalCode: "",
    address: "",
    latitudeAndLongitude: "",
    telegramAddress: "",
    whatsappAddress: "",
    instagramAddress: "",
    facebookAddress: "",
    twitterAddress: "",
    file: null,
  });
  useEffect(() => {
    setInitialValues({
      name: getData?.data.result.name ? getData.data.result.name : "",
      aboutUsSummary: getData?.data.result.aboutUsSummary
        ? getData.data.result.aboutUsSummary
        : "",
      tell: getData?.data.result.tell ? getData.data.result.tell : "",
      googleMapLink: getData?.data.result.googleMapLink
        ? getData.data.result.googleMapLink
        : "",
      fax: getData?.data.result.fax ? getData.data.result.fax : "",
      postalCode: getData?.data.result.postalCode
        ? getData.data.result.postalCode
        : "",
      address: getData?.data.result.address ? getData.data.result.address : "",
      latitudeAndLongitude: getData?.data.result.latitudeAndLongitude
        ? getData.data.result.latitudeAndLongitude
        : "",
      telegramAddress: getData?.data.result.telegramAddress
        ? getData.data.result.telegramAddress
        : "",
      whatsappAddress: getData?.data.result.whatsappAddress
        ? getData.data.result.whatsappAddress
        : "",
      instagramAddress: getData?.data.result.instagramAddress
        ? getData.data.result.instagramAddress
        : "",
      facebookAddress: getData?.data.result.facebookAddress
        ? getData.data.result.facebookAddress
        : "",
      twitterAddress: getData?.data.result.twitterAddress
        ? getData.data.result.twitterAddress
        : "",
      file: null,
    });
  }, [getIsSuccess]);
  const setSetting = UseSetSetting();
  const onSubmit = async (values: any) => {
    if (values.file && values.file[0].size > 3 * 1000 * 1000) {
      showToast(["سایز عکس باید کمتر از ۳ مگابایت باشد"], "error");
    } else {
      setSetting.mutate({
        TwitterAddress: values.twitterAddress,
        InstagramAddress: values.instagramAddress,
        WhatsappAddress: values.whatsappAddress,
        LatitudeAndLongitude: values.latitudeAndLongitude,
        Name: values.name,
        HomePageNewsCount: 3,
        FacebookAddress: values.facebookAddress,
        Tell: values.tell,
        TelegramAddress: values.telegramAddress,
        Address: values.address,
        SliderImageCount: 5,
        PostalCode: values.postalCode,
        AboutUsSummary: values.aboutUsSummary,
        GoogleMapLink: values.googleMapLink,
        Fax: values.fax,
        File: values.file ? values.file : null,
      });
      setShouldBeLoading(true);
    }
  };

  return setIsLoading || getIsLoading || shouldBeLoading ? (
    <FallBackSpinner />
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={SetSettingValidate}
      enableReinitialize={true}
      onSubmit={(value) => onSubmit(value)}
    >
      {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
        return (
          <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
            <Form noValidate>
              <Alert color="info">
                شما میتوانید از طرق این پورتال تنظیمات محتوا وب سایت را مدیریت
                کنید
              </Alert>
              <div>
                <FormDivider textHeader="مشخصات سامانه">
                  <CardBody>
                    <TwoColumn>
                      <div>
                        <TextInput
                          lableText="نام سازمان"
                          name={"name"}
                          placeholder="نام سازمان"
                          significant
                        />
                        <TextArea
                          lableText="درباره سازمان"
                          name={"aboutUsSummary"}
                          placeholder="درباره سازمان"
                        />
                      </div>
                      <div>
                        <div className={Styles.logoBox}>
                          <img
                            src={`${process.env.REACT_APP_UPLOAD_SERVER_PATH}/${
                              getData?.data.result.logoImageAddress
                                ? correctUploadPath(
                                    getData.data.result.logoImageAddress
                                  )
                                : "https://logo.com"
                            }`}
                            alt="current-logo"
                          />
                          <p>لوگو فعلی سازمان</p>
                        </div>
                      </div>
                    </TwoColumn>

                    <TwoColumn>
                      <div>
                        <TextInput
                          lableText="شماره تلفن"
                          name={"tell"}
                          placeholder="شماره تلفن"
                        />
                        <TextInput
                          lableText="نشانی نقشه گوگل"
                          name={"googleMapLink"}
                          placeholder="نشانی نقشه گوگل"
                        />
                        <TextArea
                          lableText="نشانی محل سازمان"
                          name={"address"}
                          placeholder="نشانی محل سازمان"
                          significant
                        />
                        <TextInput
                          lableText="نشانی Facebook"
                          name={"facebookAddress"}
                          placeholder="نشانی Facebook"
                        />
                        <TextInput
                          lableText="نشانی WhatsApp"
                          name={"whatsappAddress"}
                          placeholder="نشانی WhatsApp"
                        />
                      </div>
                      <div>
                        <TextInput
                          lableText="فاکس"
                          name={"fax"}
                          placeholder="فاکس"
                        />
                        <TextInput
                          lableText="کد پستی سازمان"
                          name={"postalCode"}
                          placeholder="کد پستی سازمان"
                          significant
                        />
                        <TextInput
                          lableText="طول و عرض جغرافیایی سازمان"
                          name={"latitudeAndLongitude"}
                          placeholder="طول و عرض جغرافیایی سازمان"
                        />
                        <TextInput
                          lableText="نشانی Telegram"
                          name={"telegramAddress"}
                          placeholder="نشانی Telegram"
                        />
                        <TextInput
                          lableText="نشانی Instagram"
                          name={"instagramAddress"}
                          placeholder="نشانی Instagram"
                        />
                        <TextInput
                          lableText="نشانی Twitter"
                          name={"twitterAddress"}
                          placeholder="نشانی Twitter"
                        />
                      </div>
                    </TwoColumn>

                    <div>
                      <Alert color="info">تنظیم لوگو</Alert>
                      <DropZone
                        lableText=""
                        name="file"
                        placeholder="جهت تغییر لوگو فایل عکس مورد نظر را کشیده و در این مکان قرار دهید"
                        isSingle={true}
                        accept="image/jpeg, image/png, image/jpg"
                      />
                    </div>
                  </CardBody>
                </FormDivider>
                <SimpleSubmitButton
                  isLoading={false}
                  type="submit"
                  className="mb-1"
                  outLine
                  btnText="ثبت تنظیمات"
                />
              </div>
            </Form>
          </FieldWrapper>
        );
      }}
    </Formik>
  );
};

export { SetOptions };
