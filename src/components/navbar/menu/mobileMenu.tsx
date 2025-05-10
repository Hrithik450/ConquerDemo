"use client";
import React, { useState } from "react";
import { ArrowLeft, ChevronRight, Menu, X } from "lucide-react";
import Logo from "../logo";
import { MobileMenuProps, NavItem } from "@/lib/utils/constant.types";
import { navItems } from "@/lib/utils/constant";

const MobileMenu = ({
  activeLink,
  setActiveLink,
  mobileMenuOpen,
  setMobileMenuOpen,
}: MobileMenuProps) => {
  const [menuStack, setMenuStack] = useState<NavItem[][]>([navItems]);
  const handleItemClick = (item: NavItem) => {
    if (item.subItems) {
      setMenuStack((prev) => [...prev, item.subItems!]);
    } else {
      const rootItem = menuStack[0].find((root) =>
        JSON.stringify(root).includes(item.name)
      );
      setActiveLink(rootItem?.name || item.name);
      setMobileMenuOpen(false);
      setMenuStack([navItems]);
    }
  };

  const handleBack = () => {
    if (menuStack.length > 1) {
      setMenuStack((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transform ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:hidden`}
    >
      <div className="relative w-full max-w-sm h-full bg-white shadow-xl">
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-2">
            {menuStack.length > 1 ? (
              <button
                onClick={handleBack}
                className="text-gray-700 hover:bg-gray-100 rounded-full flex items-center justify-between"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                <span>Back</span>
              </button>
            ) : (
              <div
                onClick={() => {
                  setActiveLink("Home");
                  setMobileMenuOpen(false);
                }}
              >
                <Logo />
              </div>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setMenuStack([navItems]);
              }}
              className="text-gray-700 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <div
              className="absolute inset-0 w-full h-full transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${(menuStack.length - 1) * 100}%)`,
                display: "flex",
                flexDirection: "row",
              }}
            >
              {menuStack.map((menu, index) => (
                <nav
                  key={index}
                  className="w-full shrink-0 space-y-2 overflow-y-auto py-3 bg-white"
                >
                  {menu.map((item) => (
                    <div
                      key={item.name}
                      className={`flex justify-between items-center py-3 cursor-pointer ${
                        activeLink === item.name
                          ? "text-black font-semibold"
                          : "text-gray-700"
                      } hover:bg-gray-100`}
                      onClick={() => handleItemClick(item)}
                    >
                      <span>{item.name}</span>
                      {item.subItems && <ChevronRight className="w-5 h-5" />}
                    </div>
                  ))}
                </nav>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
