import React from "react";

import Styles from "./NavMenu.module.scss";
import NavItem from "../NavItem/NavItem";
import { Edit2, Delete, Trash, ArrowDown, ChevronDown } from "react-feather";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
const NavMenu = ({ modalData, setModalData, title, menus, count, id }) => {
  return count === 1 ? (
    <>
      {menus.map((menu) => {
        return (
          <>
            {!menu.menuComponentResponses && (
              <>
                <NavItem
                  modalData={modalData}
                  setModalData={setModalData}
                  menu={menu}
                />
              </>
            )}
            {menu.menuComponentResponses &&
              menu.menuComponentResponses.length > 0 && (
                <NavMenu
                  id={menu.id}
                  menus={menu.menuComponentResponses}
                  title={menu.title}
                  count={++count}
                />
              )}
          </>
        );
      })}
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
                to={"/MenuManagement/AlterMenu/" + id}
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
        <UncontrolledDropdown inNavbar nav>
          <DropdownToggle caret nav>
            {title} <ChevronDown style={{ marginLeft: "10px" }} />
          </DropdownToggle>
          <DropdownMenu right>
            {menus.map((menu) => {
              return (
                <>
                  <NavItem
                    modalData={modalData}
                    setModalData={setModalData}
                    menu={menu}
                  />
                  {menu.menuComponentResponses &&
                    menu.menuComponentResponses.length > 0 && (
                      <>
                        <NavMenu
                          menus={menu.menuComponentResponses}
                          title={menu.title}
                          count={++count}
                          id={menu.id}
                        />
                      </>
                    )}
                </>
              );
            })}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    </>
  );
};

export default NavMenu;
