import AdminUsersList from "./components/pages/admin/UsersList";
import AdminUserCreate from "./components/pages/admin/UserCreate";
import AdminCustomerList from "./components/pages/admin/CustomerList";
import AdminCustomerCreate from "./components/pages/admin/CustomerCreate";
import AdminRoleList from "./components/pages/admin/RoleList";
import AdminRoleCreate from "./components/pages/admin/RoleCreate";
import AdminCompanyList from "./components/pages/admin/CompanyList";
import AdminCompanyCreate from "./components/pages/admin/CompanyCreate";
import ServicesList from "./components/pages/admin/ServicesList";
import ServiceCreate from "./components/pages/admin/ServiceCreate";
import ProductList from "./components/pages/admin/ProductList";
import ProductCreate from "./components/pages/admin/ProductCreate";
import IntervalList from "./components/pages/admin/IntervalList";
import IntervalCreate from "./components/pages/admin/IntervalCreate";
import AreaList from "./components/pages/admin/AreaList";
import AreaCreate from "./components/pages/admin/AreaCreate";
import CardList from "./components/pages/admin/CardList";
import CardCretae from "./components/pages/admin/CardCreate";
import PortList from "./components/pages/admin/PortList";
import PortCreate from "./components/pages/admin/PortCreate";
import HardWareList from "./components/pages/admin/HardWareList";
import HardWareCreate from "./components/pages/admin/HardWareCreate";
import PersonReview from "./components/pages/admin/PersonReview";
import CompanyReview from "./components/pages/admin/CompanyReview";
import UserReview from "./components/pages/admin/UserReview";
import RolReview from "./components/pages/admin/RolReview";
import ServiceReview from "./components/pages/admin/ServiceReview";
import ProductReview from "./components/pages/admin/ProductReview";
import AreaReview from "./components/pages/admin/AreaReview";
import HardwareReview from "./components/pages/admin/HardwareReview";
import CardReview from "./components/pages/admin/CardReview";
import PortReview from "./components/pages/admin/PortReview";
import PersonEdit from "./components/pages/admin/PersonEdit";
import CompanyEdit from "./components/pages/admin/CompanyEdit";
import PersonView from "./components/pages/admin/PersonView";
import CompanyView from "./components/pages/admin/CompanyView";
import AddBalance from "./components/pages/admin/Finance/AddBalance";
import Transactions from "./components/pages/admin/Finance/Transactions";

export const routes = [
  {
    path: "/user/list",
    component: AdminUsersList,
    exact: true,
    permissionKey: "permission:user-index",
  }, {
    path: "/user/create",
    component: AdminUserCreate,
    exact: true,
    permissionKey: "permission:user-create",
  }, {
    path: "/customer/person/list",
    component: AdminCustomerList,
    exact: true,
    permissionKey: "permission:person-index",
  }, {
    path: "/customer/create",
    component: AdminCustomerCreate,
    exact: true,
    permissionKey: "permission:person-create",
  }, {
    path: "/role/list",
    component: AdminRoleList,
    exact: true,
    permissionKey: "permission:role-index",
  }, {
    path: "/role/create",
    component: AdminRoleCreate,
    exact: true,
    permissionKey: "permission:role-create",
  }, {
    path: "/customer/company/list",
    component: AdminCompanyList,
    exact: true,
    permissionKey: "permission:company-index",
  }, {
    path: "/company/create/new",
    component: AdminCompanyCreate,
    exact: true,
    permissionKey: "permission:company-create",
  }, {
    path: "/service/list",
    component: ServicesList,
    exact: true,
    permissionKey: "permission:service-index",
  }, {
    path: "/service/create",
    component: ServiceCreate,
    exact: true,
    permissionKey: "permission:service-create",
  }, {
    path: "/product/list",
    component: ProductList,
    exact: true,
    permissionKey: "permission:product-index",
  }, {
    path: "/product/create",
    component: ProductCreate,
    exact: true,
    permissionKey: "permission:product-create",
  },
  //   {
  //   path: "/interval/list",
  //   component: IntervalList,
  //   exact: true
  // },{
  //   path: "/interval/create",
  //   component: IntervalCreate,
  //   exact: true
  // },
  {
    path: "/area/list",
    component: AreaList,
    exact: true,
    permissionKey: "permission:area-index",
  }, {
    path: "/area/create",
    component: AreaCreate,
    exact: true,
    permissionKey: "permission:area-create",
  }, {
    path: "/card/list",
    component: CardList,
    exact: true,
    permissionKey: "permission:card-index",
  }, {
    path: "/card/create",
    component: CardCretae,
    exact: true,
    permissionKey: "permission:card-create",
  }, {
    path: "/port/list",
    component: PortList,
    exact: true,
    permissionKey: "permission:port-index",
  }, {
    path: "/port/create",
    component: PortCreate,
    exact: true,
    permissionKey: "permission:port-create",
  }, {
    path: "/hardware/list",
    component: HardWareList,
    exact: true,
    permissionKey: "permission:hardware-index",
  }, {
    path: "/hardware/create",
    component: HardWareCreate,
    exact: true,
    permissionKey: "permission:hardware-create",
  }, {
    path: "/person/home/:id",
    component: PersonReview,
    exact: true,
    permissionKey: "permission:home-show",
  }, {
    path: "/person/view/:id",
    component: PersonView,
    exact: true,
    permissionKey: "permission:person-show",
  }, {
    path: "/company/view/:id",
    component: CompanyView,
    exact: true,
    permissionKey: "permission:company-show",
  }, {
    path: "/company/home/:id",
    component: CompanyReview,
    exact: true,
    permissionKey: "permission:home-show",
  }, {
    path: "/users/:id",
    component: UserReview,
    exact: true,
    permissionKey: "permission:user-show",
  }, {
    path: "/role/view/:id",
    component: RolReview,
    permissionKey: "permission:role-show",
  }, {
    path: "/product/view/:id",
    component: ProductReview,
    exact: true,
    permissionKey: "permission:product-show",
  }, {
    path: "/service/view/:id",
    component: ServiceReview,
    exact: true,
    permissionKey: "permission:service-show",
  }, {
    path: "/area/view/:id",
    component: AreaReview,
    exact: true,
    permissionKey: "permission:area-show",
  }, {
    path: "/hardware/view/:id",
    component: HardwareReview,
    exact: true,
    permissionKey: "permission:hardware-show",
  }, {
    path: "/card/view/:id",
    component: CardReview,
    exact: true,
    permissionKey: "permission:card-show",
  }, {
    path: "/port/view/:id",
    component: PortReview,
    exact: true,
    permissionKey: "permission:port-show",
  }, {
    path: "/person/edit/:id",
    component: PersonEdit,
    exact: true,
    permissionKey: "permission:person-edit",
  }, {
    path: "/company/edit/:id",
    component: CompanyEdit,
    exact: true,
    permissionKey: "permission:company-edit",
  }, {
    path: "/finance/balance/add",
    component: AddBalance,
    exact: true,
    permissionKey: "all",
  }, {
    path: "/finance/transactions",
    component: Transactions,
    exact: true,
    permissionKey: "all",
  }
]
