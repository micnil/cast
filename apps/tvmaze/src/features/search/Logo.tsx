import logo from '../../assets/images/logo-monochrome.svg';
import { LogoHeader, LogoImage } from './styles';

const Logo = () => {
  return (
    <LogoHeader>
      <LogoImage src={logo} alt='TVMAZE logo' />
    </LogoHeader>
  );
};

export default Logo;
