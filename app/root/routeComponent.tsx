import { Outlet, useLoaderData, useLocation } from "react-router";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { LoaderData } from "~/root/loader.server";


export function RouteComponent() {
  const {
    environment,
  } = useLoaderData<LoaderData>();
  const location = useLocation();

  if (location.pathname.startsWith("/admin/sign-in")) {
    return <Outlet />;
  }

  const isAdminRoute = location.pathname.startsWith("/admin");
  if (isAdminRoute === true) {
    return (
      // <SignedInPageScaffold
      //     user={osirisUser}
      //     logo={aergiaClientConfiguration.logo}
      //     sidebarItems={getSidebarItems()}
      // >
      <DndProvider backend={HTML5Backend}>
        <Outlet />
      </DndProvider>
      // </SignedInPageScaffold>
    );
  }

  const isCartRoute = location.pathname.startsWith("/cart");
  const isCheckoutRoute = location.pathname.startsWith("/checkout");

  if (isCartRoute) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  if (isCheckoutRoute) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  return (

    <>

      <Outlet />

    </>
  );
}
