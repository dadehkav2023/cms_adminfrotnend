import React, { useState } from "react";
import { UseGetMenu } from "../../../../core/services/api/get-menu.api";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import SiteModal from "../SiteModal/SiteModal";
import NavbarMenu from "./Navbar/navbar";
interface MenuSampleProps {}

const MenuSample: React.FC<MenuSampleProps> = () => {
  const {
    data: getData,
    refetch: getRefetch,
    isError: getisError,
    isLoading: getIsLoading,
    isSuccess: getIsSuccess,
  } = UseGetMenu();
  const [modalData, setModalData] = useState({
    title: "",
    body: "",
    show: false,
  });
  return getIsLoading || !getIsSuccess ? (
    <FallBackSpinner />
  ) : (
    <>
      <SiteModal modalData={modalData} setModalData={setModalData} />
      <NavbarMenu
        modalData={modalData}
        setModalData={setModalData}
        data={getData}
      />
    </>
  );
};

export default MenuSample;
