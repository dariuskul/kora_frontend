import React from 'react';

import { LayoutPublic } from 'Layouts/LayoutPublic';

export const PublicRoute: React.FC = ({ children }) => {
  return (
    <LayoutPublic>
      {children}
    </LayoutPublic>
  )
};