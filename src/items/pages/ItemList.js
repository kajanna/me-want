import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Container,
  Fab,
  Tooltip,
  Link,
  CircularProgress,
} from "@material-ui/core";
import { Add } from '@material-ui/icons';

import { useAuth } from '../../shered/context/AuthContext';

import Item from '../components/Item';
import NoUserItemInfo from '../components/NoUserItemInfo';
import useHttpClient from '../../shered/hooks/http-req-hook';
import ErrorModal from '../../shered/UIcustom/ErrorModal';

const useStyles = makeStyles(theme => ({
  container: {
   display: 'flex',
   flexWrap: 'wrap',
   flexDirection: 'row',
   justifyContent: 'space-around',
   
  },
  addBtn: {
   position: 'fixed',
   bottom: 25,
   zIndex: 10000,
   left: '55%',
   [theme.breakpoints.up('xs')]: {
      bottom: 35,
      left: '75%'
   },
   [theme.breakpoints.up('md')]: {
      left: '90%'
   }
  },
  card: {
    margin: 20
  }
 }));

const ItemList = () => {

   const classes = useStyles();

   const userId = useParams().userId; 

   const { uid, token } = useAuth();

   const [ items, setItems ] = useState();

   const { sendRequest, error, isLoading, clearErrorHandler } = useHttpClient();
   
   const placeDeletedHandler = deletedItemId => {
    setItems(previtems => previtems.filter(i => i.id !== deletedItemId))
   }
  
   useEffect(() => {
    const getItemsForUserId = async () => {
      try {                                     
        const response = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/items/users/${userId}`,
          'GET',
          { Authorization: `Bearer ${token}` }
          );
          if (response.statusText ==='OK') {
            if (uid !== userId) {
              const showedItems = response.data.items.filter(i => i.public === true)
              setItems(showedItems);
             } else {
               setItems(response.data.items)
             }
          }
      } catch (err) {}
    };
    getItemsForUserId();
   },[sendRequest, userId, uid, token]);


   return (
     <Box>
       <Box className={classes.container}>
         {isLoading && (
           <Box margin={3}>
             <CircularProgress color="secondary" />
           </Box>
         )}
         <ErrorModal open={!!error} close={clearErrorHandler} error={error} />
         {items && items.length === 0 && (
           <NoUserItemInfo uid={uid} userId={userId} />
         )}
         {items &&
           items.length !== 0 &&
           items.map((item) => (
             <Item
               key={item.id}
               id={item.id}
               item={item.item}
               url={item.url}
               description={item.description}
               pictureUrl={item.pictureUrl}
               wantedType={item.wantedType}
               publicItem={item.public}
               creatorId={item.creatorId}
               onDeleteItem={placeDeletedHandler}
             />
           ))}
       </Box>
       <Container className={classes.addBtn}>
         <Link underline="none" component={RouterLink} to="/new">
           <Tooltip title="Dodaj" placement="top">
             <Fab aria-label="add" size="medium" color="primary">
               <Add />
             </Fab>
           </Tooltip>
         </Link>
       </Container>
     </Box>
   );
}

export default ItemList;