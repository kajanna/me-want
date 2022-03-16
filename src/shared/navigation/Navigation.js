import React, { useState } from 'react';

import { useScrollTrigger }  from '@material-ui/core/';

import SideDrawer from './SideDrawer';
import NavBar from './NavBar';

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 120,
  });
  return React.cloneElement(children, {
        show: !trigger
      })
};

const ShowOnScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 130,
  });
  return React.cloneElement(children, {
        show: trigger
      })
};

const Navigation = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawerHandler = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenDrawer(open);
  };
  
  return (
    <>
      <SideDrawer
        showDrawer={openDrawer}
        closeDrawer={toggleDrawerHandler(false)}
      />
      <HideOnScroll>
        <NavBar
          show={true}
          welcome
          onToggleDrawer={toggleDrawerHandler(true)}
        />
      </HideOnScroll>
      <ShowOnScroll>
        <NavBar onToggleDrawer={toggleDrawerHandler(true)} />
      </ShowOnScroll>
    </>
  );
};

export default Navigation;