import React, { useContext, useEffect, useState } from "react";
import { FallBackSpinner } from "../../../components/common/Spinner/FallBackSpinner/FallbackSpinner";
import { UserRoles } from "../../enums";
import { UseGetRolesOfcurrentUser } from "../../services/api/get-roles-of-user.api";
import { UseGetUsersApi } from "../../services/api/get-user.api";
import {
  getAccessToken,
  getLoggedUserInfoFromStorage,
  getUser,
  getUserClaims,
  getUserRoles,
  logout,
} from "../../services/authentication/authentication.service";
import { userManager } from "../../services/authentication/oidc.service";
import {
  clearStorage,
  getItem,
} from "../../services/common/storage/storage.service";
import methods from "../../services/interceptors/http.interceptor";
import { CheckGreaterTimeExpiry } from "../date-helper.utils";

interface IUserInfo {
  userType: number;
  userName?: string;
  name?: string;
  family?: string;
  userInfoId?: number;
  authTime?: string;
  localId: number | null;
  roles: string[];
}

interface IUserClaim {
  value: string;
  type: string;
}

export interface IAuthInfo {
  token: string;
  userClaim: IUserClaim[];
  userInfo: IUserInfo;
  role: string[];
  setUserClaimState: React.Dispatch<React.SetStateAction<IUserClaim[]>>;
  setUserInfoState: React.Dispatch<React.SetStateAction<IUserInfo>>;
  setTokenState: React.Dispatch<React.SetStateAction<string>>;
  setRoleState: React.Dispatch<React.SetStateAction<string[]>>;
  isAuthenticated: () => boolean;
  resetAuthContext: () => void;
  logOut: () => void;
}

export const authContext = React.createContext<IAuthInfo | null>(null);

const initialUserInfoState: IUserInfo = {
  userType: 1,
  userName: "",
  name: "",
  authTime: "",
  family: "",
  localId: null,
  userInfoId: 0,
  roles: ["UserReal"],
};

const useUserAuth = () => {
  const pc = useContext(authContext);
  if (pc === null) {
    throw new Error("usePermissions Must be inside of Provider");
  }
  return pc;
};

// export const useCheckExpiry = async () => {
//   const expiry = getItem("expiry");
//   const isExpiry = getItem("isExpiry");
//   const user = useUserAuth();
//   // if (!isExpiry || isExpiry === "false") {
//   // setItem("isExpiry", true);

//   const access_token = await CheckGreaterTimeStamp(expiry ? +expiry : null);
//   if (access_token) {
//     user.setTokenState(access_token);
//   }
//   // setTimeout(() => {
//   //   setItem("isExpiry", false);
//   // }, 500);
//   // }
//   return null;
// };

// default initial from local-storage
const token: any =
  getItem("token") && getItem("token") !== "undefined" ? getItem("token") : "";
// const role: any = getUserRoles() ? getUserRoles() : UserRoles.UserReal;
const userClaim: any = getUserClaims() ? getUserClaims() : [];
// const initUserInfo: any = getLoggedUserInfoFromStorage()
//   ? getLoggedUserInfoFromStorage()
//   : initialUserInfoState;

const roles: any =
  getItem("roles") && getItem("roles") !== "undefined" ? getItem("roles") : "";

