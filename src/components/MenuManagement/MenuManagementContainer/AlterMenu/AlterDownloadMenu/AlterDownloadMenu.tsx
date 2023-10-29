import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";
import { Formik, Form } from "formik";
import {
  FormDivider,
  SimpleSubmitButton,
  TextInput,
  DropZone,
} from "../../../../common/Form";
import { TwoColumn } from "../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styles from "./AlterDownloadMenu.module.scss";
import { FieldWrapper } from "../../../../common/Form";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { correctUploadPath } from "../../../../../core/utils/image-path-correction";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import TreeColumn from "../../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";
import { DeleteMenuModal } from "../DeleteMenuModal/DeleteMenuModal";
import { UseGetMenu } from "../../../../../core/services/api/get-menu.api";
import { UseDeleteMenu } from "../../../../../core/services/api/delete-menu.api";
import { UseEditMenu } from "../../../../../core/services/api/edit-menu.api";
import { UseEditMenuItem } from "../../../../../core/services/api/edit-menu-item.api";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { EditDownloadMenuValidate } from "../../../../../core/validations/edit-menu.validations";
import { UseGetMenuById } from "../../../../../core/services/api/get-menu-by-id.api";

export interface AlterDownloadMenuProps {}

const AlterDownloadMenu: React.FC<AlterDownloadMenuProps> = () => {
  const history = useHistory();
  const [parents, setParents] = useState<Iparents[]>([]);
  const [currentParent, setCurrentParent] = useState(0);
  const [initialValues, setInitialValues] = useState({
    Title: "",
    IsActive: { value: 0, label: "انتخاب کنید" },
    IconPath: null,
  });

  const { id } = useParams<{ id: any }>();

  const {
    data: getData,
    isError: getIsError,
    isLoading: getIsLoading,
    isSuccess: getIsSuccess,
    refetch,
  } = UseGetMenu();
  const {
    data: getMenuByIdData,
    isLoading: getMenuByIdIsLoading,
    isError: getMenuByIdIsError,
    isSuccess: getMenuByIdIsSuccess,
    refetch: refetchMenuById,
  } = UseGetMenuById(id);
  const {
    data: editData,
    isError: editIsError,
    isLoading: editIsLoading,
    isSuccess: editIsSuccess,
    mutate: editMutate,
  } = UseEditMenuItem();
  const {
    data: deleteData,
    isError: deleteIsError,
    isLoading: deleteIsLoading,
    isSuccess: deleteIsSuccess,
    mutate: deleteMutate,
  } = UseDeleteMenu();

  const onSubmit = (values: any) => {
    editMutate({
      ...values,
      Id: +id,
      IconPath: values.Icon ? values.Icon[0] : null,
      File: values.File ? values.File[0] : null,
      IsActive: values.IsActive.value === 1 ? true : false,
    });
  };

  interface Iparents {
    value: number;
    label: string;
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

  function getCurrentMenu(menu: any) {
    if (!menu.menuItem) {
      // stop calling itself
      menu.id === +id &&
        setInitialValues({
          ...initialValues,
          Title: menu.title,
          IconPath: menu.IconPath,
          IsActive: menu.isActive
            ? { value: 1, label: "فعال" }
            : { value: 2, label: "غیر فعال" },
        });
      if (menu.menuComponentResponses) {
        menu.menuComponentResponses.forEach((menu2: any) => {
          getCurrentMenu(menu2);
        });
      }
    } else {
      menu.id === +id &&
        setInitialValues({
          ...initialValues,
          Title: menu.title,
          IconPath: menu.IconPath,
          IsActive: menu.isActive
            ? { value: 1, label: "فعال" }
            : { value: 2, label: "غیر فعال" },
        });
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
  useEffect(() => {
    getData?.data.result.forEach((menu: any) => {
      getCurrentMenu(menu);
    });
  }, [getIsSuccess]);

  const [deleteMenuIsOpen, setDeleteMenuIsOpen] = useState(false);

  return getIsLoading ||
    !getIsSuccess ||
    editIsLoading ||
    getMenuByIdIsLoading ? (
    <FallBackSpinner />
  ) : !getMenuByIdData?.data.result &&
    (getMenuByIdIsSuccess || getMenuByIdIsError) ? (
    <div style={{ textAlign: "center" }}>
      <p>اطلاعات مورد نظر شما یافت نشد</p>
      <Redirect to="/MenuManagement/MenuSample" />
      <Link to="/MenuManagement/MenuSample">
        <div className={Styles.buttonDiv}>
          <SimpleSubmitButton
            isLoading={false}
            type="submit"
            className="mb-1"
            outLine
            btnText="بازگشت به خانه"
          />
        </div>
      </Link>
    </div>
  ) : (
    <>
      <DeleteMenuModal
        id={id}
        isOpen={deleteMenuIsOpen}
        modalToggled={() => {
          setDeleteMenuIsOpen(!deleteMenuIsOpen);
        }}
        mutate={() => {
          deleteMutate({ Id: id });
        }}
        loading={deleteIsLoading}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={EditDownloadMenuValidate}
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
                  شما میتوانید از طریق این بخش منو مورد نظر را ویرایش کنید
                </Alert>
                <FormDivider textHeader="افزودن منو">
                  <TwoColumn>
                    <div>
                      <TextInput
                        lableText="تیتر منو"
                        name="Title"
                        placeholder="تیتر منو"
                        significant
                      />
                    </div>
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
                  </TwoColumn>

                  <div className={Styles.logoBox}>
                    <img
                      src={`${process.env.REACT_APP_UPLOAD_SERVER_PATH}/${
                        values.IconPath
                          ? correctUploadPath(values.IconPath)
                          : "https://logo.com"
                      }`}
                      alt="current-logo"
                    />
                    <p>عکس فعلی منو</p>
                  </div>

                  <TwoColumn>
                    <div>
                      <DropZone
                        lableText="آیکن منو"
                        name="Icon"
                        significant
                        placeholder="آیکن منو"
                        isSingle={true}
                        accept="image/jpeg, image/png, image/jpg"
                      />
                    </div>
                    <div>
                      <DropZone
                        lableText="فایل منو"
                        name="File"
                        significant
                        placeholder="فایل منو"
                        isSingle={true}
                        accept="image/jpeg, image/png, image/jpg"
                      />
                    </div>
                  </TwoColumn>
                </FormDivider>
                <TwoColumn>
                  <div className={Styles.firstCol}>
                    <SimpleSubmitButton
                      isLoading={false}
                      type="submit"
                      className="mb-1"
                      outLine
                      btnText="ویرایش منو"
                    />
                  </div>
                  <div className={Styles.secondCol}>
                    <SimpleSubmitButton
                      isLoading={false}
                      onCLick={() => {
                        setDeleteMenuIsOpen(true);
                      }}
                      type="button"
                      className="mb-1"
                      outLine
                      btnText="حذف منو"
                    />
                  </div>
                </TwoColumn>
              </Form>
            </FieldWrapper>
          );
        }}
      </Formik>
    </>
  );
};

export { AlterDownloadMenu };
