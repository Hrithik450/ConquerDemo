import React from "react";

export interface NavItem {
  name: string;
  path: string;
  subItems?: NavItem[];
}

export interface DropDownProps {
  item: NavItem;
  rootName: string;
  setActiveLink: React.Dispatch<React.SetStateAction<string>>;
}

export interface DesktopMenuProps {
  activeLink: string;
  setActiveLink: React.Dispatch<React.SetStateAction<string>>;
}

export interface MobileMenuProps {
  activeLink: string;
  setActiveLink: React.Dispatch<React.SetStateAction<string>>;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SampleResultProps {
  title: string;
  description: string;
  source: string;
}

export interface SearchButtonProps {
  onClick: () => void;
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface HeroProductImagesProps {
  link: string;
  name: string;
}

export interface LatestCardsProps {
  link: string;
  text: string[];
  widthAndHeight: string;
  textOneStyle: string;
  textTwoStyle: string;
  textThreeStyle: string;
}

export interface WideCardProps {
  link: string;
  text: string[];
  widthAndHeight: string;
  textZeroStyle: string | undefined;
  textOneStyle: string | undefined;
  textTwoStyle: string | undefined;
  textThreeStyle: string | undefined;
}

export interface HeadingProps {
  text: string[];
  textColor: string;
}

type ImageLink = {
  label: string;
  url: string;
};

export interface ProductCardsProps {
  text: string[];
  colorOptions: string;
  link: string;
  images?: ImageLink[];
}

export interface PersonalizationProductsProps {
  text: string[];
  colorOptions: string;
  link: string;
  images?: ImageLink[];
}

export interface AppleDifferenceCardsProps {
  path: string;
  text: string[];
}

export interface HelpCardsProps {
  link: string;
  text: string[];
  widthAndHeight: string;
  textZeroStyle?: string;
  textOneStyle?: string;
  textTwoStyle?: string;
  textThreeStyle?: string;
}

export interface AppleExperienceCardsProps {
  link: string;
  text: string[];
  widthAndHeight: string;
  textZeroStyle?: string;
  textOneStyle?: string;
  textTwoStyle?: string;
  textThreeStyle?: string;
}

export interface FootLinkListProps {
  title: string;
  list: string[];
}
