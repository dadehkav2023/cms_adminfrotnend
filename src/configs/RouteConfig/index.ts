import { UserRoles } from "../../core/enums";
import { AuthenticatedRoutesConfig } from "./RouteConfig";

export interface IAuthenticatedRoute {
  path: string;
  component: React.ReactNode;
  status?: number;
  exact: boolean;
  roles: any;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [...AuthenticatedRoutesConfig];
