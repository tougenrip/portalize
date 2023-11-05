import { usePathname } from "next/navigation";
import { useMemo } from "react";

const useSettingsRoutes = () => {
  const pathname = usePathname();

  return useMemo<
    {
      label: string;
      href: string;
      isActive: boolean;
    }[]
  >(
    () => [
      {
        label: "Dashboard",
        href: "/social/settings/dashboard",
        isActive: pathname === "/social/settings/dashboard",
      },
      {
        label: "Profile",
        href: "/social/settings/profile",
        isActive: pathname === "/social/settings/profile",
      },
    ],
    [pathname]
  );
};

export default useSettingsRoutes;
