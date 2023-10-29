import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";
import { Formik, Form } from "formik";
import {
  FormDivider,
  SimpleSubmitButton,
  TextInput,
  TextArea,
} from "../../../common/Form";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./AlterProvince.module.scss";
import { FieldWrapper } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { showToast } from "../../../../core/utils";
import { correctUploadPath } from "../../../../core/utils/image-path-correction";
import { useParams } from "react-router";
import { Link, Redirect } from "react-router-dom";
import { UseGetServices } from "../../../../core/services/api/get-services.api";
import { UseEditService } from "../../../../core/services/api/edit-service.api";
import { UseDeleteService } from "../../../../core/services/api/delete-service.api";
import { EditServiceValidate } from "../../../../core/validations/edit-service.validations";
import { UseGetMap } from "../../../../core/services/api/get-map.api";
import { history } from "../../../../history";
import { UseSetMapItem } from "../../../../core/services/api/set-map-item.api";

export interface AlterProvinceProps {}

const AlterProvince: React.FC<AlterProvinceProps> = () => {
  const {
    data: getData,
    isLoading: getIsLoading,
    isError: getIsError,
  } = UseGetMap();
  const {
    data: setData,
    isLoading: setIsLoading,
    isError: setIsError,
    mutate: setMutate,
  } = UseSetMapItem();
  const [initialValues, setInitialValues] = useState({
    Title: "",
    Description: "",
    WebsiteAddress: "",
  });

  const { id } = useParams<{ id: any }>();

  useEffect(() => {
    getData &&
      getData.data &&
      setInitialValues({
        Title: getData?.data.result.filter(
          (item: any) => item.province.province === +id
        )[0].province.description,
        Description: getData?.data.result.filter(
          (item: any) => item.province.province === +id
        )[0].description,
        WebsiteAddress: getData?.data.result.filter(
          (item: any) => item.province.province === +id
        )[0].websiteAddress,
      });
    if (
      !getData?.data.result
        .map((province: any) => province.province.province)
        .includes(+id)
    ) {
      getData &&
        getData.data &&
        showToast(["استان مورد نظر یافت نشد"], "error");
      getData &&
        getData.data &&
        history.push("/ProvinceListing/ActiveProvinces");
    }
  }, [getData]);

  const onSubmit = (values: any) => {
    setMutate({ ...values, Id: id });
  };

  return getIsLoading || setIsLoading ? (
    <FallBackSpinner />
  ) : (
    <>
      <Formik
        initialValues={initialValues}
        //   validationSchema={EditServiceValidate}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, setFieldError, setErrors, errors }) => {
          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
              <Form noValidate>
                <Alert color="info">
                  شما میتوانید از طریق این بخش استان مورد نظر را را مشاهده و
                  مدیریت کنید
                </Alert>
                <FormDivider textHeader="مشاهده و مدیریت استان">
                  <h1 className={Styles.provinceTitle}>{values.Title}</h1>
                  <TwoColumn>
                    <div className={Styles.col}>
                      <TextInput
                        lableText="لینک استان"
                        name="WebsiteAddress"
                        significant
                        placeholder="لینک استان"
                      />
                    </div>
                    <div className={Styles.col}>
                      <TextArea
                        lableText="توضیحات استان"
                        name="Description"
                        placeholder="توضیحات استان"
                        significant
                      />
                    </div>
                  </TwoColumn>
                </FormDivider>
                <div className={Styles.buttonHolder}>
                  <SimpleSubmitButton
                    isLoading={false}
                    type="submit"
                    className="mb-1"
                    outLine
                    btnText="ویرایش"
                  />
                </div>
              </Form>
            </FieldWrapper>
          );
        }}
      </Formik>
    </>
  );
};

export { AlterProvince };
