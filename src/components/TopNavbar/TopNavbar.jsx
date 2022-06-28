import React, { memo, useEffect, useState } from 'react';
import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { navigationActions } from '../../redux/navigation/actions';
import { getChosenOption } from '../../redux/navigation/selectors';

import './TopNavbar.scss';


const CHOSEN_NAVIGATION_OPTION = 'CHOSEN_NAVIGATION_OPTION';

const TopNavbar = memo(({ links }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeOption = useSelector(getChosenOption);

  const [showNav, setShowNav] = useState(false);

  const setChosen = (id, link) => {
    dispatch(navigationActions.setChosenOption(id));
    navigate(link);
  };

  useEffect(() => {
    const chosenOption = window.sessionStorage.getItem(CHOSEN_NAVIGATION_OPTION);
    dispatch(navigationActions.setChosenOption(chosenOption));
  }, []);

  return (
    <MDBNavbar className="top-navigation" expand="lg" dark bgColor="dark">
      <MDBContainer fluid>
        <MDBNavbarBrand tag="div">Uchet and Tochka</MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav right fullWidth={false}>

            {links.map((link) => (
              <MDBNavbarItem key={link.id} onClick={() => setChosen(link.id, link.link)}>
                <MDBNavbarLink active={activeOption === link.id}>
                  {link.name}
                </MDBNavbarLink>
              </MDBNavbarItem>
            ))}

          </MDBNavbarNav>
        </MDBCollapse>

      </MDBContainer>
    </MDBNavbar>
  );
});

export default TopNavbar;
