import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

import appConfig from '@/appConfig';
import { Column } from '@/components';

import './SideBar.scss';

export const SideBar: React.FC<{ rootPath: string }> = ({ rootPath }) => {
  const style: NavLinkProps['style'] = ({ isActive }) => ({
    color: isActive ? 'red' : 'blue',
  });

  return (
    <Column className="side-bar p-10">
      <NavLink style={style} to={`${rootPath}/flex-container`}>Flex Container</NavLink>
      <NavLink style={style} to={`${rootPath}/button`}>Button</NavLink>
      <NavLink style={style} to={`${rootPath}/button-group`}>Button Group</NavLink>
      <NavLink style={style} to={`${rootPath}/text-field`}>Text Field</NavLink>
      <NavLink style={style} to={`${rootPath}/form-text-field`}>Form Text Field</NavLink>
    </Column>
  );
};
