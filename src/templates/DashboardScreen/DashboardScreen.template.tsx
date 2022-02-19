import React from 'react';
import Drawer from 'src/components/Drawer';

const DashboardScreenTemplate: React.FC<{ Screen: React.FC<any> }> = ({ Screen }) => {
  return (
    <React.Fragment>
      <Drawer Component={Screen} />
    </React.Fragment>
  );
};

export default DashboardScreenTemplate;
