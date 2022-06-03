import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateAuth from "../hoc/PrivateAuth";
import PublicAuth from "../hoc/PublicAuth";
import { AuthProvider } from "../hoc/AuthProvider";
import LayoutComponent from "../components/Layout/LayoutComponent";
import NotFoundPage from "../pages/NotFoundPage";
import ServerError from "../pages/ServerError";
import LoginPage from "../pages/LoginPage";
import OrdersPage from "../pages/OrdersPage";
import OrderPage from "../pages/OrderPage";
import FilialsPage from "../pages/FilialsPage";
import FilialCreatePage from "../pages/FilialCreatePage";
import ResetPage from "../pages/ResetPage";
import ManagersPage from "../pages/ManagersPage";
import CategorysPage from "../pages/CategorysPage";
import FilialPage from "../pages/FilialPage";
import ManagerPage from "../pages/ManagerPage";
import CategoryPage from "../pages/CategoryPage";
import FilialEditPage from "../pages/FilialEditPage";
import ManagerCreatePage from "../pages/ManagerCreatePage";
import CategoryCreatePage from "../pages/CategoryCreatePage";
import RestourantPage from "../pages/RestourantPage";
import ManagerEditPage from "../pages/ManagerEditPage";
import ProductPage from "../pages/ProductPage";
import ProductCreatePage from "../pages/ProductCreatePage";
import ProductEditPage from "../pages/ProductEditPage";

function RoutesMain() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading ...</div>}>
        <Routes>
          <Route path="/" element={<LayoutComponent />}>
            <Route
              index
              element={<Navigate to="/order/requested/page/1" replace />}
            />

            <Route
              path="order"
              element={<Navigate to="/order/requested/page/1" replace />}
            />

            <Route
              path="order/:title/page/:idpage"
              element={
                <PrivateAuth>
                  <OrdersPage />
                </PrivateAuth>
              }
            />
            <Route
              path="order/:title/detail/:id"
              element={
                <PrivateAuth>
                  <OrderPage />
                </PrivateAuth>
              }
            />
            <Route
              path="restaurants-detail"
              element={
                <PrivateAuth>
                  <RestourantPage />
                </PrivateAuth>
              }
            />

            <Route
              path="category"
              element={<Navigate to="/category/page/1" replace />}
            />

            <Route
              path="category/page/:idpage"
              element={
                <PrivateAuth>
                  <CategorysPage />
                </PrivateAuth>
              }
            />
            <Route
              path="category/create/"
              element={
                <PrivateAuth>
                  <CategoryCreatePage />
                </PrivateAuth>
              }
            />

            <Route
              path="product/:id/page/:idpage"
              element={
                <PrivateAuth>
                  <CategoryPage />
                </PrivateAuth>
              }
            />
            <Route
              path="filials"
              element={<Navigate to="/filials/page/1" replace />}
            />

            <Route
              path="filials"
              element={<Navigate to="/filials/page/1" replace />}
            />

            <Route
              path="filials/page/:idpage"
              element={
                <PrivateAuth>
                  <FilialsPage />
                </PrivateAuth>
              }
            />
            <Route
              path="filials/create"
              element={
                <PrivateAuth>
                  <FilialCreatePage />
                </PrivateAuth>
              }
            />
            <Route
              path="filials/edit/:id"
              element={
                <PrivateAuth>
                  <FilialEditPage />
                </PrivateAuth>
              }
            />
            <Route
              path="filials/detail/:id"
              element={
                <PrivateAuth>
                  <FilialPage />
                </PrivateAuth>
              }
            />

            <Route
              path="manager"
              element={<Navigate to="/manager/page/1" replace />}
            />

            <Route
              path="manager/page/:idpage"
              element={
                <PrivateAuth>
                  <ManagersPage />
                </PrivateAuth>
              }
            />
            <Route
              path="manager/create"
              element={
                <PrivateAuth>
                  <ManagerCreatePage />
                </PrivateAuth>
              }
            />
            <Route
              path="manager/detail/:id"
              element={
                <PrivateAuth>
                  <ManagerPage />
                </PrivateAuth>
              }
            />
            <Route
              path="manager/edit/:id"
              element={
                <PrivateAuth>
                  <ManagerEditPage />
                </PrivateAuth>
              }
            />
            <Route
              path="/product/detail/:id"
              element={
                <PrivateAuth>
                  <ProductPage />
                </PrivateAuth>
              }
            />
            <Route
              path="product/edit/:id"
              element={
                <PrivateAuth>
                  <ProductEditPage />
                </PrivateAuth>
              }
            />
            <Route
              path="product/create/:idcategory"
              element={
                <PrivateAuth>
                  <ProductCreatePage />
                </PrivateAuth>
              }
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />

          <Route
            path="login"
            element={
              <PublicAuth>
                <LoginPage />
              </PublicAuth>
            }
          />
          <Route path="sever-error" element={<ServerError />} />
          <Route
            path="reset"
            element={
              <PublicAuth>
                <ResetPage />
              </PublicAuth>
            }
          />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default RoutesMain;
