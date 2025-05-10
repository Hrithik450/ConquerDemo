"use client";
import { navItems } from "@/lib/utils/constant";
import { DesktopMenuProps, DropDownProps } from "@/lib/utils/constant.types";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DropdownItem = ({ item, rootName, setActiveLink }: DropDownProps) => {
  if (item.subItems) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center justify-between p-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
            {item.name}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className="min-w-56">
          {item.subItems.map((subItem) => (
            <DropdownItem
              key={subItem.name}
              item={subItem}
              rootName={rootName}
              setActiveLink={setActiveLink}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenuItem
      onClick={() => setActiveLink(rootName)}
      className="cursor-pointer"
    >
      <a href={item.path} className="w-full block">
        {item.name}
      </a>
    </DropdownMenuItem>
  );
};

const DesktopMenu = ({ activeLink, setActiveLink }: DesktopMenuProps) => {
  return navItems.map((link) => {
    if (link.subItems) {
      return (
        <DropdownMenu key={link.name}>
          <DropdownMenuTrigger asChild>
            <li
              className={`text-xs hidden sm:flex items-center cursor-pointer ${
                activeLink === link.name
                  ? "text-black border-b-2 border-gray-600 font-semibold"
                  : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => setActiveLink(link.name)}
            >
              {link.name}
            </li>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-56">
            {link.subItems.map((item) => (
              <DropdownItem
                key={item.name}
                item={item}
                rootName={link.name}
                setActiveLink={setActiveLink}
              />
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <li key={link.name}>
        <a
          href={link.path}
          onClick={() => setActiveLink(link.name)}
          className={`text-xs hidden sm:block px-4 py-2 ${
            activeLink === link.name
              ? "text-black border-b-2 border-blue-600 font-semibold"
              : "text-gray-700 hover:text-gray-900"
          }`}
        >
          {link.name}
        </a>
      </li>
    );
  });
};

export default DesktopMenu;
