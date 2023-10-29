import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import {
  FormDivider,
  SimpleSubmitButton,
  TextInput,
  DropZone,
} from "../../../../common/Form";
import { TwoColumn } from "../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { FieldWrapper } from "../../../../common/Form";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { UseGetMenu } from "../../../../../core/services/api/get-menu.api";
import { UseAddMenu } from "../../../../../core/services/api/add-menu.api";
import { AddMenuValidate } from "../../../../../core/validations/add-menu.validations";
interface AddMenuProps {}
interface Iparents {
  value: number;
  label: string;
}

const AddMenu: React.FC<AddMenuProps> = () => {
  const dedupeArray = (arr: any) => {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
  };

  const history = useHistory();
  const [initialValues, setInitialValues] = useState({
    Title: "",
    IsActive: { value: 0, label: "انتخاب کنید" },
    Id: { value: 0, label: "انتخاب کنید" },
  });
  const onSubmit = (values: any) => {
    PostMutate({
      ...values,
      Id: values.Id.value,
      IconPath: values.IconPath ? values.IconPath[0] : null,
      IsActive: values.IsActive.value === 1 ? true : false,
      IsRoot: false,
    });
  };

  const {
    data: PostData,
    isError: PostisError,
    isLoading: PostIsLoading,
    isSuccess: PostIsSuccess,
    mutate: PostMutate,
  } = UseAddMenu();

  const {
    data: getData,
    refetch: getRefetch,
    isError: getisError,
    isLoading: getIsLoading,
    isSuccess: getIsSuccess,
  } = UseGetMenu();

  const [parents, setParents] = useState<Iparents[]>([]);
  function getUniqueListBy(arr: any, key: any) {
    return [...new Map(arr.map((item: any) => [item[key], item])).values()];
  }

  function addParents(menu: any) {
    if (!menu.menuItem) {
      // stop calling itself

      setParents((prev) => [...prev, { value: menu.id, label: menu.title }]);

      if (menu.menuComponentResponses) {
        menu.menuComponentResponses.forEach((menu2: any) => {
          addParents(menu2);
        });
      }
    } else {
      return;
    }
  }

  useEffect(() => {
    getData?.data.result
      .filter((menu: any) => {
        return !menu.menuItem;
      })
      .forEach((menu: any) => {
        addParents(menu);
      });
  }, [getIsSuccess]);

  return getIsLoading || PostIsLoading ? (
    <FallBackSpinner />
  ) : (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={AddMenuValidate}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({
          values,
          setFieldValue,
          setFieldError,
          setErrors,
          errors,
          touched,
        }) => {
          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => {}}>
              <Form noValidate>
                <Alert color="info">
                  شما میتوانید از طریق این بخش منو جدید اضافه کنید
                </Alert>
                <FormDivider textHeader="افزودن منو">
                  <TwoColumn>
                    <div>
                      <BasicSelectOption
                        lableText="نوع منو"
                        significant={true}
                        selectedDefault={{
                          value: 1,
                          label: "افزودن منو",
                        }}
                        name="MenuType"
                        data={[
                          {
                            label: "انتخاب کنید",
                            options: [
                              {
                                value: 1,
                                label: "افزودن منو",
                              },
                              {
                                value: 2,
                                label: "افزودن آیتم منو(لینک)",
                              },
                              {
                                value: 3,
                                label: "افزودن آیتم منو(ماژول داخلی)",
                              },
                              {
                                value: 4,
                                label: "افزودن آیتم منو(دانلود فایل)",
                              },
                              {
                                value: 5,
                                label: "افزودن آیتم منو(اشتراک مطلب)",
                              },
                            ],
                          },
                        ]}
                        onChange={(e) => {
                          setFieldValue("MenuType", e);
                          history.push(
                            e.value === 1
                              ? "/MenuManagement/AddMenu"
                              : e.value === 2
                              ? "/MenuManagement/AddMenuItem/LinkMenu"
                              : e.value === 3
                              ? "/MenuManagement/AddMenuItem/ModuleMenu"
                              : e.value === 4
                              ? "/MenuManagement/AddMenuItem/DownloadMenu"
                              : "/MenuManagement/AddMenuItem/ContentMenu"
                          );
                        }}
                      />
                    </div>
                    <div>
                      <TextInput
                        lableText="تیتر منو"
                        name="Title"
                        placeholder="تیتر منو"
                        significant
                      />
                    </div>
                  </TwoColumn>
                  <TwoColumn>
                    <div>
                      <BasicSelectOption
                        lableText="وضعیت منو"
                        significant={true}
                        selectedDefault={{ value: 1, label: "فعال" }}
                        name="IsActive"
                        data={[
                          {
                            label: "انتخاب کنید",
                            options: [
                              { value: 1, label: "فعال" },
                              { value: 2, label: "غیر فعال" },
                            ],
                          },
                        ]}
                      />
                    </div>
                    <div>
                      <BasicSelectOption
                        lableText="منو مربوطه"
                        significant={true}
                        selectedDefault={{ value: 0, label: "انتخاب کنید" }}
                        name="Id"
                        data={[
                          {
                            label: "انتخاب کنید",
                            options: getUniqueListBy([...parents], "value"),
                          },
                        ]}
                      />
                    </div>
                  </TwoColumn>
                  <DropZone
                    lableText="آیکن منو"
                    name="IconPath"
                    significant
                    placeholder="آیکن منو"
                    isSingle={true}
                    accept="image/jpeg, image/png, image/jpg"
                  />
                </FormDivider>
                <SimpleSubmitButton
                  isLoading={false}
                  type="submit"
                  className="mb-1"
                  outLine
                  btnText="افزودن منو"
                />
              </Form>
            </FieldWrapper>
          );
        }}
      </Formik>
    </>
  );
};

export { AddMenu };
