import WarningModal from '../components/modal/WarningModal';
import SubmitButton from '../components/button/SubmitButton';
import Typography from '@mui/material/Typography';
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AtonoyMarkLogo from '../assets/atonoy-logo-mark.png';
import PhantomMarkLogo from '../assets/phantom-logo-mark.png'
import Button from '@mui/material/Button';
import {Link} from '@mui/material';

const styles = {
  message: {
    position: 'relative' as 'relative',
    top: '3em',
    marginBottom: '1em',
  },
  submit: {
    width: '100%',
    marginTop: '8em',
    marginBottom: '1em',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap' as 'wrap'
  },
  cardMedia: {
    textAlign: 'center',
  },
  cardContainer: {
    position: 'relative',
    top: '5em',
    maxWidth: 300,
    maxHeight: '500px',
    marginLeft: '4em',
    marginRight: '4em'
  },
  cardAction: {
    justifyContent: 'center'
  },
  link: {
    textDecoration: 'none',
  }
};

const WellComeMessage = () => {
  return (
    <div style={styles.message}>
      <Typography
        component='div'
        fontSize='23px'
        fontWeight='500'
      >LETS TOKEN ISSUE EASY AND QUICKLY
      </Typography>
      <Typography
        component='div'
        fontSize='2.4em'
        fontWeight='bold'
      >TOKEN AND NFT
      </Typography>
    </div>
  );
}

const TopPage = () => {
  const navigate = useNavigate();
  const {state} = useLocation() as NavigateOptions;
  const [warningModal, setWarningModal] = useState({open: false, message: ''});
  let title = 'Getting start';
  const [btnState, setBtnState] = useState(
    {
      title: title,
      isDisabled: false
    }
  );

  // raise warning other page
  useEffect(() => {
    if (state?.warning !== undefined) {
      setWarningModal({open: true, message: state.warning as string});
    }
  }, [state]);

  const handleClose = () => {
    setWarningModal({open: false, message: ''});
    setBtnState({title, isDisabled: false});
  };
  const connectHandler = () => {
    let title = 'Processing';
    setBtnState({title, isDisabled: true});
    if (!window.solana) {
      const message =
        `You will need Phantom wallet to access.
       Please install it from the URL below.
       https://phantom.app/download`
        ;
      setWarningModal({open: true, message});
    } else {
      window.solana.connect().then(() => {
        navigate('/token');
      });
    }
  };

  return (
    <>
      <WellComeMessage />
      <div style={styles.container}>
        <Card sx={styles.cardContainer}>
          <CardMedia
            sx={styles.cardMedia}
            component='img'
            image={PhantomMarkLogo} />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Need1. Install wallet
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              SMT only allows connections to phantom wallet,
              you must first install the phantom wallet extension on a phatom browser.
            </Typography>
          </CardContent>
          <CardActions sx={styles.cardAction}>
            <Link sx={styles.link} href='https://phantom.app/download'>
              <Button size='small'>Learn More</Button>
            </Link>
          </CardActions>
        </Card>
        <Card sx={styles.cardContainer}>
          <CardMedia
            sx={styles.cardMedia}
            component='img'
            image={AtonoyMarkLogo}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Need2. Get Atonoy subscription token
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              To use SMT, you will need a usage subscription token issued by Atonoy.inc.
              If you are don't have subscription token, please contact
              <Link sx={styles.link} href='https://atonoy.co'>Atonoy.inc</Link>.
            </Typography>
          </CardContent>
          <CardActions sx={styles.cardAction}>
            <Link sx={styles.link} href=''>
              <Button size='small'> Atonoy subscription token</Button>
            </Link>

          </CardActions>
        </Card>
      </div>

      <div style={styles.submit}>
        <SubmitButton
          isDisabled={btnState.isDisabled}
          title={btnState.title}
          callbackFunc={connectHandler}
        />
      </div>
      <WarningModal
        open={warningModal.open}
        onClose={handleClose}
        message={warningModal.message}
      />
    </>
  );
};
export default TopPage;
