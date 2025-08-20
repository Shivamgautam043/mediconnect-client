import type { RouteConfig } from "@react-router/dev/routes";
import { index, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/_index/route.tsx"),
  route("about-us", "routes/about-us/route.tsx"),
  route("test-db", "routes/test-db/route.tsx"),

  // route("product-detail", "routes/product-detail/route.tsx"),
  route("product-detail/:id", "routes/product-detail/$id/route.tsx"),

  // ...prefix("api", [
  //   route("send-otp", "routes/api/send-otp/route.tsx"),
  //   route("verify-otp", "routes/api/verify-otp/route.tsx"),
  //   route("admin/script", "routes/api/admin/script/route.tsx"),
  // ]),
  // ...prefix("admin", [
  //   index("routes/admin/_index/route.tsx"),
  //   route("orders", "routes/admin/orders/_index/route.tsx"),
  // ]),
  // ...prefix("osiris", [
  //   ...prefix("api", [
  //     route(
  //       "sign-in",
  //       "submodules/osiris--remix-helper/routes/api/sign-in/route.tsx"
  //     ),
  //   ]),
  // ]),
  // route(
  //   "auth-callback",
  //   "submodules/osiris--remix-helper/routes/auth-callback/route.tsx"
  // ),
  // route("sign-in", "routes/sign-in/route.tsx"),

] satisfies RouteConfig;
