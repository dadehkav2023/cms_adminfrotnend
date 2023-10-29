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
import Styles from "./AddProvince.module.scss";
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
import { UseGetActiveProvinces } from "../../../../core/services/api/get-active-provinces.api";

export interface AddProvinceProps {}

const AddProvince: React.FC<AddProvinceProps> = () => {
  const {
    data: getData,
    isLoading: getIsLoading,
    isError: getIsError,
  } = UseGetActiveProvinces();
  const {
    data: setData,
    isLoading: setIsLoading,
    isError: setIsError,
    mutate: setMutate,
  } = UseSetMapItem();
  const [initialValues, setInitialValues] = useState({
    Province: "",
    Description: "",
    WebsiteAddress: "",
  });

  const onSubmit = (values: any) => {
    setMutate({ ...values, Id: values.Province.value });
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
                  <TwoColumn>
                    <div className={Styles.col}>
                      <TextInput
                        lableText="لینک استان"
                        name="WebsiteAddress"
                        significant
                        placeholder="لینک استان"
                      />
                      <TextArea
                        lableText="توضیحات استان"
                        name="Description"
                        placeholder="توضیحات استان"
                        significant
                      />
                    </div>
                    <div className={Styles.col}>
                      <BasicSelectOption
                        lableText="انتخاب استان"
                        significant={true}
                        selectedDefault={{
                          value: 0,
                          label: "انتخاب کنید",
                        }}
                        name="Province"
                        data={[
                          {
                            label: "انتخاب کنید",
                            options: getData?.data.result.map((item: any) => {
                              return {
                                value: item.province,
                                label: item.description,
                              };
                            }),
                          },
                        ]}
                      />
                    </div>
                    <TextArea
                      lableText="توضیحات استان"
                      name="Description"
                      placeholder="توضیحات استان"
                      significant
                    />
                  </TwoColumn>
                </FormDivider>
                <div className={Styles.buttonHolder}>
                  <SimpleSubmitButton
                    isLoading={false}
                    type="submit"
                    className="mb-1"
                    outLine
                    btnText="افزودن"
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

export { AddProvince };
