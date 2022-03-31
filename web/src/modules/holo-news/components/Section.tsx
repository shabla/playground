import React from "react";

export interface SectionProps {
  title?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  title
}) => {
  return (
    <div className="section">
      <h2 className="section__title">{title}</h2>
      <div className="section__content">
        {children}
      </div>
    </div>
  )
}

export const SectionRow: React.FC = ({ children }) => {
  return (
    <div className="section__row">
      {children}
    </div>
  )
}

export const SectionCell: React.FC = ({ children }) => {
  return (
    <div className="section__cell">
      {children}
    </div>
  )
}

export interface SectionHeaderProps {
  banner?: string;
  name?: string;
  icon?: string;
  color?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  children, banner, name, icon, color
}) => {
  return (
    <div className="section__header">
      <div className="banner" style={{ backgroundImage: `url(${banner})` }} />
      <div className="member">
        <img src={icon} alt="Icon" className="icon" />
        <span className="name" style={{ color: color }}>{name}</span>
      </div>
    </div>
  )
}