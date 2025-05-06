"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/admin/sidebar/nav-documents"
import { NavMain } from "@/components/admin/sidebar/nav-main"
import { NavSecondary } from "@/components/admin/sidebar/nav-secondary"
import { NavUser } from "@/components/admin/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: ListIcon,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: BarChartIcon,
    },
    {
      title: "Categories",
      url: "/admin/categories",
      icon: FolderIcon,
    },
    {
      title: "Organizations",
      url: "/admin/organizations",
      icon: UsersIcon,
    },
    {
      title: "Customers",
      url: "/admin/customers",
      icon: UsersIcon,
    },
  ],
  navClouds: [
    {
      title: "Inventory",
      icon: DatabaseIcon,
      isActive: true,
      url: "/admin/inventory",
      items: [
        {
          title: "Stock Levels",
          url: "/admin/inventory/stock",
        },
        {
          title: "Low Stock Alerts",
          url: "/admin/inventory/alerts",
        },
      ],
    },
    {
      title: "Marketing",
      icon: FileTextIcon,
      url: "/admin/marketing",
      items: [
        {
          title: "Promotions",
          url: "/admin/marketing/promotions",
        },
        {
          title: "Discounts",
          url: "/admin/marketing/discounts",
        },
      ],
    },
    {
      title: "Reports",
      icon: FileCodeIcon,
      url: "/admin/reports",
      items: [
        {
          title: "Sales Reports",
          url: "/admin/reports/sales",
        },
        {
          title: "Customer Reports",
          url: "/admin/reports/customers",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/admin/settings",
      icon: SettingsIcon,
    },
    {
      title: "Help Center",
      url: "/admin/help",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "/admin/search",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Product Catalog",
      url: "/admin/catalog",
      icon: DatabaseIcon,
    },
    {
      name: "Order Management",
      url: "/admin/orders",
      icon: ClipboardListIcon,
    },
    {
      name: "Customer Support",
      url: "/admin/support",
      icon: FileIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