const AuthenticationContext: React.FC = ({ children }) => {
  const [id, setId] = useState<null | number>(null);
  const [userInfoState, setUserInfoState] = useState<IUserInfo>({
    userType: 0,
    authTime: "",
    family: "",
    name: "",
    userInfoId: 0,
    userName: "",
    localId: id,
    roles: ["UserReal"],
  });
  const [tokenState, setTokenState] = useState<string>(token);
  const [rolesState, setRolesState] = useState<string>(roles);
  const [userClaimState, setUserClaimState] = useState<IUserClaim[]>(userClaim);
  const [roleState, setRoleState] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingRoles, setIsLoadingRoles] = useState<boolean>(false);

  const logOut = () => {
    clearStorage();
    setUserInfoState({
      userType: 0,
      authTime: "",
      family: "",
      name: "",
      userInfoId: 0,
      localId: null,
      userName: "",
      roles: [],
    });
    setTokenState("");
    setUserClaimState([]);
    setRoleState([]);
    window.location.pathname = "/";
  };

  // const renewToken = async () => {
  //   const result = await CheckGreaterTimeExpiry();
  //   if (result) setTokenState(result);
  // };

  // useEffect(() => {
  //   renewToken();
  // }, []);

  const getData = async () => {
    try {
      const user = await getUser();
      setRoleState(user ? user.profile.role : []);
      setUserInfoState({
        userName: user?.profile.preferred_username,
        name: user?.profile.name,
        userType: +user?.profile.UserType,
        family: user?.profile.family_name,
        userInfoId: +user?.profile.UserInfoId,
        localId: id,
        authTime: user?.profile.auth_time?.toString(),
        roles: ["UserReal"],
      });
      setIsLoading(false);

      // if (!user) {
      //   const url = await userManager.metadataService.getUserInfoEndpoint();

      //   console.log("sss");
      //   console.log(url);

      //   setTimeout(() => {
      //     methods
      //       .get(url, {
      //         headers: {
      //           Authorization: "Bearer " + getAccessToken(),
      //         },
      //       })
      //       .then((val) => {
      //         console.log(val.data);
      //       });
      //   }, 3000);
      // }
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const isAuthenticated = () => {
    if (!userInfoState.userType || !userInfoState.userInfoId) {
      return false;
    }
    if (token) {
      return true;
    }

    return false;
  };

  const resetAuthContext = () => {
    setUserInfoState(initialUserInfoState);
    setTokenState("");
    setRoleState([""]);
  };

  const {
    data: getUsersData,
    isLoading: getUsersIsLoading,
    isError: getUsersIsError,
    isSuccess: getUsersIsSuccess,
    mutate: getUsersMutate,
  } = UseGetUsersApi();

  const {
    data: getActiveRolesData,
    isLoading: getActiveRolesIsLoading,
    isError: getActiveRolesIsError,
    isSuccess: getActiveRolesIsSuccess,
    refetch: refetchActiveRoles,
  } = UseGetRolesOfcurrentUser(id);

  useEffect(() => {
    userInfoState.userName && setIsLoadingRoles(true);
    userInfoState.userName &&
      getUsersMutate({
        page: 1,
        pageSize: 1,
        userName: userInfoState.userName,
      });
    console.log(userInfoState.userName);
  }, [userInfoState.userName]);

  useEffect(() => {
    getUsersData?.data.result.list.length &&
      setId(getUsersData?.data.result.list[0].id);
    id && id === getUsersData?.data.result.list[0].id && refetchActiveRoles();
  }, [getUsersIsSuccess, id]);

  useEffect(() => {
    console.log(getActiveRolesData?.data.result);
    getActiveRolesData &&
      setUserInfoState((prev) => {
        return {
          ...prev,
          roles: [
            "UserReal",
            ...getActiveRolesData?.data.result.map((role: any) => role.name),
          ],
        };
      });
    getActiveRolesData && setIsLoadingRoles(false);
    getActiveRolesData?.data.result.map((role: any) => role.name) &&
      console.log(getActiveRolesData?.data.result);
  }, [getActiveRolesIsSuccess, id]);

  useEffect(() => {
    setUserInfoState({
      ...userInfoState,
      localId: id,
    });
  }, [id]);

  return (
    <authContext.Provider
      value={{
        token: tokenState,
        userInfo: userInfoState,
        role: roleState,
        userClaim: userClaimState,
        setUserClaimState,
        setUserInfoState,
        setTokenState,
        setRoleState,
        isAuthenticated,
        resetAuthContext,
        logOut,
      }}
    >
      {isLoading || isLoadingRoles ? <FallBackSpinner /> : children}
    </authContext.Provider>
  );
};

const CanClaim: React.FC<{ userClaim: IUserClaim }> = ({
  userClaim,
  children,
}) => {
  const { userClaim: allUserClaims } = useUserAuth();

  let valid = false;

  allUserClaims.forEach((item: IUserClaim) => {
    item.type === userClaim.type && item.value === userClaim.value
      ? (valid = true)
      : (valid = false);
  });

  if (valid) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export { AuthenticationContext, useUserAuth, CanClaim };
