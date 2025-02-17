"use client";

import { useFetchData } from "@/hooks/useFetchData";
import { fetchCategoriesData } from "@/lib/apiFuntions";
import { Category, HeaderProps } from "@/types";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
// Interfaces for category data

const Header: React.FC<HeaderProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const pathname = usePathname();
  const { data: categories, loading } =
    useFetchData<Category[]>(fetchCategoriesData);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (categoryId: number) => {
    setActiveDropdown(activeDropdown === categoryId ? null : categoryId);
  };

  // Array of navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "Category", label: "Category" },
    { href: "/shop", label: "Shop" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-backgroundColor text-textColor py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container-c flex justify-between items-center bg-backgroundColor text-textColor">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <span className="hover:text-btnHoverColor transition-colors font-extralight duration-300">
              MyLogo
            </span>
          </Link>
        </div>

        {/* Navigation Menu (Visible on md and larger screens) */}
        <nav className="sm-to-xs:hidden flex items-center space-x-6">
          {navLinks.map((link) => (
            <div key={link.href}>
              {link.label === "Category" ? (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="flex items-center gap-2 hover:text-btnHoverColor transition-colors font-extralight duration-300">
                      Categories
                      <ChevronDownIcon
                        className="size-4 text-gray-400"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                      <div className="py-1">
                        {categories?.map((category) => (
                          <Menu.Item key={category.id}>
                            {({ active }) => (
                              <div className="relative group">
                                <div
                                  // href={`/category/${category.slug}`}
                                  className={`block px-4 py-2 text-sm ${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {category.name}
                                  {category.subcategories.length > 0 && (
                                    <ChevronDownIcon
                                      className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  )}
                                </div>

                                {/* Subcategories submenu */}
                                {category.subcategories.length > 0 && (
                                  <div className="absolute left-full top-0 hidden group-hover:block w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                                    {category.subcategories.map((sub) => (
                                      <Menu.Item key={sub.id}>
                                        {({ active }) => (
                                          <Link
                                            href={`/category/${category.slug}/${sub.slug}`}
                                            className={`block px-4 py-2 text-sm ${
                                              active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700"
                                            }`}
                                          >
                                            {sub.name}
                                          </Link>
                                        )}
                                      </Menu.Item>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <Link href={link.href}>
                  <span
                    className={`hover:text-btnHoverColor transition-colors font-extralight duration-300 ${
                      pathname === link.href ? "text-btnColor" : ""
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm-to-xs:block hidden p-2 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm-to-xs:block hidden mt-4 container-c">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`block py-2 hover:text-btnHoverColor transition-colors font-extralight duration-300 ${
                  pathname === link.href ? "text-btnColor" : ""
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}

          {/* Mobile Categories */}
          {categories?.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => toggleDropdown(category.id)}
                className="w-full text-left py-2 hover:text-btnHoverColor transition-colors font-extralight duration-300"
              >
                {category.name}
              </button>
              {activeDropdown === category.id &&
                category.subcategories.length > 0 && (
                  <div className="pl-4">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${category.slug}/${sub.slug}`}
                      >
                        <span className="block py-2 hover:text-btnHoverColor transition-colors font-extralight duration-300">
                          {sub.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
