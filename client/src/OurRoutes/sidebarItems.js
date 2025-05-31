import Icon from "../images/AdminSidebaricon.svg";
import AddProduct from "../pages/admin/addProduct/addProduct";
import AddCategory from "../pages/admin/category/addCategory";
import CategoryList from "../pages/admin/category/categoryList";
import DailyStock from "../pages/admin/dailyStock/dailyStock";
import Dashboard from "../pages/admin/dashboard/dashboard";
import Expenses from "../pages/admin/expense/expenseList";
import OrderDetail from "../pages/admin/orderDetail/orderDetail";
import OrderList from "../pages/admin/orderList/orderList";
import ProductList from "../pages/admin/product/productList";
import RateConfiguration from "../pages/admin/rateConfig/rateConfiguration";
import Report from "../pages/admin/report/report";
import ShopList from "../pages/admin/shops/shopList";
import ShowCase from "../pages/admin/showCase/showCase";


export const adminSidebarItems = [
  // { label: "Dashboard", path: "/admin/dashboard", icon: Icon },
  // { label: "Add Product", path: "/admin/addProduct", icon: Icon },
  { label: "Show Case", path: "/admin/ShowCase", icon: Icon },
  { label: "Report", path: "/admin/report", icon: Icon },
  { label: "Daily Stock", path: "/admin/dailyStock", icon: Icon },
  { label: "Expenses", path: "/admin/expences", icon: Icon },
  { label: "Orders", path: "/admin/orderList", icon: Icon },
  { label: "Categories", path: "/admin/categories", icon: Icon },
  { label: "Product List", path: "/admin/products", icon: Icon },
  { label: "Settings", path: "/admin/rateConfig", icon: Icon },
  // { label: "Shops", path: "/admin/shops", icon: Icon },
];
export const userSidebarItems = [
  { label: "Show Case", path: "/admin/ShowCase", icon: Icon },
  { label: "Daily Stock", path: "/admin/dailyStock", icon: Icon },
];

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
    label: "Dashboard",
  },
  {
    path: "/admin/products",
    element: <ProductList />,
    label: "Product List",
  },
  {
    path: "/admin/addProduct",
    element: <AddProduct />,
    label: "Add Product",
  },
  {
    path: "/admin/editProduct/:id",
    element: <AddProduct />,
    label: "Edit Product",
  },
  {
    path: "/admin/categories",
    element: <CategoryList />,
    label: "Product Category",
  },
  {
    path: "/admin/addCategory",
    element: <AddCategory />,
    label: "Add Category",
  },
  {
    path: "/admin/editCategory/:categoryId",
    element: <AddCategory />,
    label: "Edit Category",
  },
  {
    path: "/admin/orderList",
    element: <OrderList />,
    label: "Orders",
  },
  {
    path: "/admin/orderDetail/:orderId",
    element: <OrderDetail />,
    label: "Order Detail",
  },
  {
    path: "/admin/shops",
    element: <ShopList />,
    label: "Shops List",
  },
  {
    path: "/admin/dailyStock",
    element: <DailyStock />,
    label: "Daily Stock",
  },
  {
    path: "/admin/ShowCase",
    element: <ShowCase />,
    label: "Show Case",
  },
  {
    path: "/admin/rateConfig",
    element: <RateConfiguration />,
    label: "Settings",
  },
  {
    path: "/admin/report",
    element: <Report />,
    label: "Report",
  },
  {
    path: "/admin/expences",
    element: <Expenses />,
    label: "Expenses",
  },
];

export const userRoutes = [
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
    label: "Dashboard",
  },
  {
    path: "/admin/dailyStock",
    element: <DailyStock />,
    label: "Daily Stock",
  },
  {
    path: "/admin/ShowCase",
    element: <ShowCase />,
    label: "Show Case",
  },
  
  {
    path: "/admin/expences",
    element: <Expenses />,
    label: "Expenses",
  },
];
