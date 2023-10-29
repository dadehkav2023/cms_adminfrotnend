import React from "react";
import { ChevronDown, Edit2 } from "react-feather";
import { Link } from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem as Navitem,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";
import Styles from "./NavItem.module.scss";

const NavItem = ({ modalData, setModalData, menu }) => {
  if (menu.menuItem) {
    return menu.menuItem.link ? (
      <>
        <div className={Styles.itemContainer}>
          <div className={Styles.buttonCase}>
            <div>
              <span
                href="#"
                id="UncontrolledTooltipExample"
                style={{ cursor: "pointer" }}
              >
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to={"/MenuManagement/AlterMenuItem/LinkMenu/" + menu.id}
                >
                  <Edit2 />
                </Link>
              </span>
              <UncontrolledTooltip
                placement="top"
                target="UncontrolledTooltipExample"
              >
                <span>ویرایش</span>
              </UncontrolledTooltip>
            </div>
          </div>
          <DropdownItem>
            {menu.iconPath && (
              <img
                alt="icon"
                className="homeIcon"
                src={`${process.env.REACT_APP_PUBLIC_PATH}/${menu.iconPath}`}
              />
            )}

            {menu.title}
          </DropdownItem>
        </div>
      </>
    ) : menu.menuItem.filePath ? (
      <>
        <div className={Styles.itemContainer}>
          <div className={Styles.buttonCase}>
            <div>
              <span
                href="#"
                id="UncontrolledTooltipExample"
                style={{ cursor: "pointer" }}
              >
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to={"/MenuManagement/AlterMenuItem/DownloadMenu/" + menu.id}
                >
                  <Edit2 />
                </Link>
              </span>
              <UncontrolledTooltip
                placement="top"
                target="UncontrolledTooltipExample"
              >
                <span>ویرایش</span>
              </UncontrolledTooltip>
            </div>
          </div>
          <DropdownItem>
            {menu.iconPath && (
              <img
                alt="icon"
                className="homeIcon"
                src={`${process.env.REACT_APP_PUBLIC_PATH}/${menu.iconPath}`}
              />
            )}
            <a
              style={{ color: "rgba(0, 0, 0, 0.5)", textDecoration: "none" }}
              download
              href={`${process.env.REACT_APP_PUBLIC_PATH}/${menu.menuItem.filePath}`}
            >
              {menu.title}
            </a>
          </DropdownItem>
        </div>
      </>
    ) : menu.menuItem.modularPage ? (
      <>
        <div className={Styles.itemContainer}>
          <div className={Styles.buttonCase}>
            <div>
              <span
                href="#"
                id="UncontrolledTooltipExample"
                style={{ cursor: "pointer" }}
              >
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to={"/MenuManagement/AlterMenuItem/ModuleMenu/" + menu.id}
                >
                  <Edit2 />
                </Link>
              </span>
              <UncontrolledTooltip
                placement="top"
                target="UncontrolledTooltipExample"
              >
                <span>ویرایش</span>
              </UncontrolledTooltip>
            </div>
          </div>
          <DropdownItem>
            {menu.iconPath && (
              <img
                alt="icon"
                className="homeIcon"
                src={`${process.env.REACT_APP_PUBLIC_PATH}/${menu.iconPath}`}
              />
            )}

            {menu.title}
          </DropdownItem>
        </div>
      </>
    ) : (
      <>
        <div className={Styles.itemContainer}>
          <div className={Styles.buttonCase}>
            <div>
              <span
                href="#"
                id="UncontrolledTooltipExample"
                style={{ cursor: "pointer" }}
              >
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to={"/MenuManagement/AlterMenuItem/ContentMenu/" + menu.id}
                >
                  <Edit2 />
                </Link>
              </span>
              <UncontrolledTooltip
                placement="top"
                target="UncontrolledTooltipExample"
              >
                <span>ویرایش</span>
              </UncontrolledTooltip>
            </div>
          </div>
          <DropdownItem
            style={{ color: "rgba(0, 0, 0, 0.5)", textDecoration: "none" }}
            onClick={() => {
              setModalData({
                ...modalData,
                show: true,
                title: menu.title,
                body: menu.menuItem.ckEditorText,
              });
            }}
          >
            {menu.iconPath && (
              <img
                alt="icon"
                className="homeIcon"
                src={`${process.env.REACT_APP_PUBLIC_PATH}/${menu.iconPath}`}
              />
            )}

            {menu.title}
          </DropdownItem>
        </div>
      </>
    );
  } else
    return (
      <>
        <div className={Styles.itemContainer}>
          <div className={Styles.buttonCase}>
            <div>
              <span
                href="#"
                id="UncontrolledTooltipExample"
                style={{ cursor: "pointer" }}
              >
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to={"/MenuManagement/AlterMenu/" + menu.id}
                >
                  <Edit2 />
                </Link>
              </span>
              <UncontrolledTooltip
                placement="top"
                target="UncontrolledTooltipExample"
              >
                <span>ویرایش</span>
              </UncontrolledTooltip>
            </div>
          </div>
          <DropdownItem>
            {menu.iconPath && (
              <img
                alt="icon"
                className="homeIcon"
                src={`${process.env.REACT_APP_PUBLIC_PATH}/${menu.iconPath}`}
              />
            )}

            {menu.title}
          </DropdownItem>
        </div>
      </>
    );
};

export default NavItem;
