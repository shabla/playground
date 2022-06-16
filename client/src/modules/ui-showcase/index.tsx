import { Route, Navigate } from "react-router-dom"

import appConfig, { ModuleConfig } from '@/appConfig';
import { Showcase } from './pages/Showcase';
import { ButtonExample } from './components/ButtonExample';
import { FlexContainerShowcase } from './components/FlexContainerShowcase';
import { ButtonGroupShowcase } from './components/ButtonGroupShowcase';
import { TextFieldShowcase } from './components/TextFieldShowcase';
import { FormTextFieldShowcase } from './components/FormTextFieldShowcase';
import { CheckboxExample } from './components/CheckboxExample';

export const config: ModuleConfig = {
  name: 'showcase',
  path: '/showcase',
};

export const init = (): void => {
  appConfig.registerModule(config, (
    <Route
      path={config.path}
      element={<Showcase />}
    >
      <Route index element={<Navigate to="button" />} />
      <Route path="button" element={<ButtonExample />} />
      <Route path="flex-container" element={<FlexContainerShowcase />} />
      <Route path="text-field" element={<TextFieldShowcase />} />
      <Route path="button-group" element={<ButtonGroupShowcase />} />
      <Route path="form-text-field" element={<FormTextFieldShowcase />} />
      <Route path="checkbox" element={<CheckboxExample />} />
      <Route path="*" element={<div>No matching showcase</div>} />
    </Route>
  ))
  appConfig.registerNavbarItem('left', { to: config.path, label: 'Showcase' })
}